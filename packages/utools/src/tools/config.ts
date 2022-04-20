import path from 'path';
import fs from 'fs-extra';

// @ts-ignore
const resolve_app_dir = () => path.join(utools.getPath('appData'), APPNAME);

export const resolve_config = () => path.join(resolve_app_dir(), 'config.json');

export const read_config = () => JSON.parse(fs.readFileSync(resolve_config()).toString('utf-8') || '{}') as any;

export const write_config = (config: any) => fs.writeFile(resolve_config(), JSON.stringify(config, null, 4));

fs.mkdirpSync(resolve_app_dir());
