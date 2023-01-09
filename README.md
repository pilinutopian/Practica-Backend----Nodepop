# Nodepop API - Práctica JS/Node.js/MongoDB - KeepCoding

Backend para dar soporte a una aplicación de venta de artículos de segunda mano.

### Inicializar:

npm install

### Cargar la data a la base de datos:

npm run init-db

### Lanzar la aplicación en desarrollo:

npm run dev

### Lanzar la aplicación en producción:

npm start

## Ejemplos de filtros:

Para obtener imagen: http://localhost:3000/images/iphone.jpeg
Para filtrar por nombre: http://localhost:3000/api/anuncios?fields=name
Para filtrar por venta http://localhost:3000/api/anuncios?venta=true
Para filtrar por tag: http://localhost:3000/api/anuncios?tags=mobile
Paginación: http://localhost:3000/api/anuncios?skip=1&limit=1
Para filtrar por campo: http://localhost:3000/api/anuncios?fields=price
