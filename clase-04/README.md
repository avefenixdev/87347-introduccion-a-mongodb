# Clase 04 - Introducción a MongoDB

## Levantar motor de base de datos

```sh
mongod
```

## Conectarse con el cliente al motor

```sh
mongosh # Por defecto se conectar al motor configurado en el servidor local en el puerto 27017
``` 

## Mongo Dump
Nos permite hacer un backup de la DB o de colecciones especificas.

> Backup DB remota

```sh
mongodump "mongodb+srv://educacionit.aakwr9u.mongodb.net/" --username mlpeducacion --db=db_prueba
```

## Mongo Restore
Nos permite recuperar los backups de las DB o colecciones

> Recuperar el backup en mi local

```sh
mongorestore --nsInclude=db_prueba.* ./dump
mongorestore --nsInclude=db_prueba.clientes ./dump
```

> Recuperar el backup en mi remoto

```sh
mongorestore "mongodb+srv://educacionit.aakwr9u.mongodb.net/" --nsInclude=sample_mflix.* --username mlpeducacion ./dump
```

# Trabajando con fechas

```sh
db.ventas.insertMany([
    {
        cliente: 'Ana',
        producto: 'Notebook',
        importe: 1250,
        fecha: new Date('2025-12-15T10:30:00')
    },
    {
        cliente: 'Luis',
        producto: 'Mouse',
        importe: 35,
        fecha: new Date('2026-01-10T14:45:00')
    },
    {
        cliente: 'María',
        producto: 'Teclado',
        importe: 80,
        fecha: new Date('2026-02-05T09:15:00')
    },
    {
        cliente: 'Carlos',
        producto: 'Monitor',
        importe: 420,
        fecha: new Date('2026-02-20T17:20:00')
    },
    {
        cliente: 'Sofía',
        producto: 'Auriculares',
        importe: 95,
        fecha: new Date('2026-03-12T11:00:00')
    },
])
``` 

## Mostrar cliente y fecha

```sh
db.ventas.find(
    {}, 
    {
        _id: 0,
        cliente: 1,
        fecha: 1
    }
)
```

## Buscar ventas realizadas despues del 1 de marzo del 2026

```sh
db.ventas.find(
    {
        fecha: {
            $gt: new Date('2026-03-01')
        }
    }
)
```

## Buscar las ventas realizadas entre enero y marzo del 2026

```sh
db.ventas.find(
    {
        fecha: {
            $gte: new Date('2026-01-01'),
            $lt: new Date('2026-04-01')
        }
    }
)
```

# Framework Aggregate

Permite realizar operaciones de procesamiento de datos avazanda sobres documentos de una colección. Además permite hacer transformaciones complejas, combinación de datos y cálculos utilizando una serie de etapa de agregación. Cada etapa de agregación se aplica en secuencia a los documentos de entrada. O sea toma los resultados de la etapa anterior y generar una nueva salida procesada. 
IMPORTANTE: Ocurre todo dentro del motor de Mongo.

<https://www.mongodb.com/docs/manual/aggregation/>
<https://www.mongodb.com/docs/manual/reference/operator/aggregation/>
<https://www.mongodb.com/developer/products/mongodb/introduction-aggregation-framework/>

* $match: Podemos realizar condiciones para afinar nuestra búsqueda sobre documentos. Muy parecido al find()
* $project: Permite añadir, renombrar, eliminar o relizar operaciones sobre los fields de los documentos. 
* $limit: Permite delimitar la cantidad de documentos
* $group: Permite agrupar documentos con la finalidad de calcular valores basados en una colección.
* $sort: Podemos ordenar nuestros documentos basado en uno o varios fields.
* $skip: Permite saltar los documentos indicados
* $count: Permite obtener el número de documentos que tienen en la etapa especifica
* $out: Permite agregar los documentos obtenidos en una nueva colección.
* $unwind: Desarma el array y genera multiples documentos, creando una copia del documento original por cada elemento del lista (array)
* $regex: Permite usar expresiones regulares para buscar patrones en strings (like)
* $reduce: Aplicar una expresión a cada elemento de un array y acumula el resultado.
* $avg, $max, $min, $sum: Funciones de agregación para sacar el promedio, el valor máximo, el valor mínima y la sumatoria de elementos.
* $lookup: Realiza una unión entre colecciones. Es similar a una unión externa izquierda ( LEFT OUTER JOIN ). Toma documentos de una colección (de entrada) y los enriquece con los datos relaciones de otra colecciones (colección unida)


## Creamos el st de datos

> Categorias

```js
[
  {
    "_id": ObjectId("64f100000000000000000001"),
    "nombre": "Notebooks",
    "activo": true
  },
  {
    "_id": ObjectId("64f100000000000000000002"),
    "nombre": "Monitores",
    "activo": true
  },
  {
    "_id": ObjectId("64f100000000000000000003"),
    "nombre": "Periféricos",
    "activo": true
  }
]
```

> Colección productos

```sh
[
  {
    "_id": ObjectId("64f200000000000000000001"),
    "nombre": "Notebook Lenovo",
    "precio": 1200,
    "stock": 8,
    "categoriaId": ObjectId("64f100000000000000000001"),
    "proveedor": {
      "nombre": "Tech Import",
      "pais": "China"
    }
  },
  {
    "_id": ObjectId("64f200000000000000000002"),
    "nombre": "Notebook Dell",
    "precio": 1500,
    "stock": 4,
    "categoriaId": ObjectId("64f100000000000000000001"),
    "proveedor": {
      "nombre": "Dell Inc",
      "pais": "USA"
    }
  },
  {
    "_id": ObjectId("64f200000000000000000003"),
    "nombre": "Monitor Samsung",
    "precio": 400,
    "stock": 20,
    "categoriaId": ObjectId("64f100000000000000000002"),
    "proveedor": {
      "nombre": "Samsung",
      "pais": "Corea"
    }
  },
  {
    "_id": ObjectId("64f200000000000000000004"),
    "nombre": "Mouse Logitech",
    "precio": 35,
    "stock": 80,
    "categoriaId": ObjectId("64f100000000000000000003"),
    "proveedor": {
      "nombre": "Logitech",
      "pais": "Suiza"
    }
  }
]
```

> Clientes

```js
[
    {
        "_id":ObjectId("64f300000000000000000001"),
        "nombre":"Juan Pérez",
        "edad":30,
        "email":"juan@mail.com",
        "direccion":{
        "calle":"San Martín 123",
        "ciudad":"Buenos Aires",
        "provincia":"Buenos Aires",
        "coordenadas":{
        "lat":-34.60,
        "lng":-58.38
    }
    },
        "telefonos":[
            {"tipo":"Celular","numero":"111111111"},
            {"tipo":"Trabajo","numero":"444444444"}
    ],
    "preferencias":{
    "newsletter":true,
    "categoriasFavoritas":[
            ObjectId("64f100000000000000000001"),
            ObjectId("64f100000000000000000003")
        ]
    }
    },
    {
        "_id":ObjectId("64f300000000000000000002"),
        "nombre":"Ana Gómez",
        "edad":25,
        "email":"ana@mail.com",
        "direccion":{"calle":"Belgrano 456","ciudad":"Córdoba","provincia":"Córdoba"},
        "telefonos":[{"tipo":"Celular","numero":"222222222"}],
        "preferencias":{"newsletter":false,"categoriasFavoritas":[ObjectId("64f100000000000000000002")]}
    },
    {
        "_id":ObjectId("64f300000000000000000003"),
        "nombre":"Carlos Díaz",
        "edad":41,
        "email":"carlos@mail.com",
        "direccion":{"calle":"Roca 555","ciudad":"Rosario","provincia":"Santa Fe"},
        "telefonos":[{"tipo":"Casa","numero":"333333333"}],
        "preferencias":{"newsletter":true,"categoriasFavoritas":[ObjectId("64f100000000000000000001")]}
    },
    {
        "_id":ObjectId("64f300000000000000000004"),
        "nombre":"Lucía Fernández",
        "edad":36,
        "email":"lucia@mail.com",
        "direccion":{"calle":"España 20","ciudad":"Mendoza","provincia":"Mendoza"},
        "telefonos":[{"tipo":"Celular","numero":"444444444"}],
        "preferencias":{"newsletter":true,"categoriasFavoritas":[ObjectId("64f100000000000000000003")]}
    },
    {
        "_id":ObjectId("64f300000000000000000005"),
        "nombre":"Pedro López",
        "edad":50,
        "email":"pedro@mail.com",
        "direccion":{"calle":"Mitre 400","ciudad":"Salta","provincia":"Salta"},
        "telefonos":[{"tipo":"Celular","numero":"555555555"}],
        "preferencias":{"newsletter":false,"categoriasFavoritas":[]}
    },
    {
        "_id":ObjectId("64f300000000000000000006"),
        "nombre":"Laura Torres",
        "edad":28,
        "email":"laura@mail.com",
        "direccion":{"calle":"Colón 44","ciudad":"La Plata","provincia":"Buenos Aires"},
        "telefonos":[{"tipo":"Celular","numero":"666666666"}],
        "preferencias":{"newsletter":true,"categoriasFavoritas":[ObjectId("64f100000000000000000002")]}
    },
    {
        "_id":ObjectId("64f300000000000000000007"),
        "nombre":"Diego Ruiz",
        "edad":39,
        "email":"diego@mail.com",
        "direccion":{"calle":"Sarmiento 100","ciudad":"Neuquén","provincia":"Neuquén"},
        "telefonos":[{"tipo":"Casa","numero":"777777777"}],
        "preferencias":{"newsletter":false,"categoriasFavoritas":[ObjectId("64f100000000000000000001")]}
    },
    {
        "_id":ObjectId("64f300000000000000000008"),
        "nombre":"María Castro",
        "edad":45,
        "email":"maria@mail.com",
        "direccion":{"calle":"Laprida 500","ciudad":"Tucumán","provincia":"Tucumán"},
        "telefonos":[{"tipo":"Trabajo","numero":"888888888"}],
        "preferencias":{"newsletter":true,"categoriasFavoritas":[ObjectId("64f100000000000000000003")]}
    },
    {
        "_id":ObjectId("64f300000000000000000009"),
        "nombre":"Fernando Silva",
        "edad":31,
        "email":"fernando@mail.com",
        "direccion":{"calle":"Moreno 700","ciudad":"Mar del Plata","provincia":"Buenos Aires"},
        "telefonos":[{"tipo":"Celular","numero":"999999999"}],
        "preferencias":{"newsletter":true,"categoriasFavoritas":[ObjectId("64f100000000000000000001")]}
    },
    {
        "_id":ObjectId("64f300000000000000000010"),
        "nombre":"Sofía Romero",
        "edad":22,
        "email":"sofia@mail.com",
        "direccion":{"calle":"9 de Julio 88","ciudad":"San Juan","provincia":"San Juan"},
        "telefonos":[{"tipo":"Celular","numero":"101010101"}],
        "preferencias":{"newsletter":false,"categoriasFavoritas":[ObjectId("64f100000000000000000002")]}
    }
]
```