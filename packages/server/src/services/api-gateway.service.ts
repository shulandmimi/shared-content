import { Service } from 'moleculer';
import APIService, { ApiSettingsSchema } from 'moleculer-web';

export default {
    name: 'Getaway',
    mixins: [APIService],
    settings: {
        port: process.env.PORT || 12306,
        path: '/',
        routes: [
            {
                path: '/',
                whitelist: ['**'],
                authorization: false,
                mergeParams: false,
                bodyParsers: {
                    json: true,
                    urlencoded: { extended: true },
                },

                use: [],
                onError(req, res, error) {
                    // this.sendResponse();
                    // @ts-ignore
                    this.sendResponse(req, res, {
                        status: 0,
                        msg: error instanceof Error ? `${error.name}: ${error.message}` : error,
                        stack: error?.stack,
                    });
                },
            },
        ],
        cors: {
            methods: ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT'],
            origin: '*',
            maxAge: 3600,
        },
        onError(req, res, error) {
            // this.sendResponse();
            // @ts-ignore
            this.sendResponse(req, res, {
                status: 0,
                msg: error instanceof Error ? `${error.name}: ${error.message}` : error,
                stack: error?.stack,
            });
        },
    } as ApiSettingsSchema,
};
