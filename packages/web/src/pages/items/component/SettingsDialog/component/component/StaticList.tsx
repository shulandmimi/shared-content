import { defineComponent, PropType } from 'vue';
import { NButton, NList, NListItem, NSpace } from 'naive-ui';
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
                    <NButton size="small" onClick={props.onModify}>
                        修改
                    </NButton>
                </NSpace>
            </>
        );
    },
});
