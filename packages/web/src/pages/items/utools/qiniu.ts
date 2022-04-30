import * as qiniu from 'qiniu-js';

interface UploadOptions {
    file: File;
    filename: string;
    token: string;
}

export default function upload(context: UploadOptions, callback: (progress: number) => void): Promise<string> {
    const { file, filename, token } = context;
    const obserable = qiniu.upload(file, filename, token, {});

    const p = new Promise<string>((resolve, reject) => {
        const observer = obserable.subscribe({
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
        p.finally(() => {
            observer.unsubscribe();
        });
    });
    return p;
}

export async function getURL(token: string): Promise<string> {
    const url = await qiniu.getUploadUrl({ useCdnDomain: true }, token);
    return url;
}
