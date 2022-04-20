import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Image',
    props: {
        url: String,
    },
    setup(props) {
        return () => (
            <div>
                <img style={{ width: '100%', height: '100%' }} src={props.url}></img>
            </div>
        );
    },
});
