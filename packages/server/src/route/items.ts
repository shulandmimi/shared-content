import Router from '@koa/router';
import assert from 'assert';
import { Platform, DataItem } from '../../../core/src/types';

const router = new Router({ prefix: '/items' });

router.post('/sync', ctx => {
    const datas: DataItem = ctx.request.body || [];
    assert(Array.isArray(datas), 'body 需要是一个数组');
});

export default router;
