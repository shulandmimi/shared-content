import fs from 'fs-extra';

export const existsOrCreate = (filename: string, defaultData = '') => {
    if (!fs.existsSync(filename)) {
        fs.writeFileSync(filename, defaultData);
    }
};
