import { defineComponent } from 'vue';
import { NCard, NList, NListItem, NTag, NSpace } from 'naive-ui';
import { fetchItems } from '@/services/items';
import useFetch from '@/hooks/useFetch';
import { DataContent, DataType } from '@shared/core';
import Text from './component/Text';
import Image from './component/Image';
import File from './component/File';
import SettingDialog from './component/SettingsDialog';
import CopyTextButton from '@/components/CopyTextButton';
import DownloadButton from '@/components/DownloadButton';

const TagMap = {
    [DataType.File]: <NTag type="info">文件</NTag>,
    [DataType.Image]: <NTag type="success">图片</NTag>,
    [DataType.Text]: <NTag type="error">文本</NTag>,
};

export default defineComponent(function () {
    const { run, state } = useFetch(async () => {
        const res = await fetchItems();
        if (!res.status) {
            return res.data;
        }
        return [];
    });

    run();

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
        <div style={{ boxSizing: 'border-box', padding: '0px 200px' }}>
            <SettingDialog />
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
        </div>
    );
});
