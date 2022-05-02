import qiniu from 'qiniu';
import { read_config, write_config, resolve_config } from './config';
import { existsOrCreate } from './file';
import { notice } from './notice';

interface ResponseSuccess<T> {
    status: 0;
    data: T;
}
interface Failed {
    status: 1;
    msg: string;
}

interface Token {
    expires: number;
    start: number;
    token: string;
}

interface QiniuSecret {
    accessKey: string;
    secretKey: string;
    token: Token;
}
async function fetchToken(url: string, credentailes: string): Promise<ResponseSuccess<Token> | Failed> {
    const response = await fetch(`${url}/items/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentailes }),
    });

    if (response.ok) {
        return response.json();
    } else {
        return {
            status: 1,
            msg: await response.text(),
        };
    }
}

async function createToken(): Promise<string | null> {
    existsOrCreate(resolve_config(), '{}');
    const config = read_config();
    const { accessKey, secretKey, token: tokenInfo } = (config?.qiniu || {}) as QiniuSecret;
    if (!accessKey || !secretKey) {
        notice('请输入七牛云 accessKey 和 secretKey');
        return null;
    }
    if (tokenInfo) {
        const { expires, start, token } = tokenInfo;
        if (start + expires * 1000 > Date.now()) {
            return token;
        }
    }

    const { url, credentailes } = config.server;

    const res = await fetchToken(url, credentailes);

    if (res.status !== 0) {
        notice(res.msg);
        return null;
    }

    write_config({ ...config, qiniu: { ...config.qiniu, token: res.data } });

    return res.data.token;
}

export function resolve_save_address() {
    return read_config().qiniu?.address;
}

const formUploader = new qiniu.form_up.FormUploader({});

export interface ReturnBody {
    size: {
        width: number;
        height: number;
    };
    bucket: string;
    name: string;
}

export function uploadFileFromDisk(filename: string, local_filename: string): Promise<ReturnBody> {
    return new Promise(async (resolve, reject) => {
        const token = await createToken();
        if (!token) return;
        formUploader.putFile(token, filename, local_filename, null, (err, res, info) => {
            if (err) return reject(err);
            if (info.status === 200) {
                resolve(res);
            } else {
                reject(info);
            }
        });
    });
}

export function uploadFileFromBuffer(buffer: Blob, filename: string) {
    return new Promise(async (resolve, reject) => {
        // formUploader.putFile(uploadToken, filename, buffer, null, (err, res, info) => {
        //     if (err) return reject(err);
        //     if (info.status === 200) {
        //         resolve(res);
        //     } else {
        //         reject(info);
        //     }
        // });
    });
}

export function uploadFileFromDir() {}
