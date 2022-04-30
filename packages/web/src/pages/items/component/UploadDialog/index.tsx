import { NDrawer, NSelect, NSpin, NTabPane, NTabs, useMessage } from 'naive-ui';
import { defineComponent, Ref, PropType, reactive, computed } from 'vue';
import Text from './Text';
import Image from './Image';
import File from './File';
import _ from 'lodash';
import useServerList from '../SettingsDialog/component/hooks/useServerList';
import { DataItem } from '@shared/core';
import { syncItems } from '@/services/items';
import useFetch from '@/hooks/useFetch';

export interface UploadDrawerActions {
    open: () => void;
    close: () => void;
}

export default defineComponent({
    name: 'UploadDrawer',
    props: {
        drawerActionRef: Object as PropType<Ref<UploadDrawerActions | undefined>>,
    },
    setup(props) {
        const drawerState = reactive({ visible: false });
        const serverList = useServerList();
        const message = useMessage();
        const drawerActions: UploadDrawerActions = {
            open() {
                drawerState.visible = true;
            },
            close() {
                drawerState.visible = false;
            },
        };
        if (props.drawerActionRef) props.drawerActionRef.value = drawerActions;

        const serverListComputed = computed(() =>
            serverList.serverList.map(item => ({
                label: item.url,
                type: '',
                value: item.id,
            }))
        );

        const { state, run } = useFetch(async function onSync(item: DataItem) {
            const res = await syncItems(serverList.current.url, [item], serverList.current.credentails!);
            console.log(res);
            if (res.status === 0) {
                message.success('成功');
            } else {
                message.error(res.msg);
            }
        });

        return () => (
            <NDrawer width="30%" show={drawerState.visible}>
                <NSpin show={state.loading}>
                    <NSelect value={serverList.current.id} options={serverListComputed.value}></NSelect>
                    <NTabs>
                        <NTabPane name="text" tab="文本">
                            <Text onSync={run}></Text>
                        </NTabPane>
                        <NTabPane name="image" tab="图片">
                            <Image onSync={run} onProgress={console.log}></Image>
                        </NTabPane>
                        <NTabPane name="file" tab="文件">
                            <File onSync={run} onProgress={console.log}></File>
                        </NTabPane>
                    </NTabs>
                </NSpin>
            </NDrawer>
        );
    },
});
function createToken() {
    throw new Error('Function not implemented.');
}
