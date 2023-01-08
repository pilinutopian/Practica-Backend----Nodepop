// Inicializar la base datos con los datos mínimos para funcionar

const readline = require('readline');

// cargamos los modelos
const Anuncio = require('./models/Anuncio');

async function main() {

  const continuar = await preguntaSiNo('Estas seguro que quieres borrar la base de datos? [s/n]')
  if (!continuar) {
    process.exit();
  }

  // conectar a la base de datos
  const connection = require('./lib/connectMongoose')

  // inicializar la colección de anuncios
  await initAnuncio();

  // desconectamos de la base de datos
  connection.close();
}

main().catch(err => console.log('Hubo un error', err));

async function initAnuncio() {
  // borrar todos los documentos de la colección de anuncios
  const result = await Anuncio.deleteMany();
  console.log(`Eliminados ${result.deletedCount} anuncios.`);

  // crear anuncios iniciales
  const inserted = await Anuncio.insertMany([
    {name: "iphone", venta: "false", price: 345, photo: "foto2", tags: "mobile"},
    {name: "bicicleta", venta: "true", price: 500, photo: "foto1", tags: "motor"},
  ]);
  console.log(`Creados ${inserted.length} anuncios.`)
}

function preguntaSiNo(texto) {
  return new Promise((resolve, reject) => {
    const interface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    interface.question(texto, respuesta => {
      interface.close();
      if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  })
}