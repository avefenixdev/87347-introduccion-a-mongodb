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

## Crear una colección

```js
db.createCollection('<nombre-de-colección>') // El nombre de las colecciones debe ser un sustantivo en plural. Usar snake_case en caso de que el nombre de la colección tenga 2 o más palabras
db.createCollection('productos')
```

## Crear un documento

```js
db.<colección>.insertOne({})
db.productos.insertOne(
    { 
        nombre: 'PC', 
        categoria: 'informatica', 
        precio: 253 
    }
)
// ------------
{
  acknowledged: true,
  insertedId: ObjectId('6a63ab266ffed9155f37abe6') // indentificado único
}
```

## Crear uno o más documentos

```js
db.<colección>.insertMany([{},{},{}])
db.productos.insertMany(
    [
        {
            nombre: 'Tablet',
            categoria: 'Electro',
            precio: 123
        },
        {
            nombre: 'Celular',
            categoria: 'Electro',
            precio: 212
        },
        {
            nombre: 'Parlante',
            categoria: 'Audio',
            precio: 105
        }
    ]
)
// ----------------
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('6a63accf957fac6297abc114'),
    '1': ObjectId('6a63accf957fac6297abc115'),
    '2': ObjectId('6a63accf957fac6297abc116')
  }
}
```

# Listar elementos (documentos) dentro de una colección

```js
db.<nombre-colección>.find({})
db.productos.find() // db.productos.find({})
```

# Filtrar o buscar elementos en particular

```js
db.<nombre-colección>.find({ field: '' })
db.productos.find({
    nombre: 'PC'
}) 
```

# Crear una colección e insertar un documento todo en un solo paso

```js
db.<coleccion>.insertMany()
db.usuarios.insertMany(
    [
        {   
            nombre: 'Luis',
            edad: 22,
        },
        {   
            nombre: 'Ana',
            edad: 43,
        },
        {   
            nombre: 'Laura',
            edad: 33,
        },
        {   
            nombre: 'Grisel',
            edad: 23,
        },
        {   
            nombre: 'Pedro',
            edad: 41,
        },
    ]
)
```

## Contar cantidad de documentos dentro de una colección

```js
db.<nombre-coleccion>.countDocuments()
```

## Contar la cantidad de documentos que nos devuelve una consulta (find())

```js
db.<nombre-coleccion>.find().count()
db.<nombre-coleccion>.find().size()
```

# Operadores -> $

## Operadores de comparación


<https://www.mongodb.com/es/docs/manual/reference/mql/query-predicates/comparison/>

Operador
Descripción

### $eq: Iguales que

```js
db.<nombre-colección>.find({})
db.usuarios.find({
    nombre: {
        $eq: 'Luis'
    }
})
``` 

### $gt: Más grandes que...


```js
db.usuarios.find({
    edad: {
        $gt: 33
    }
}) // Los usuarios que tengan arriba de 33 años
```

### $gte: Más grandes e iguales que..

```js
db.usuarios.find({
    edad: {
        $gte: 33
    }
}) // Los usuarios que tengan arriba de 33 años incluido el 33
``` 

### $lt: Más chicos que...

```js
db.usuarios.find({
    edad: {
        $lt: 33
    }
}) 
``` 

### $lte: Más chicos o iguales que...

```js
db.usuarios.find({
    edad: {
        $lte: 33
    }
}) 
```

### $ne: No igual...

```js
db.usuarios.find({
    edad: {
        $ne: 33
    }
}) 
```

### $in: Busca los elementos de la lista

```js
db.usuarios.find({
    edad: {
        $in: [10, 15, 50, 33, 23]
    }
}) 
```

### $nin: Busca los elementos contrarios a los del listad

```js
db.usuarios.find({
    edad: {
        $in: [10, 15, 50, 33, 23]
    }
}) 
``` 

## Operación lógicos

<https://www.mongodb.com/es/docs/manual/reference/mql/query-predicates/logical/>

### $and:

```js
db.usuarios.find({
    $and: [
        { nombre: 'Luis' },
        { edad: 22 }
    ]
})
```

### $not: Niega una condición aplicada sobre un field

```js
db.usuarios.find({
    edad: {
        $not:{
            $gte: 33
        }
    } 
})
```

### $nor: Devuelve los documentos que no cumplen con ninguna condición

```js
db.usuarios.find(
    {
        $nor: [
            { nombre: 'Luis' },
            { edad: 41 }
        ]
    }
)
```

### $or: Aunque sea una se tiene que cumplir.

```js
db.usuarios.find(
    {
        $or: [
            { nombre: 'Luis' },
            { edad: 55 }
        ]
    }
)
```