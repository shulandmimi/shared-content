import { ServiceSchema } from 'moleculer';
import ItemsModel from '../../model/items';
import { FilterOptions } from 'moleculer-db';

export default {
    name: 'items',
    mixins: [ItemsModel],
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
                try {
                    this._insert(ctx, { entities: body });
                } catch (error) {
                    console.log(this.logger.error(error));
                }
                return {
                    status: 0,
                };
            },
        },
    },
} as ServiceSchema;
