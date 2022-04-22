import useLocale from '@/hooks/useLocale';
import { computed, reactive } from 'vue';
import { SERVER_LIST_KEY, SERVER_CURRENT_INDEX } from '../ServerList';
import { ServerItem } from '../component/ModifyList';

export default function useServerList() {
    const serverList = useLocale<ServerItem[]>(SERVER_LIST_KEY, { default: [] });
    const currentIndex = useLocale<number>(SERVER_CURRENT_INDEX, { default: 0 });
    const current = computed(() => serverList.value[currentIndex.value]);

    return reactive({
        serverList,
        currentIndex,
        current,
    });
}
