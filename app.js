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

app.use(KoaCors({
  origin: function(ctx) { //设置允许来自指定域名请求
      if (ctx.url === '/test') {
          return '*'; // 允许来自所有域名请求
      }
      return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
}))
// middlewares 中间件
app.use(
  koaBody({
    multipart:true, // 支持文件上传
    formidable: {
        maxFileSize: 1000*1024*1024    // 设置上传文件大小最大限制，10M
    }
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
