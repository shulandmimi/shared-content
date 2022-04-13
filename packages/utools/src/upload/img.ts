import { Action } from './interface';
import { uploadFileFromDisk } from '../tools/qiniu';
import path from 'path';
import fs from 'fs-extra';
import { platform } from '../tools/platform';
import { createImageItem, sync } from '../tools/sync';

const TEMP_FILENAME = path.join(utools.getPath('temp'), './temp.png');

export default async function uploadImage(action: Action<string>) {
    const filename = `${Math.random().toString(16).substring(2)}.png`;
    try {
        const base64 = action.payload.replace(/^data:image\/\w+;base64,/, '');
        const dataBuffer = Buffer.from(base64, 'base64');

        fs.writeFile(TEMP_FILENAME, dataBuffer);

        const data = await uploadFileFromDisk(filename, TEMP_FILENAME);

        utools.showNotification(`${filename} 上传`);

        const url = `${data.name}`;

        const imageItem = createImageItem(url);

        await sync([imageItem]);
    } catch (error) {
        console.log(JSON.stringify(error), 'error');
    }
    await fs.remove(TEMP_FILENAME);
}
