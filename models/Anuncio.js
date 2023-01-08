'use strict';

const mongoose = require('mongoose');

// esquema de aununcios
const anuncioSchema = mongoose.Schema({
  name: { type: String, index: true },
  venta: Boolean,
  price: { type: Number, index: true },
  photo: String,
  tags: { type: [String], index: true }
}, { collection: 'anuncios' });

// crea static method
anuncioSchema.statics.listar = function(filtro, skip, limit, fields, sort) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

// crea el modelo de anuncio  
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportar el modelo
module.exports = Anuncio;