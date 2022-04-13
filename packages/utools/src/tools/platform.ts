import { Platform } from "../interface";

export const platform: () => Platform = () => ({
    os: 'linux',
    end: 'utools',
});
