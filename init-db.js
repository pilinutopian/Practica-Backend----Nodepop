// Inicializa la base datos 

const readline = require('readline');

// carga los modelos
const Anuncio = require('./models/Anuncio');

async function main() {

  // pregunta al usuario
  const continuar = await preguntaSiNo('Estas seguro, seguro, seguro, que quieres borrar la base de datos? [n]')
  if (!continuar) {
    process.exit();
  }

  // conecta a la base de datos
  const connection = require('./lib/connectMongoose')

  // inicializa la colección de anuncios
  await initAnuncio();

  // desconecta de la base de datos
  connection.close();
}

main().catch(err => console.log('Hubo un error', err));

async function initAnuncio() {
  // borra los documentos de la colección de anuncios
  const result = await Anuncio.deleteMany();
  console.log(`Eliminados ${result.deletedCount} anuncios.`);

  // crea anuncios 
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