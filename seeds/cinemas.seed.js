const mongoose = require('mongoose');
const Cinema = require('../models/Cinema');
const { urlDb } = require('../utils/db');

const cinemas = [
  {
    name: 'Cine Capitol',
    location: 'Madrid',
    movies: ['The Matrix', 'Interestelar', 'Buscando a Nemo'],
  },
  {
    name: 'Cines Verdi',
    location: 'Barcelona',
    movies: ['The Matrix Reloaded', 'Buscando a Dory'],
  },
  {
    name: 'Cine Lys',
    location: 'Valencia',
    movies: ['50 primeras citas', 'Interestelar'],
  },
];

const cinemaDocuments = cinemas.map((cinema) => new Cinema(cinema));

mongoose
  .connect(urlDb)
  .then(async () => {
    const allCinemas = await Cinema.find();
    if (allCinemas.length) {
      await Cinema.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Cinema.insertMany(cinemaDocuments);
    console.log('Cinemas created');
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
