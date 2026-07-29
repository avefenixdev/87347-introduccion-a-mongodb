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

```sh
mongodump "mongodb+srv://educacionit.aakwr9u.mongodb.net/" --username mlpeducacion --db=db_prueba
```

## Mongo Restore
Nos permite recuperar los backups de las DB o colecciones