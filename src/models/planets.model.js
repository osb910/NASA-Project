const fs = require('fs');
const path = require('path');
const {parse} = require('csv-parse');
const planets = require('./planets.mongo');

const habitablePlanets = [];

const isHabitablePlanet = planet => {
  return (
    planet['koi_disposition'] === 'CONFIRMED' &&
    planet['koi_insol'] > 0.36 &&
    planet['koi_insol'] < 1.11 &&
    planet['koi_prad'] < 1.6
  );
};

const filePath = path.join(__dirname, '..', '..', 'data', 'kepler_data.csv');

const savePlanet = async planet => {
  try {
    await planets.updateOne(
      {
        keplerName: planet.keplerName,
      },
      {
        keplerName: planet.keplerName,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.error(`Could not save planet ${err}.`);
  }
};

const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        parse({
          comment: '#',
          columns: true,
        })
      )
      .on('data', async data => {
        if (isHabitablePlanet(data)) {
          savePlanet(data);
        }
      })
      .on('error', err => {
        console.log(err);
        reject(err);
      })
      .on('end', async () => {
        const countPlanets = (await getAllPlanets()).length;
        console.log(`${countPlanets} habitable planets found!`);
        resolve();
      });
  });
};

const getAllPlanets = async () => {
  return await planets.find({}, {_id: 0, __v: 0});
};

module.exports = {
  loadPlanetsData,
  getAllPlanets,
};
