'use strict';

const mongoose = require('mongoose');

// definimos el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
  name: { type: String, index: true },
  venta: Boolean,
  price: { type: Number, index: true },
  photo: String,
  tags: { type: [String], index: true }
}, { collection: 'anuncios' });

// creamos un método estático
anuncioSchema.statics.listar = function(filtro, skip, limit, fields, sort) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

// creamos el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportar el modelo
module.exports = Anuncio;