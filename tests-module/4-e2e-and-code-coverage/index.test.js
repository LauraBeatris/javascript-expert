const { describe, it } = require('mocha');
const supertest = require('supertest');
const { deepStrictEqual, ok } = require('assert');

const server = require('./src/server');
const { FAKE_DATABASE_USER } = require('./src/fixtures');

const request = () => supertest(server);

describe('API Test Suite', () => {
  describe('/news', () => {
    it('should request the news dashboard page and return response with HTTP status 200', async () => {
      const { text } = await request(server)
        .get('/news')
        .expect(200);

      const expectedResponseText = 'News Dashboard Page';

      deepStrictEqual(text, expectedResponseText);
    });
  });

  describe('/login', () => {
    it('should be able to login successfully and return response with HTTP status 200', async () => {
      const { text } = await request(server)
        .post('/login')
        .send(FAKE_DATABASE_USER)
        .expect(200);

      const expectedResponseText = 'Login Successfully!';

      deepStrictEqual(text, expectedResponseText);
    });

    it('should not be able to login with invalid credentials and should return response with HTTP status 401', async () => {
      const { unauthorized, text } = await request(server)
        .post('/login')
        .send({
          ...FAKE_DATABASE_USER,
          password: 'Invalid Password'
        })
        .expect(401);

      const expectedResponseText = 'Login failed! Unauthorized.'

      ok(unauthorized);
      deepStrictEqual(text, expectedResponseText);
    });
  });

  describe('404 route', () => {
    it('should request an nonexisting route and redirect to a route that returns a response with HTTP status 404', async () => {
      const { text } = await request(server)
        .get('/nonexisting-route')
        .expect(404);

      const expectedResponseText = 'Page Not Found';

      deepStrictEqual(text, expectedResponseText);
    });
  });
});