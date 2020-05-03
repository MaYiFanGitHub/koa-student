const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const session = require('koa-session')
// 使用require-directory加载路由文件夹下的所有router
const requireDirectory = require('require-directory');

// 统一处理返回格式的自定义中间件
const RouterResponse = require('./util/RouterResponse')
// 处理跨域问题
const KoaCors = require('koa2-cors')

// error handler
onerror(app);

app.keys = ['student_session'];
const CONFIG = {
  key: 'koa:sess', /* 默认的cookie签名 */
  maxAge: 86400000,/* cookie的最大过期时间 */
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** 无效属性 */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** 默认签名与否 */
  rolling: false, /** 每次请求强行设置cookie */
  renew: false, /** cookie快过期时自动重新设置*/
};
 
app.use(session(CONFIG, app));

app.use(KoaCors())
// middlewares 中间件
app.use(
  koaBody({
    multipart:true, // 支持文件上传
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
);

// logger 日志打印输出
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


// 返回格式统一处理
app.use(RouterResponse());
// routes 路由, 自动引用 routers 文件下的所有路由
requireDirectory(module, './routes', {
  visit: obj => {
    app.use(obj.routes(), obj.allowedMethods());
  }
});

// error-handling 错误处理
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
