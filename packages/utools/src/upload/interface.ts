export interface Action<T> {
    code: string;
    type: 'over' | 'text' | 'img' | 'file';
    payload: T;
}
