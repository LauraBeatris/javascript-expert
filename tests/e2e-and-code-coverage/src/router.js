const { getRouteName } = require("./utils");
const { FAKE_DATABASE_USER } = require('./fixtures');

const NOT_FOUND_ROUTE_HANDLER = '/404:get';

const routeHandlers = {
  '/news:get': (_request, response) => {
    response.write('News Dashboard Page');

    return response.end();
  },
  '/login:post': async (request, response) => {
    for await (const data of request) {
      const { username, password } = JSON.parse(data);

      const isAuthorizedUser = (
        username === FAKE_DATABASE_USER.username
        && password === FAKE_DATABASE_USER.password
      );

      if (!isAuthorizedUser) {
        response.writeHead(401);

        response.write('Login failed! Unauthorized.');

        return response.end();
      }

      response.write('Login Successfully!');

      return response.end();
    }
  },
  [NOT_FOUND_ROUTE_HANDLER]: (_request, response) => {
    response.writeHead(404);

    response.write('Page Not Found');

    return response.end();
  }
}

const router = (request, response) => {
  const { url, method } = request;

  response.writeHead(200, {
    'Content-Type': 'text/html'
  });

  const routeName = getRouteName(url, method);

  const routeHandler = routeHandlers[routeName] ?? routeHandlers[NOT_FOUND_ROUTE_HANDLER];

  routeHandler(request, response);
};

module.exports = router;