import './src/polyfill';
import path from 'path';
import fs from 'fs';
import { Action } from './src/upload/interface';
import uploadText from './src/upload/text';
import uploadImage from './src/upload/img';

interface ListItem {
    title: string;
    description: string;
    icon?: string;
}

const resolve_config = () => path.join(utools.getPath('temp'), 'config.json');

const url = () => JSON.parse(fs.readFileSync(resolve_config(), { encoding: 'utf-8' }) || '{}').server;

const UPLOAD_SETTING_LIST = [
    {
        key: 'modifyConfig',
        title: '修改配置',
        description: '修改配置',
        callback() {
            const CONFIG_PATH = resolve_config();
            if (!fs.existsSync(CONFIG_PATH)) {
                fs.writeFileSync(CONFIG_PATH, JSON.stringify({}, null, 4));
            }
            utools.shellOpenPath(CONFIG_PATH);
        },
    },
];

window.exports = {
    upload: {
        mode: 'none',
        args: {
            enter: async (action: Action<any>) => {
                switch (action.type) {
                    case 'over':
                        await uploadText(action);
                        break;
                    case 'file':
                        break;
                    case 'img':
                        await uploadImage(action);
                        break;
                }

                utools.outPlugin();
            },
        },
    },
    'upload-setting': {
        mode: 'list',
        args: {
            // @ts-ignore
            enter(action, callback) {
                callback(UPLOAD_SETTING_LIST);
            },
            // @ts-ignore
            select(action, selected, callback) {
                console.log(action, selected);
                const item = UPLOAD_SETTING_LIST.find(select => select.key === selected.key);
                console.log(item);
                item?.callback();
            },
        },
    },
};
