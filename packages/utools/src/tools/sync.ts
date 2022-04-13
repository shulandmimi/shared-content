import { DataContent, DataItem, DataType, ImageData } from '../interface';
import { platform } from './platform';

export const queue: DataItem[] = [];

export const createDataItem = (content: DataContent) => ({ platform: platform(), content });

export const createImageItem = (url: string) => createDataItem({ type: DataType.Image, url });
export const createTextItem = (content: string) => createDataItem({ type: DataType.Text, content });
export const createFileItem = (url: string) => createDataItem({ type: DataType.File, url });

export async function sync(items: DataItem[]) {
    const datas = [];
    if (queue.length) {
        datas.push(...queue);
    }
    datas.push(...items);

    const response = await fetch(`https://qcrqwt.api.cloudendpoint.cn/items-create`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas),
    });

    if (!response.ok) {
        return Promise.reject(response.text());
    }
    queue.length = 0;
    return Promise.resolve(response.json());
}
