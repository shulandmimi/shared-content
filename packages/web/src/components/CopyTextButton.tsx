import { defineComponent, reactive } from 'vue';
import { NButton } from 'naive-ui';

export default defineComponent({
    name: 'CopyText',
    props: {
        content: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        let timer: any = null;
        const state = reactive({
            loading: false,
        });

        const copy = () => navigator.clipboard.writeText(props.content);

        return () => (
            <NButton
                circle
                onClick={() => {
                    clearTimeout(timer);
                    state.loading = true;
                    copy().then(() => {
                        timer = setTimeout(() => {
                            state.loading = false;
                        }, 1500);
                    });
                }}>
                {state.loading ? 'ing' : 'C'}
            </NButton>
        );
    },
});
