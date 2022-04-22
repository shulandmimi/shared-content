import { defineComponent, PropType, reactive } from 'vue';
import { NButton, NList, NListItem, NSpace } from 'naive-ui';
import useLocale from '@/hooks/useLocale';
import useFetch from '@/hooks/useFetch';
import { validServer } from '@/services/items';
import { ServerItem } from './ModifyList';

export default defineComponent({
    name: 'StaticList',

    props: {
        onModify: {
            type: Function as PropType<(e: MouseEvent) => void>,
        },
    },

    setup(props) {
        const localSettings = useLocale<ServerItem[]>('SETTINGS.serverList', {
            default: [],
        });

        const state = reactive({
            loading: true,
        });

        function validAllServerList() {
            // return validServer(localSettings.value);
        }

        return () => (
            <>
                <NList>
                    {localSettings.value.map(item => (
                        <NListItem>{item.url}</NListItem>
                    ))}
                </NList>
                <NSpace justify="end">
                    <NButton onClick={props.onModify}>修改</NButton>
                </NSpace>
            </>
        );
    },
});
