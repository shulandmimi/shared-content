import _ from 'lodash';
import { defineComponent, ref, reactive } from 'vue';
import ModifyList from './component/ModifyList';
import StaticList from './component/StaticList';

export const SERVER_LIST_KEY = 'SETTINGS.serverList';
export const SERVER_CURRENT_INDEX = 'SETTINGS.serverList.currentIndex';

export default defineComponent({
    name: 'ServerList',
    setup() {
        const state = reactive({
            modify: false,
        });

        return () => (state.modify ? <ModifyList onChange={() => (state.modify = false)} /> : <StaticList onModify={() => (state.modify = true)} />);
    },
});
