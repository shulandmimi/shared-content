import { defineComponent, PropType, reactive } from 'vue';
import { NButton, NList, NListItem, NSpace, NTag } from 'naive-ui';
import useLocale from '@/hooks/useLocale';
import useFetch from '@/hooks/useFetch';
import { validServer } from '@/services/items';
import { ServerItem } from './ModifyList';
import { SERVER_LIST_KEY } from '../ServerList';
import useServerList from '../hooks/useServerList';

export default defineComponent({
    name: 'StaticList',

    props: {
        onModify: {
            type: Function as PropType<(e: MouseEvent) => void>,
        },
    },

    setup(props) {
        const serverList = useServerList();

        return () => (
            <>
                <NList>
                    {serverList.serverList.map((item, index) => (
                        <NListItem>
                            <span
                                color={index === serverList.currentIndex ? 'success' : 'default'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    serverList.currentIndex = index;
                                }}>
                                {item.url} {index === serverList.currentIndex ? ' ✔' : ''}
                            </span>
                        </NListItem>
                    ))}
                </NList>
                <NSpace justify="end">
                    <NButton onClick={props.onModify}>修改</NButton>
                </NSpace>
            </>
        );
    },
});
