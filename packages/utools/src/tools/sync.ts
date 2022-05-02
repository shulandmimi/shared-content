import { DataContent, DataItem, DataType } from '@shared/core';
import { platform } from './platform';
import { read_config } from './config';

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
    const { url, credentailes } = read_config().server || {};
    const response = await fetch(`${url}/items/sync`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: credentailes,
            data: datas,
        }),
    });

    if (!response.ok) {
        return Promise.reject(response.text());
    }
    queue.length = 0;
    return Promise.resolve(response.json());
}
