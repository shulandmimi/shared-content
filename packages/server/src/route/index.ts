import Router from '@koa/router';
import itemsRoute from './items';

export default new Router().use(itemsRoute.routes());
