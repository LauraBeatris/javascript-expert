const { deepStrictEqual, throws } = require('assert');

const Podcast = require('./src/Podcast');
const { PODCAST_ERROR_MESSAGES } = require('./src/errors');

const HOSTS_MOCK = [
  { firstName: 'Laura', lastName: 'Beatris' },
  { firstName: 'Joseph', lastName: 'Oliveira' }
];

(() => {
  // Should not be able to access private hosts attribute
  {
    // Fake symbol to exemplify that is not equal to the internal
    // one created inside the Podcast module
    const kHosts = Symbol('kHosts');

    const podcast = new Podcast();

    deepStrictEqual(podcast[kHosts], undefined);
  }

  // Should explicitly convert hosts to string
  {
    const podcast = new Podcast();

    HOSTS_MOCK.forEach((host) => podcast.addHost(host));

    deepStrictEqual(
      podcast.toString(), 
      `${HOSTS_MOCK[0].firstName} ${HOSTS_MOCK[0].lastName}\n${HOSTS_MOCK[1].firstName} ${HOSTS_MOCK[1].lastName}`
    );

    deepStrictEqual(
      String(podcast), 
      `${HOSTS_MOCK[0].firstName} ${HOSTS_MOCK[0].lastName}\n${HOSTS_MOCK[1].firstName} ${HOSTS_MOCK[1].lastName}`
    );
  }

  // Should implicitly convert hosts to string 
  {
    const podcast = new Podcast();

    HOSTS_MOCK.forEach((host) => podcast.addHost(host));

    deepStrictEqual(
      `${podcast}`,
      `${HOSTS_MOCK[0].firstName} ${HOSTS_MOCK[0].lastName}\n${HOSTS_MOCK[1].firstName} ${HOSTS_MOCK[1].lastName}`
    )  
  }

  // Should not allow to use a podcast instance for operations
  {
    const podcast = new Podcast();

    HOSTS_MOCK.forEach((host) => podcast.addHost(host));

    const expectedError = { 
      name: 'TypeError', 
      message: PODCAST_ERROR_MESSAGES.INVALID_OPERATION_MESSAGE
    };

    throws(() => podcast + podcast, expectedError);
    throws(() => podcast * podcast, expectedError);
    throws(() => podcast++, expectedError);
  }

  // Should be able to itinerate through podcast instance
  {
    const podcast = new Podcast();

    HOSTS_MOCK.forEach((host) => podcast.addHost(host));

    let hosts = [];

    for (const host of podcast) {
      hosts.push(host);
    }

    deepStrictEqual(hosts, HOSTS_MOCK);
    deepStrictEqual([...podcast], HOSTS_MOCK);
    deepStrictEqual(Array.from(podcast), HOSTS_MOCK);
  }
})();