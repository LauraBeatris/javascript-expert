const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

const StarWarsService = require('./src/StarWarsService');
const { alderaan, tatooine } = require('./mocks');

const {   
  STAR_WARS_PLANET_1_API_URL,
  STAR_WARS_PLANET_2_API_URL
} = require('./constants/servicesUrls');

(async () => {
  // Should return tatooine planet
  {
    const service = new StarWarsService();

    sinon
      .stub(service, service.executeRequest.name)
      .withArgs(STAR_WARS_PLANET_1_API_URL)
      .returns(tatooine);

    const planet = await service.getPlanetInfo(STAR_WARS_PLANET_1_API_URL);

    deepStrictEqual(planet, {
      name: tatooine.name,
      appearedIn: tatooine.films.length,
      surfaceWater: tatooine.surface_water,
    });
  }

  // Should return alderaan planet
  {
    const service = new StarWarsService();

    sinon
      .stub(service, service.executeRequest.name)
      .withArgs(STAR_WARS_PLANET_2_API_URL)
      .returns(alderaan);

    const planet = await service.getPlanetInfo(STAR_WARS_PLANET_2_API_URL);

    deepStrictEqual(planet, {
      name: alderaan.name,
      appearedIn: alderaan.films.length,
      surfaceWater: alderaan.surface_water,
    });
  }
})();