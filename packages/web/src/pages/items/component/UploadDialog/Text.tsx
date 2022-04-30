import { NButton, NInput } from 'naive-ui';
import { defineComponent, PropType, ref } from 'vue';
import { DataItem } from '@shared/core';
import { createTextItem } from '../../utools/dataitem';

export default defineComponent({
    name: 'UploadText',
    props: {
        onSync: Function as PropType<(text: DataItem) => void>,
    },
    setup(props) {
        const value = ref();

        return () => (
            <div>
                <NInput v-model={[value.value, 'value']} type="textarea"></NInput>

                <NButton
                    onClick={() => {
                        props.onSync?.(createTextItem(value.value));
                    }}>
                    上传
                </NButton>
            </div>
        );
    },
});
