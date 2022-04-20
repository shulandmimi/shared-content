import { Action } from './interface';
import { resolve_save_address, uploadFileFromDisk } from '../tools/qiniu';
import { createFileItem, sync } from '../tools/sync';
import fs from 'fs-extra';
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
    if (!(await fs.pathExists(file.path))) return;

    try {
        const { name } = await uploadFileFromDisk(file.path, file.name);

        const fileItem = createFileItem(resolve_save_address() + '/' + name);

        await sync([fileItem]);
    } catch (error) {
        console.log(error);
    }
}
