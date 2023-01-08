'use strict';

const express = require('express');
const createError = require('http-errors');
const Anuncio = require('../../models/Anuncio');

const router = express.Router();

// CRUD

// GET /api/anuncios
// Devuelve una lista de anuncios
router.get('/', async (req, res, next) => {
  try {

    // filtros
    const name = req.query.name;
    const venta = req.query.venta;
    const price = req.query.price;
    const photo = req.query.photo;
    const tags = req.query.tags;

    // paginación
    const skip = req.query.skip;
    const limit = req.query.limit;

    // selección de campos
    const fields = req.query.fields; // /api/anuncios?fields=name -_id

    // ordenación
    const sort = req.query.sort; // /api/anuncios?sort=age%20name

    const filter = {};

    if (name) {
      filter.name = name;
    }

    if (tags) {
      filter.tags = {$in: tags};
    }
        
    if (venta) {
      filter.venta = venta;
    }
    if (photo) {
      filter.photo = photo;
    }

    if (price) {
      if (price.includes('-')){
        const prices = price.split('-');
        if(prices[0] === ''){
          filter.price = {$lte: prices[1]};
        }else if (prices[1] === ''){
          filter.price = {$gte: prices[0]};
        }else{
          filter.price = {$gte: prices[0], $lte: prices[1]}
        }
      }else{
        filter.price = price;
        }
      }

    const anuncios = await Anuncio.listar(filter, skip, limit, fields, sort); 
      res.json({ result: anuncios });

    }catch(err){
        next(err);
    }
});

// GET /api/anuncios/(id)
// Devuelve un anuncio
router.get('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;

    // buscar un anuncio en la BD
    const anuncio = await Anuncio.findById(id);

    res.json({ result: anuncio });

  } catch (err) {
    next(err);
  }
});

router.get('/tags', async (req, res, next) => {
  try{
      const tagExistente = await Anuncio.listTags();
      res.json({ tags: tagExistente });
  }catch(err){
      next(err);
  }
});

// PUT /api/anuncios/(id) (body=anuncioData)
// Actualizar un anuncio
router.put('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;
    const anuncioData = req.body;

    const anuncioActualizado = await Anuncio.findOneAndUpdate({ _id: id}, anuncioData, {
      new: true // esto hace que nos devuelva el documento actualizado
    });

    res.json({ result: anuncioActualizado });

  } catch (err) {
    next(err);
  }
});

// POST /api/anuncios (body=anuncioData)
// Crear un anuncio
router.post('/', async (req, res, next) => {
  try {

    const anuncioData = req.body;

    // instanciar un nuevo anuncio en memoria
    const anuncio = new Anuncio(anuncioData);

    // lo guardo en la base de datos
    const anuncioGuardado = await anuncio.save();

    res.json({ result: anuncioGuardado });

  } catch (err) {
    next(err);
  }
});

// DELETE /api/anuncios/:id
// Eliminar un anuncio
router.delete('/:id', async (req, res, next) => {
  try {

    const id = req.params.id;

    const anuncio = await Anuncio.findById(id);

    if (!anuncio) {
      // const err = new Error('not found');
      // err.status = 404;
      return next(createError(404));
    }

    await Anuncio.deleteOne({ _id: id });

    res.json();

  } catch (err) {
    next(err);
  }
});

module.exports = router;
