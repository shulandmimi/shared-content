import qiniu from 'qiniu';
import { read_config, write_config, resolve_config } from './config';
import { existsOrCreate } from './file';
import { notice } from './notice';

function createToken() {
    existsOrCreate(resolve_config(), '{}');
    const config = read_config();
    const { accessKey, secretKey, token: tokenInfo } = config?.qiniu || {};
    if (!accessKey || !secretKey) {
        notice('请输入七牛云 accessKey 和 secretKey');
        return;
    }
    if (tokenInfo) {
        const { maxAge, start, token } = tokenInfo;
        if (start + maxAge * 1000 > Date.now()) {
            return token;
        }
    }

    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    const putPolicy = new qiniu.rs.PutPolicy({
        scope: 'shared-content',
        expires: 7200,
        returnBody: '{ "size": { "width": $(imageInfo.width), "height": $(imageInfo.height) }, "bucket": $(bucket), "name": $(key) }',
    });

    const token = putPolicy.uploadToken(mac);

    write_config({ ...config, qiniu: { ...config.qiniu, token: { maxAge: 7200, start: Date.now(), token } } });

    return token;
}

export function resolve_save_address() {
    return read_config().qiniu?.address;
}

let uploadToken = createToken();

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
    return new Promise((resolve, reject) => {
        formUploader.putFile(uploadToken, filename, local_filename, null, (err, res, info) => {
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
