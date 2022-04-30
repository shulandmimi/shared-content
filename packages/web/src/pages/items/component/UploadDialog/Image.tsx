import { NButton, NUpload, NUploadDragger, NText, UploadFileInfo, useMessage } from 'naive-ui';
import { defineComponent, PropType, ref, watch } from 'vue';
import { DataItem } from '@shared/core';
import upload, { createToken } from '../../utools/qiniu';
import useServerList from '../SettingsDialog/component/hooks/useServerList';
import { v4 as uuid } from 'uuid';
import _ from 'lodash';
import { createImageItem } from '../../utools/dataitem';

export default defineComponent({
    name: 'UploadImage',
    props: {
        onSync: Function as PropType<(text: DataItem) => void>,
        onProgress: Function as PropType<(prog: number) => void>,
    },
    setup(props) {
        const value = ref<UploadFileInfo[]>([]);
        const message = useMessage();
        const serverList = useServerList();

        async function uploadText() {
            const fileList = value.value;

            if (fileList.length === 0) {
                message.warning('请选择图片上传');
                return;
            }

            const { url, cdn } = serverList.current;
            const file = fileList[0].file as File;
            const token = await createToken(url, serverList.current.token || null, serverList.current.credentails!);

            if (_.isNull(token)) {
                message.error('token 未获取成功，无法上传');
                return;
            }

            const name = await upload({ file: file, filename: `${uuid()}-${file.name}`, token: token.token }, progress => {
                props.onProgress?.(progress);
            });
            props.onSync?.(createImageItem(`${cdn}/${name}`));
        }

        return () => (
            <div>
                <NUpload
                    onChange={data => {
                        value.value = data.fileList;
                    }}
                    fileList={value.value}
                    max={1}
                    accept="image/png,image/jpeg,image/jpg">
                    <NUploadDragger>
                        <NText>拖拽或点击上传图片</NText>
                    </NUploadDragger>
                </NUpload>

                <NButton onClick={uploadText}>上传</NButton>
            </div>
        );
    },
});
