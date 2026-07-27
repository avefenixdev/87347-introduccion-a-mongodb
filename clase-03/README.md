# Clase 02 - Introducción a MongoDB

## Levantar el servidor de base datos

```sh
mongod 
```

## Conectarse al motor de base de datos

```sh
mongosh
```

## Listar las bases de datos

```js
show dbs // show databases
```

## Crear o seleccionar una DB

```js
use <nombre-db>
use <mongo_87347>
```

# Creamos más productos dentro de nuestro set de datos

```js
db.productos.insertMany(
    [
       {
        nombre: 'PC Gamer',
        categoria: 'Informatica',
        dimensiones: {
            alto: 32,
            ancho: 33,
            profundidad: 44,
        }, /* documento anidado */
        etiquetas: ['tecnologia', 'desktop', 'electronica', 'gamer'], /* listas */
        stock: 10,
        isActived: true,
        precio: 323.3
       },
       {
        nombre: 'Notebook Gamer',
        categoria: 'Informatica',
        dimensiones: {
            alto: 10,
            ancho: 20,
            profundidad: 30,
        },
        etiquetas: [ 'tecnologia', 'notebook', 'portatil', 'electronica'],
        stock: 10,
        isActived: true,
        precio: 555.4
       },
       {
        nombre: 'Monitor Samsung',
        categoria: 'Informatica',
        dimensiones: {
            alto: 25,
            ancho: 40,
            profundidad: 5
        },
        etiquetas: [ 'tecnologia', 'monitor', 'Full HD'],
        stock: 4,
        isActived: true,
        precio: 334.4
       }
    ]
)
```  

