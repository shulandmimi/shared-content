import Koa from 'koa';
import Bodyparser from 'koa-bodyparser';
import router from './route';

const app = new Koa();

const port = 12306;

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    console.log(`${ctx.path} ${Date.now() - start}ms`);
});

app.use(Bodyparser());

app.use(router.routes());

app.listen(port, () => {
    console.log(`listen on http://127.0.0.1:${port}`);
});
