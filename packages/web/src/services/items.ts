import { DataItem } from '../../../core/src/types';

export async function SaveItems(items: DataItem) {
    const response = await fetch('https://qcrqwt.api.cloudendpoint.cn/items-create', {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(items),
    });

    if (response.ok) {
        return {
            status: 0,
        };
    } else {
        return {
            status: 1,
            msg: await response.text(),
        };
    }
}

interface ResponseState {
    status: number;
}
interface SuccessState<T> extends ResponseState {
    status: 0;
    data: T;
    msg?: string;
}

interface FailedState extends ResponseState {
    status: 1;
    msg: string;
}

export async function fetchItems(): Promise<SuccessState<DataItem[]> | FailedState> {
    const response = await fetch('http://127.0.0.1:12306/items/list');
    if (response.ok) {
        return await response.json();
    } else {
        return {
            status: 1,
            msg: await response.text(),
        };
    }
}
