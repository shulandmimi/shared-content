import { App } from 'vue';
import _ from 'lodash';
import SettingIcon from './Setting';

export default {
    install(app: App<Element>) {
        [SettingIcon].forEach(comp => app.component(comp.name, comp));
    },
};
