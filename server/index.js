const Koa = require('koa');
const Router = require('koa-router');
const Logger = require('koa-logger');
const BodyParser = require('koa-body');
const Static = require('koa-static');

const app = new Koa();
const router = new Router();
const PORT = 1338;

// Response to GET requests
router.get('/', async (ctx) => {
  ctx.body = 'Hello, World!\n';
});

// Add routes and response to the OPTIONS requests
app.use(Static('./'));
app.use(Logger());
app.use(BodyParser());
app.use(router.routes()).use(router.allowedMethods());

// Listening to the port
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});