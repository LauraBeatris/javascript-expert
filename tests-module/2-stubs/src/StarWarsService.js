const https = require('https');

class StarWarsService {
  executeRequest() {
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on('data', (data) => resolve(JSON.parse(data)));
        response.on('error', (error) => reject(error));
      });
    });
  };

  async getPlanetInfo(url) {
    const { name, surface_water, films } = await this.executeRequest(url);

    return {
      name, 
      appearedIn: films.length,
      surfaceWater: surface_water,
    }
  }
};

module.exports = StarWarsService;