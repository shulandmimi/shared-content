import './src/polyfill';
import fs from 'fs';
import { Action } from './src/upload/interface';
import uploadText from './src/upload/text';
import uploadImage from './src/upload/img';
import { resolve_config } from './src/tools/config';
import { existsOrCreate } from './src/tools/file';
import uploadFile from './src/upload/file';

interface ListItem {
    title: string;
    description: string;
    icon?: string;
}

const url = () => JSON.parse(fs.readFileSync(resolve_config(), { encoding: 'utf-8' }) || '{}').server;

const UPLOAD_SETTING_LIST = [
    {
        key: 'modifyConfig',
        title: '修改配置',
        description: '修改配置',
        callback() {
            const CONFIG_PATH = resolve_config();
            existsOrCreate(CONFIG_PATH, '{}');
            utools.shellOpenPath(CONFIG_PATH);
            utools.outPlugin();
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
                        await uploadFile(action);
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
                const item = UPLOAD_SETTING_LIST.find(select => select.key === selected.key);
                console.log(item);
                item?.callback();
            },
        },
    },
};
