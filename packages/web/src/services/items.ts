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

interface OnlyS extends ResponseState {
    status: 0;
}

interface FailedState extends ResponseState {
    status: 1;
    msg: string;
}

interface UnAuthorized extends ResponseState {
    status: 3;
    msg: string;
}

type Failed = FailedState | UnAuthorized;

export async function fetchItems(url: string, token: string): Promise<SuccessState<DataItem[]> | Failed> {
    const response = await fetch(`${url}/items/list`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ token }),
    });
    console.log(response);
    if (response.ok) {
        return await response.json();
    } else {
        return {
            status: 1,
            msg: await response.text(),
        };
    }
}

export async function validServer(url: string, token: string): Promise<OnlyS | Failed> {
    const response = await fetch(`${url}/items/valid`, {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        return await response.json();
    } else {
        return {
            status: 1,
            msg: await response.text(),
        };
    }
}
