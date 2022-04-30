import CheckIcon from '@/components/icons/CheckIcon';
import { defineComponent, PropType } from 'vue';


export default defineComponent({
    name: 'ServerVerify',
    props: {
        verify: Boolean,
        credentails: Boolean,
        onClick: Function as PropType<() => void>,
    },
    setup(props) {
        return () => {
            if (props.verify) return '✔';
            if (!props.verify && props.credentails === undefined) return '✗';
            if (!props.verify && props.credentails === false)
                return (
                    <span onClick={props.onClick}>
                        <CheckIcon width={10} height={10} />
                    </span>
                );
            return '✗';
        };
    },
});

// verify -> no crendentials ? 1 or crendentials 0 & crendentials->false
// crendentials
