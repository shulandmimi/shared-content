import { reactive, toRefs } from 'vue';

interface FetchState<T> {
    loading: boolean;
    data?: T;
    err: any;
}

export default function useFetch<T, Args extends unknown[]>(callback: (...args: Args) => Promise<T>) {
    const state = reactive<FetchState<T>>({
        loading: false,
        data: undefined,
        err: undefined,
    });

    async function run(...args: Args) {
        try {
            state.loading = true;
            const data = await callback(...args);
            Object.assign(state, {
                loading: false,
                data,
                err: undefined,
            });
        } catch (error) {
            Object.assign(state, {
                loading: false,
                data: undefined,
                err: error,
            });
        }
    }

    return { state, run };
}
