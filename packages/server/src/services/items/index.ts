import { ServiceSchema } from 'moleculer';
import ItemsModel from '../../model/items';

export default {
    name: 'items',
    mixins: [ItemsModel],
    actions: {
        async list(ctx) {
            return {
                data: await this._find(ctx, {}),
                status: 0,
            };
        },
        sync: {
            handler(ctx) {
                const { body, params } = ctx.params;
                console.log(body);
                this._insert(ctx, { entities: body });
                return body;
            },
        },
    },
} as ServiceSchema;
