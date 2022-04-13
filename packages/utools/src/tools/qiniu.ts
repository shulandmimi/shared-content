import qiniu from 'qiniu';

var accessKey = '';
var secretKey = '';

var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

const putPolicy = new qiniu.rs.PutPolicy({
    scope: 'shared-content',
    expires: 7200,
    returnBody: '{ "size": { "width": $(imageInfo.width), "height": $(imageInfo.height) }, "bucket": $(bucket), "name": $(key) }',
});
const uploadToken = putPolicy.uploadToken(mac);

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
