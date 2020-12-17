const getRouteName = (url, method) => `${url}:${method}`.toLowerCase();

module.exports = {
  getRouteName
}