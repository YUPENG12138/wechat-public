const Koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const wechat = require('co-wechat');
const WechatAPI = require('co-wechat-api')
const conf = require('./conf');
const { ServerToken, ClientToken } = require('./mongoose')

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.use(static(__dirname + '/public/'))

router.all('/wechat', wechat(conf).middleware(
    async message => {
        console.log('wechat', message)
        return 'Hello ' + message.Content; 
    }
))

const api = new WechatAPI(conf.appid, conf.appsecret,
    async function () {
        console.log(1111)
        return await ServerToken.findOne()
    },
    async function (token) {
        console.log(2222, token)
        const res = await ServerToken.updateOne({}, token, { upsert: true })
    }
)


app.use(router.routes()); /* 启动路由 */
app.use(router.allowedMethods()); 

app.listen({
    host: '127.0.0.1',
    port: 4444
});