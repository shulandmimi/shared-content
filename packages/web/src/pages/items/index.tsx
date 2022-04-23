import { defineComponent, watch, toRefs, onUnmounted, ref } from 'vue';
import { NCard, NList, NListItem, NTag, NSpace, NAffix, NSpin, useLoadingBar, NResult } from 'naive-ui';
import { fetchItems } from '@/services/items';
import useFetch from '@/hooks/useFetch';
import { DataContent, DataType } from '@shared/core';
import Text from './component/Text';
import Image from './component/Image';
import File from './component/File';
import SettingDialog, { DrawerActionType } from './component/SettingsDialog';
import CopyTextButton from '@/components/CopyTextButton';
import DownloadButton from '@/components/DownloadButton';
import useServerList from './component/SettingsDialog/component/hooks/useServerList';
import SettingIcon from '@/components/icons/Setting';

const TagMap = {
    [DataType.File]: <NTag type="info">文件</NTag>,
    [DataType.Image]: <NTag type="success">图片</NTag>,
    [DataType.Text]: <NTag type="error">文本</NTag>,
};

export default defineComponent(function () {
    const loadingBar = useLoadingBar();
    const serverList = useServerList();
    const dialogRef = ref<DrawerActionType>();

    const { run, state } = useFetch(async () => {
        const res = await fetchItems(serverList.current.url, serverList.current.credentails!);
        if (!res.status) {
            return res.data;
        }
        return [];
    });

    watch([toRefs(serverList).currentIndex], () => run(), { immediate: true });
    watch([toRefs(state).loading], () => {
        if (state.loading) {
            loadingBar.start();
        } else {
            state.err ? loadingBar.error() : loadingBar.finish();
        }
    });
    onUnmounted(() => loadingBar.finish());

    function renderShareContent(item: DataContent) {
        switch (item.type) {
            case DataType.Text:
                return <Text {...item}></Text>;
            case DataType.File:
                return <File {...item}></File>;
            case DataType.Image:
                return <Image {...item}></Image>;
        }
    }

    function renderShareControl(item: DataContent) {
        switch (item.type) {
            case DataType.Text:
                return <CopyTextButton content={item.content} />;
            case DataType.Image:
            case DataType.File:
                return (
                    <DownloadButton url={item.url} name={item.url}>
                        下载
                    </DownloadButton>
                );
        }
    }

    return () => (
        <div style={{ boxSizing: 'border-box', padding: '0px 20%' }}>
            <SettingDialog drawerActionRef={dialogRef} />
            <div
                onClick={() => {
                    dialogRef.value?.open();
                }}
                style={{ position: 'fixed', width: '20px', height: '20px', top: '10px', right: '10px', cursor: 'pointer' }}>
                <SettingIcon width={20} height={20} color="red" />
            </div>
            <NSpin show={state.loading}>
                <div style={{ marginTop: '50px' }}>
                    {state.err && <NResult status="error" size="small" description="发生错误" />}
                    {state.data?.length === 0 && <NResult status="warning" size="small" description="暂时没有数据"></NResult>}
                </div>
                <NList>
                    {state.data?.map(item => (
                        <NListItem>
                            <NCard
                                v-slots={{
                                    header: () => (
                                        <>
                                            <NSpace>
                                                <NTag size="small">{item.platform.end}</NTag>
                                                {TagMap[item.content.type]}
                                                {/* @ts-ignore */}
                                                <NTag>{new Date(item?.createdAt).toLocaleString()}</NTag>
                                            </NSpace>
                                        </>
                                    ),
                                    'header-extra': () => <span>{renderShareControl(item.content)}</span>,
                                }}>
                                {renderShareContent(item.content)}
                            </NCard>
                        </NListItem>
                    ))}
                </NList>
            </NSpin>
        </div>
    );
});
