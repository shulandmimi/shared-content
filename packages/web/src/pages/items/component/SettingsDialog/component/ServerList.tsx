import _ from 'lodash';
import { FormInst, NButton, NForm, NFormItem, NInput, NSpace } from 'naive-ui';
import { defineComponent, ref } from 'vue';

const validURL = (v: string) =>
    /^(((ht|f)tps?):\/\/)?([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/.test(v) ||
    /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+:\d{1,5}\/?$/.test(v);
export default defineComponent({
    name: 'ServerList',
    props: {
        initialstate: {
            type: Array,
            required: true,
        },
        onChange: {
            type: Function,
        },
    },
    setup(props) {
        const modelRef = ref(_.cloneDeep(props.initialstate));
        const formRef = ref<FormInst | null>(null);

        function submitForm(e: MouseEvent) {
            e.preventDefault();
            formRef.value
                ?.validate()
                .then(() => {
                    props.onChange?.(_.cloneDeep(modelRef.value));
                })
                .catch(err => {
                    console.log(err);
                });
        }

        function addItem() {
            modelRef.value.push('');
        }
        function deleteItem(index: number) {
            modelRef.value.splice(index, 1);
        }

        return () => (
            <NForm size="small" ref={formRef} model={modelRef.value}>
                {modelRef.value?.map((item, index) => (
                    <NFormItem
                        path={index.toString()}
                        rule={{
                            trigger: 'input',
                            validator: (r, v) => {
                                if (validURL(v)) {
                                    return true;
                                }
                                return Promise.reject('不是一个有效网址');
                            },
                        }}>
                        <NInput value={item as string} onInput={e => (modelRef.value[index] = e)} placeholder="请输入服务器地址"></NInput>
                        <NButton style={{ marginLeft: '10px' }} onClick={() => deleteItem(index)}>
                            x
                        </NButton>
                    </NFormItem>
                ))}

                <NFormItem style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <NButton onClick={addItem}>添加</NButton>
                    <NButton onClick={submitForm}>提交</NButton>
                </NFormItem>
            </NForm>
        );
    },
});
