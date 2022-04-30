import { DataItem } from '@shared/core';

export async function syncItems(url: string, items: DataItem[], token: string): Promise<OnlyS | Failed> {
    const response = await fetch(`${url}/items/sync`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ data: items, token }),
    });

    if (response.ok) {
        return response.json();
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

interface Token {
    token: string;
    start: number;
    expires: number;
}

export async function fetchToken(url: string, token: string): Promise<SuccessState<Token> | Failed> {
    const res = await fetch(`${url}/items/token`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
    });

    if (res.ok) {
        return res.json();
    } else {
        return {
            status: 1,
            msg: await res.text(),
        };
    }
}
function createToken() {
    throw new Error('Function not implemented.');
}
