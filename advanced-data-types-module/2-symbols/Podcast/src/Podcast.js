const { PODCAST_ERROR_MESSAGES } = require('./errors');

const kHosts = Symbol('kHosts');
const kFormatHostName = Symbol('kFormatHostName');

class Podcast {
  // Private attribute
  [kHosts] = [];

  // Private method
  [kFormatHostName]({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
  } 

  addHost({ firstName, lastName }) {
    this[kHosts].push({ firstName, lastName });
  }

  toString() {
    const parsedHostsString = this[kHosts].map((host) => (
      this[kFormatHostName](host)
    )).join('\n');

    return parsedHostsString;
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType === 'string') {
      return this.toString();
    };

    throw new TypeError(PODCAST_ERROR_MESSAGES.INVALID_OPERATION_MESSAGE);
  }

  *[Symbol.iterator]() {
    for (const host of this[kHosts]) {
      yield host;
    }
  }
};

module.exports = Podcast;