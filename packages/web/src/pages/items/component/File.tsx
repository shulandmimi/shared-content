import { defineComponent } from 'vue';

const ext = (filename: string) => filename.split('.').pop();

export default defineComponent({
    name: 'File',
    props: {
        type: Number,
        url: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        // ext();
        return () => (
            <div>
                <div>name: {props.url} </div>
                <div>type: {ext(props.url)}</div>
            </div>
        );
    },
});
