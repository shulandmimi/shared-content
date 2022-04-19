import path from 'path';
import fs from 'fs-extra';

export const resolve_config = () => path.join(utools.getPath('temp'), 'config.json');

export const read_config = () => JSON.parse(fs.readFileSync(resolve_config()).toString('utf-8') || '{}') as any;

export const write_config = (config: any) => fs.writeFile(resolve_config(), JSON.stringify(config, null, 4));
