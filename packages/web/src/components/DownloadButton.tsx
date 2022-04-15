import { defineComponent, EmitsOptions, SetupContext, VNode } from 'vue';
import { NButton } from 'naive-ui';
import { download } from '../utools/download';
export default defineComponent({
    name: 'DownloadButton',
    props: {
        url: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    setup(props, context: SetupContext<{ default: () => VNode[] }>) {
        // @ts-ignore
        return () => (
            <NButton
                onClick={() => {
                    download(props.url, props.name);
                }}>
                {/* @ts-ignore */}
                {context.slots?.default()}
            </NButton>
        );
    },
});
