import { NButton, NUpload, NUploadDragger, NText, UploadFileInfo, useMessage } from 'naive-ui';
import { defineComponent, PropType, ref, watch } from 'vue';
import { DataItem } from '@shared/core';
import upload, { getURL } from '../../utools/qiniu';
import useServerList from '../SettingsDialog/component/hooks/useServerList';
import { createImageItem } from '../../utools/dataitem';
import qiniu from 'qiniu-js';

export default defineComponent({
    name: 'UploadImage',
    props: {
        onSync: Function as PropType<(text: DataItem) => void>,
    },
    setup(props) {
        const value = ref<UploadFileInfo[]>([]);
        const message = useMessage();
        const serverList = useServerList();

        return () => (
            <div>
                <NUpload
                    onChange={data => {
                        value.value = data.fileList;
                    }}
                    fileList={value.value}
                    max={1}
                    accept="iamge/png,image/jpeg,image/jpg">
                    <NUploadDragger>
                        <NText>拖拽或点击上传图片</NText>
                    </NUploadDragger>
                </NUpload>

                <NButton
                    onClick={async () => {
                        const fileList = value.value;
                        console.log(fileList, value);
                        if (fileList.length === 0) {
                            message.warning('请选择图片上传');
                            return;
                        }
                        const url = serverList.current.url;
                        const token = serverList.current.token?.token!;
                        const file = fileList[0] as unknown as File;
                        console.log(url, file, token);
                        const name = await upload({ file: file, filename: file.name, token: serverList.current.token?.token! }, progress => {
                            console.log(progress);
                        });
                        const cdnUrl = getURL(token);
                        console.log(cdnUrl);
                        // props.onSync?.(createImageItem(`${url}/${name}`));
                    }}>
                    上传
                </NButton>
            </div>
        );
    },
});
