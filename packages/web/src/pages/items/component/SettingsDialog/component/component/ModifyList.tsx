import _ from 'lodash';
import { FormInst, NButton, NForm, NFormItem, NInput, NSpace } from 'naive-ui';
import { defineComponent, ref, PropType } from 'vue';
import useLocale from '@/hooks/useLocale';
import { v4 as uuid } from 'uuid';

const validURL = (v: string) =>
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(v) ||
    /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/.test(v);

export interface ServerToken {
    token: string;
    expires: number;
    start: number;
}
export interface ServerItem {
    id: string;
    verify: {
        success: boolean;
        credentails?: boolean;
    };
    token?: ServerToken;
    url: string;
    credentails?: string;
    cdn: string;
}
export default defineComponent({
    name: 'ModifyServerList',
    props: {
        onChange: Function as PropType<() => void>,
    },
    setup(props) {
        const localSettings = useLocale<ServerItem[]>('SETTINGS.serverList', {
            default: [],
        });
        const modelRef = ref(_.cloneDeep(localSettings.value));
        const formRef = ref<FormInst | null>(null);

        function submitForm(e: MouseEvent) {
            e.preventDefault();
            formRef.value
                ?.validate()
                .then(() => {
                    localSettings.value = modelRef.value;
                    props.onChange?.();
                })
                .catch(err => {
                    console.log(err);
                });
        }

        function addItem() {
            modelRef.value.push({ id: uuid(), verify: { success: false }, url: '', cdn: '' });
        }
        function deleteItem(index: number) {
            modelRef.value.splice(index, 1);
        }

        return () => (
            <NForm size="small" ref={formRef} model={modelRef.value}>
                {modelRef.value?.map((item, index) => (
                    <>
                        <NFormItem
                            label="地址"
                            path={index.toString()}
                            rule={[
                                {
                                    trigger: 'blur',
                                    asyncValidator: async (r, v: ServerItem) => {
                                        if (!validURL(v.url)) {
                                            return Promise.reject('不是一个有效网址');
                                        }
                                        return Promise.resolve();
                                    },
                                },
                            ]}>
                            <NInput value={[item.url, 'value']} placeholder="请输入服务器地址" />
                            <NButton style={{ marginLeft: '10px' }} onClick={() => deleteItem(index)}>
                                x
                            </NButton>
                        </NFormItem>
                        <NFormItem path={index.toString()} label="校验">
                            <NInput v-model={[item.credentails, 'value']} placeholder="请输入服务器校验token" />
                        </NFormItem>
                        <NFormItem path={index.toString()} label="CDN地址">
                            <NInput v-model={[item.cdn, 'value']}></NInput>
                        </NFormItem>
                        <NFormItem path={index.toString()} label="token">
                            <NInput disabled value={item.token?.token} placeholder="请输入文件上传token" />
                        </NFormItem>
                    </>
                ))}

                <NFormItem>
                    <NSpace justify="end">
                        <NButton onClick={addItem}>添加</NButton>
                        <NButton onClick={submitForm}>提交</NButton>
                    </NSpace>
                </NFormItem>
            </NForm>
        );
    },
});
