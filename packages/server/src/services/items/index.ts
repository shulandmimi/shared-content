import { ServiceSchema } from 'moleculer';
import ItemsModel from '../../model/items';
import { FilterOptions } from 'moleculer-db';
import * as qiniu from 'qiniu';
import _ from 'lodash';

export default {
    name: 'items',
    mixins: [ItemsModel],
    settings: {
        qiniu: {
            token: undefined,
            accessKey: process.env.QINIU_ACCESSKEY,
            secretKey: process.env.QINIU_SECRETKEY,
        },
    },
    actions: {
        async list(ctx) {
            return {
                data: await this._find(ctx, { sort: '-createdAt' } as FilterOptions),
                status: 0,
            };
        },

        sync: {
            handler(ctx) {
                const { body } = ctx.params;
                const { data = [] } = body;
                try {
                    console.log(body);
                    this._insert(ctx, { entities: data });
                } catch (error) {
                }
                return {
                    status: 0,
                };
            },
        },

        valid: {
            rest: 'POST /items/valid',
            handler(ctx) {
                return { status: 0 };
            },
        },

        token(ctx) {
            return {
                data: this.createToken(),
                status: 0,
            };
        },
    },
    methods: {
        createToken() {
            const { accessKey, secretKey, token } = this.settings.qiniu;

            if (token) {
                const { expires, start } = token;
                if (start + expires > Date.now()) {
                    return token;
                }
            }

            const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
            const expires = 7200;
            const putPolicy = new qiniu.rs.PutPolicy({
                scope: 'shared-content',
                expires,
                returnBody: '{ "size": { "width": $(imageInfo.width), "height": $(imageInfo.height) }, "bucket": $(bucket), "name": $(key) }',
            });

            const newToken = putPolicy.uploadToken(mac);
            const newTokenContext = (this.settings.qiniu.token = {
                start: Date.now(),
                token: newToken,
                expires,
            });
            return newTokenContext;
        },
    },
} as ServiceSchema;
