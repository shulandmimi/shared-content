import { DataItem, DataType } from '../interface';
import { platform } from '../tools/platform';
import { createTextItem, queue, sync } from '../tools/sync';
import { Action } from './interface';

const isOnline = () => navigator.onLine;

export default async function uploadText(action: Action<string>) {
    const payload = action.payload?.trim();
    const text: DataItem = createTextItem(payload);

    console.log(`to url: "https://qcrqwt.api.cloudendpoint.cn/items-create"`);

    if (isOnline()) {
        await sync([text]);
        utools.showNotification(`"${payload}" 上传成功`);
    } else {
        utools.showNotification(`处于无网环境 "${payload}" 存于本地`);
        queue.push(text);
    }
}
