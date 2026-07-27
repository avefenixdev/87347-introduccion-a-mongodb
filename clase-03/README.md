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

## Buscando dentro de documentos aninados

```js
db.productos.find({
    'dimensiones.alto' : {
        $gte: 22
    }
})
```

# Insertó más data dentro de productos

```js
db.productos.insertMany([
  {
    nombre: "Camiseta Deportiva Hombre",
    categoria: "Ropa",
    precio: 29.99,
    stock: 120,
    dimensiones: { ancho: "40 cm", alto: "60 cm", peso: "200 g" },
    marca: { nombre: "SportMax", pais: "España", añoCreacion: 2010 },
    envio: { disponible: true, tiempoEstimado: "2-4 días", costo: 4.99 },
    proveedor: {
      nombre: "Textiles Europa",
      contacto: "info@textiles.com",
      telefono: "+34 600 123 456",
    },
    coloresDisponibles: ["Rojo", "Azul", "Negro"],
    tallasDisponibles: ["S", "M", "L", "XL"],
  },
  {
    nombre: "Auriculares Inalámbricos Pro",
    categoria: "Electrónica",
    precio: 89.99,
    stock: 75,
    dimensiones: { ancho: "8 cm", alto: "6 cm", peso: "150 g" },
    marca: { nombre: "AudioWave", pais: "Alemania", añoCreacion: 2015 },
    envio: { disponible: true, tiempoEstimado: "1-3 días", costo: 3.5 },
    proveedor: {
      nombre: "TechImport GmbH",
      contacto: "ventas@techimport.de",
      telefono: "+49 152 222 333",
    },
    coloresDisponibles: ["Negro", "Blanco"],
    accesoriosIncluidos: [
      "Cable USB-C",
      "Estuche de carga",
      "Almohadillas adicionales",
    ],
  },
  {
    nombre: "Silla Ergonómica Oficina",
    categoria: "Muebles",
    precio: 149.99,
    stock: 40,
    dimensiones: { ancho: "70 cm", alto: "120 cm", peso: "12 kg" },
    marca: { nombre: "ComfortSeat", pais: "Italia", añoCreacion: 2008 },
    envio: { disponible: true, tiempoEstimado: "5-7 días", costo: 9.99 },
    proveedor: {
      nombre: "Muebles Italia SRL",
      contacto: "info@mueblesitalia.it",
      telefono: "+39 333 999 888",
    },
    materiales: ["Malla transpirable", "Metal", "Plástico reforzado"],
    coloresDisponibles: ["Negro", "Gris"],
  },
  {
    nombre: "Reloj Inteligente X10",
    categoria: "Tecnología",
    precio: 129.99,
    stock: 90,
    dimensiones: { ancho: "4.2 cm", alto: "4.5 cm", peso: "50 g" },
    marca: { nombre: "TimeTech", pais: "Corea del Sur", añoCreacion: 2018 },
    envio: { disponible: true, tiempoEstimado: "3-5 días", costo: 5.99 },
    proveedor: {
      nombre: "AsiaSmart Co.",
      contacto: "contact@asiasmart.kr",
      telefono: "+82 10 3456 7890",
    },
    coloresDisponibles: ["Negro", "Plata", "Azul"],
    funciones: [
      "Monitor cardíaco",
      "GPS",
      "Notificaciones",
      "Resistente al agua",
    ],
  },
  {
    nombre: "Cafetera Espresso Automática",
    categoria: "Electrodomésticos",
    precio: 259.99,
    stock: 30,
    dimensiones: { ancho: "22 cm", alto: "32 cm", peso: "4.5 kg" },
    marca: { nombre: "CaféMaster", pais: "Suiza", añoCreacion: 2005 },
    envio: { disponible: true, tiempoEstimado: "4-6 días", costo: 7.99 },
    proveedor: {
      nombre: "SwissCoffee SA",
      contacto: "orders@swisscoffee.ch",
      telefono: "+41 79 888 7777",
    },
    funciones: ["Espresso", "Cappuccino", "Autolimpieza"],
    accesoriosIncluidos: ["Filtro", "Cuchara dosificadora"],
  },
  {
    nombre: "Mochila Antirrobo Urban",
    categoria: "Accesorios",
    precio: 49.99,
    stock: 85,
    dimensiones: { ancho: "30 cm", alto: "45 cm", peso: "900 g" },
    marca: { nombre: "UrbanPack", pais: "España", añoCreacion: 2019 },
    envio: { disponible: true, tiempoEstimado: "2-3 días", costo: 4.5 },
    proveedor: {
      nombre: "TravelGear SL",
      contacto: "contact@travelgear.es",
      telefono: "+34 612 456 789",
    },
    coloresDisponibles: ["Gris", "Negro", "Azul marino"],
    materiales: ["Poliéster", "Nylon resistente al agua"],
  },
  {
    nombre: "Set de Sartenes Antiadherentes 3 Piezas",
    categoria: "Hogar",
    precio: 79.99,
    stock: 55,
    dimensiones: { ancho: "28 cm", alto: "10 cm", peso: "3 kg" },
    marca: { nombre: "CookPro", pais: "Portugal", añoCreacion: 2003 },
    envio: { disponible: true, tiempoEstimado: "3-5 días", costo: 6.99 },
    proveedor: {
      nombre: "IberCook SA",
      contacto: "ventas@ibercook.pt",
      telefono: "+351 912 333 444",
    },
    materiales: ["Aluminio", "Revestimiento cerámico"],
    tamaños: ["20 cm", "24 cm", "28 cm"],
  },
  {
    nombre: "Lámpara LED de Escritorio",
    categoria: "Iluminación",
    precio: 34.99,
    stock: 150,
    dimensiones: { ancho: "15 cm", alto: "40 cm", peso: "500 g" },
    marca: { nombre: "BrightHome", pais: "China", añoCreacion: 2017 },
    envio: { disponible: true, tiempoEstimado: "2-4 días", costo: 3.99 },
    proveedor: {
      nombre: "Shenzhen Light Co.",
      contacto: "info@lightco.cn",
      telefono: "+86 755 8888 6666",
    },
    coloresDisponibles: ["Blanco", "Negro"],
    modosDeLuz: ["Cálida", "Fría", "Natural"],
  },
  {
    nombre: "Zapatillas Running Mujer",
    categoria: "Calzado",
    precio: 69.99,
    stock: 110,
    dimensiones: { ancho: "10 cm", alto: "12 cm", peso: "700 g" },
    marca: { nombre: "RunFast", pais: "EE.UU.", añoCreacion: 2012 },
    envio: { disponible: true, tiempoEstimado: "3-6 días", costo: 4.99 },
    proveedor: {
      nombre: "USA Sport Distributors",
      contacto: "sales@usasport.com",
      telefono: "+1 305 222 4444",
    },
    tallasDisponibles: [36, 37, 38, 39, 40],
    coloresDisponibles: ["Rosa", "Negro", "Gris"],
  },
  {
    nombre: "Tablet 10'' Pro",
    categoria: "Tecnología",
    precio: 299.99,
    stock: 50,
    dimensiones: { ancho: "25 cm", alto: "17 cm", peso: "600 g" },
    marca: { nombre: "TechTab", pais: "Japón", añoCreacion: 2016 },
    envio: { disponible: true, tiempoEstimado: "2-5 días", costo: 6.99 },
    proveedor: {
      nombre: "Nippon Electronics",
      contacto: "support@nippontech.jp",
      telefono: "+81 90 1234 5678",
    },
    accesoriosIncluidos: ["Cargador USB-C", "Funda protectora"],
    opcionesDeAlmacenamiento: ["64 GB", "128 GB", "256 GB"],
  },
]);
``` 

## Buscar dentro de documnentos anidados

```js
db.productos.find(
    {
        'proveedor.nombre': 'Nippon Electronics'
    }
)
``` 

## Métodos para contar la cantidad de documentos que nos arroja una query

```js
db.productos.find(
    {
        'envio.disponible': true
    }
).count()
// -----------
db.productos.find(
    {
        'envio.disponible': true
    }
).size()
```

# Operadores para trabajar con listas (arrays)

## Operador $push: Me permite agregar elementos al final de una lista

```js
db.productos.find({
    _id: ObjectId('6a67991dbcda42398fabc120')
})

// ----------
db.productos.updateOne(
    {
        _id: ObjectId('6a67991dbcda42398fabc120')
    },
    {
        $push: {
            accesoriosIncluidos: 'Lapíz mágico'
        }
    }
)
```

## Operador $pull: Me permite quitar el último elemento de la lista

```js
db.productos.find({
    _id: ObjectId('6a67991dbcda42398fabc11d')
})
```

```js
db.productos.updateOne(
    {
        _id: ObjectId('6a67991dbcda42398fabc11d')
    },
    {
        $pull: { materiales: 'Revestimiento cerámico' }
    }
)
``` 