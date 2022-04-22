import { Ref, ref, UnwrapRef, watchEffect, onUnmounted, onMounted, watch } from 'vue';
import { merge } from 'lodash';

interface Options<T> {
    default: T;
    serializa: {
        encode: (value: any) => string;
        decode: (value: string | null) => T;
    };
}

const defaultOptions: Partial<Options<any>> = {
    serializa: {
        encode: value => JSON.stringify(value),
        decode: value => (value ? JSON.parse(value) : null),
    },
};

const map = new Map();
const quoteMap = new Map();

export default function useLocale<T>(key: string, options: Partial<Options<T>>): Ref<UnwrapRef<T>> {
    const _options = merge(defaultOptions, options);
    const { serializa } = _options as Options<T>;

    let raw = localStorage.getItem(key);
    let _raw = raw;
    let value: any;

    const getValueFromString = (v: string | null, dv: any) => {
        let value = serializa.decode(v);
        if (value === null) return dv;
        return value;
    };

    try {
        value = getValueFromString(raw, _options.default);
    } catch (error) {
        value = _options.default;
    }

    const state = map.has(key) ? map.get(key) : ref<T>(value as unknown as T);
    if (!map.has(key)) map.set(key, state);
    quoteMap.set(key, (quoteMap.get(key) || 0) + 1);

    // 多页面数据同步
    const handler = () => {
        console.log('storage changed');
        _raw = localStorage.getItem(key);
        if (_raw === raw) {
            return;
        }
        raw = _raw;
        state.value = getValueFromString(raw, _options.default);
    };

    const sync = () => {
        localStorage.setItem(key, (raw = serializa.encode(state.value)));
    };

    window.addEventListener('storage', handler);
    onUnmounted(() => {
        sync();
        window.removeEventListener('storage', handler);
        quoteMap.set(key, (quoteMap.get(key) || 0) - 1);
        if (quoteMap.get(key) <= 0) {
            map.delete(key);
            quoteMap.delete(key);
        }
    });

    // 监听改变
    watch([state], sync);

    return state;
}
