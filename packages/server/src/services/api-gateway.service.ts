import APIService, { ApiSettingsSchema } from 'moleculer-web';
import cookieParser from 'cookie-parser';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import { ServiceSchema } from 'moleculer';

const crendenatial = 'ss';

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
                authorization: true,
                mergeParams: false,

                bodyParsers: {
                    json: true,
                    urlencoded: { extended: true },
                },
                use: [
                    cookieParser(),
                    // function (this: Service, req: any, _res: any, next: any) {
                    //     // console.log(this.logger.info(req.body));
                    //     // const token = req.body?.token;
                    //     // if (crendenatial && !token) {
                    //     //     // return {
                    //     //     //     status: 3,
                    //     //     //     msg: '验证失败',
                    //     //     // };
                    //     // }
                    //     // // if (_.isNil(crendenatial)) {
                    //     // //     const token = req.cookie.token;
                    //     // //     if (jwt.verify(token, crendenatial)) {
                    //     // //     }
                    //     // // }
                    //     next();
                    //     // this.logger.info(this.sendResponse('123456789'));
                    // },
                ],
                onError(this: ServiceSchema, req, res, error) {
                    if (error instanceof APIService.Errors.UnAuthorizedError) {
                        this.sendResponse(req, res, {
                            status: 3,
                            msg: error instanceof Error ? `${error.name}: ${error.message}` : error,
                            stack: error?.stack,
                        });
                        return;
                    }
                    // this.sendResponse();
                    // @ts-ignore
                    this.sendResponse(req, res, {
                        status: 1,
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
            credentials: true,
        },
        onError(req, res, error) {
            // this.sendResponse();
            // @ts-ignore
            this.sendResponse(req, res, {
                status: 1,
                msg: error instanceof Error ? `${error.name}: ${error.message}` : error,
                stack: error?.stack,
            });
        },
    } as ApiSettingsSchema,
    methods: {
        authorize(ctx, route, req, res) {
            console.log(req.body);
            const token = req.body?.token;
            if (crendenatial) {
                if (!_.isNil(token) && token === crendenatial) {
                    return Promise.resolve();
                }
            } else {
                return Promise.resolve();
            }
            // return Promise.resolve({ status: 1, msg: '123' });
            return Promise.reject(new APIService.Errors.UnAuthorizedError(null, APIService.Errors.ERR_NO_TOKEN));
        },
    },
} as ServiceSchema<any>;
