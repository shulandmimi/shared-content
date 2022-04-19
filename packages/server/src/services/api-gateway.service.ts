import APIService from 'moleculer-web';

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
            },
        ],
        cors: {
            methods: ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT'],
            origin: '*',
            maxAge: 3600,
        },
    },
};
