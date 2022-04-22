import _ from 'lodash';
import { FormInst, NButton, NForm, NFormItem, NInput, NSpace } from 'naive-ui';
import { defineComponent, ref, PropType } from 'vue';
import useLocale from '../../../../../../hooks/useLocale';
import { validServer } from '../../../../../../services/items';

const validURL = (v: string) =>
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(v) ||
    /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/.test(v);

export interface ServerItem {
    valid: boolean;
    url: string;
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
                    console.log(modelRef.value);
                    props.onChange?.();
                })
                .catch(err => {
                    console.log(err);
                });
        }

        function addItem() {
            modelRef.value.push({ valid: false, url: '' });
        }
        function deleteItem(index: number) {
            modelRef.value.splice(index, 1);
        }

        return () => (
            <NForm size="small" ref={formRef} model={modelRef.value}>
                {modelRef.value?.map((item, index) => (
                    <NFormItem
                        path={index.toString()}
                        rule={[
                            {
                                trigger: 'blur',
                                asyncValidator: async (r, v) => {
                                    if (!validURL(v.url)) {
                                        return Promise.reject('不是一个有效网址');
                                    }
                                    const res = await validServer(v.url);
                                    if (res.status !== 0) {
                                        return Promise.reject('验证不通过');
                                    }
                                    item.valid = true;
                                    return Promise.resolve();
                                },
                            },
                        ]}>
                        <NInput
                            v-slots={{
                                suffix: () => (item.valid ? '✔' : '✗'),
                            }}
                            value={item.url as string}
                            onInput={e => (modelRef.value[index].url = e)}
                            placeholder="请输入服务器地址"
                        />
                        <NButton style={{ marginLeft: '10px' }} onClick={() => deleteItem(index)}>
                            x
                        </NButton>
                    </NFormItem>
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
