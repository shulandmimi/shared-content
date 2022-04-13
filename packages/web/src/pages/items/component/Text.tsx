import { defineComponent } from 'vue';
import { NEllipsis } from 'naive-ui';
import { TextData } from '../../../../../core/src/types';

export default defineComponent({
    props: {
        type: Number,
        content: String,
    },
    setup(props) {
        return () => (
            <NEllipsis lineClamp={5} expandTrigger="click" tooltip={false}>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{props.content}</pre>
            </NEllipsis>
        );
    },
});
