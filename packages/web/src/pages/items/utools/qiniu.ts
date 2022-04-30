import { fetchToken } from '@/services/items';
import { isNil } from 'lodash';
import * as qiniu from 'qiniu-js';
import { ServerToken } from '../component/SettingsDialog/component/component/ModifyList';

interface UploadOptions {
    file: File;
    filename: string;
    token: string;
}

export async function createToken(url: string, token: ServerToken | null, serverCrendentails: string): Promise<ServerToken | null> {
    if (!isNil(token)) {
        if (token.start + token.expires < Date.now()) {
            return token;
        }
    }
    const res = await fetchToken(url, serverCrendentails);

    if (res.status !== 0) {
        console.log(res.msg);
        return null;
    }

    return res.data;
}

export default function upload(context: UploadOptions, callback: (progress: number) => void): Promise<string> {
    const { file, filename, token } = context;
    const obserable = qiniu.upload(file, filename, token, {});

    return new Promise<string>((resolve, reject) => {
        obserable.subscribe({
            next(res) {
                callback?.(res.total.percent);
            },
            error(err) {
                reject(err);
            },
            complete(res: { name: string }) {
                resolve(res.name);
            },
        });
    });
}

export async function getURL(token: string): Promise<string> {
    const url = await qiniu.getUploadUrl({ useCdnDomain: true }, token);
    return url;
}
