print('Hola mundo!')

/* const resultSet = db.articulos.find()
console.log(resultSet) */

let resultado = db.indices.find({ nombre: 'nombre_444444' })
console.log(resultado)

// resultado es un objeto de mongo -> cursor -> un objeto que tiene metodos de mongo

console.log('Tardó: ' + resultado.explain('executionStats').executionStats.executionTimeMillis + 'ms')

resultado = db.indices.find({ _id: ObjectId('6a6cf7835f739c726eb28930')})
console.log(resultado)
console.log('Tardó: ' + resultado.explain('executionStats').executionStats.executionTimeMillis + 'ms')

// Creamos un indice al field 'nombre'

// ! Ver indices que tiene mi colección
//db.indices.getIndexes()

// ! Crear un indice
//db.<nombre-collection>.createIndex({ <field>: 1 }) // 1: asc | -1: desc
//db.indices.createIndex({ nombre: 1 }) // 1: asc | -1: desc
//db.indices.createIndex({ nombre: -1 }) // 1: asc | -1: desc

// ! Borrar un índice
db.indices.dropIndex({ nombre: 1 })
db.indices.dropIndex({ nombre: -1 })

