const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const wechat = require('co-wechat');
const conf = require('./conf');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(static(__dirname + '/'))

router.all('/wechat', wechat(conf).middleware(
    async message => {
        console.log('wechat', message)
        return 'Hello ' + message.Content; 
    }
))
app.use(router.routes()); /* 启动路由 */
app.use(router.allowedMethods()); 

app.listen(3000);