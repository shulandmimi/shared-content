import { Action } from './interface';
import { uploadFileFromDisk } from '../tools/qiniu';
import path from 'path';
import { createFileItem, sync } from '../tools/sync';
interface UploadFile {
    isFile: true;
    isDirectory: false;
    name: string;
    path: string;
}
interface UploadDir {
    isFile: false;
    isDirectory: true;
    name: string;
    path: string;
}

export default async function uploadFile(action: Action<UploadFile | UploadDir>) {
    const file = action.payload;
    if (file.isDirectory) return;
    const filename = path.parse(file.path);

    try {
        const { name } = await uploadFileFromDisk(file.path, filename.name);

        const fileItem = createFileItem(name);

        await sync([fileItem]);
    } catch (error) {
        console.log(error);
    }
}
