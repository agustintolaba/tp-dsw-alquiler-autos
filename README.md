# tpalquilervehiculos

Trabajo practico DSW

# Propusta Alquiler de Vehiculos

## Grupo

### Integrantes

- Alvarez, Thiago
- Joffre, Lucas
- Tell, Nino
- 48964, Tolaba Agustin

### Repositorios

- [frontend app](http://hyperlinkToGihubOrGitlab)
- [backend app](http://hyperlinkToGihubOrGitlab)

## Tema

### Descripción de la empresa

La empresa objeto de nuestro trabajo brinda el servicio de alquiler de vehículos particulares a clientes en diversas ciudades de Argentina.

### Modelo

![imagen del modelo]()

_Nota_: incluir un link con la imagen de un modelo, puede ser modelo de dominio, diagrama de clases, DER.

## Alcance Funcional

| Req                     | Detalle                                                                                                                                                                                                                  |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CRUD simple             | 1. CRUD Tipo Vehiculo<br>2. CRUD Reserva<br>3. CRUD Localidad <br>4. CRUD Cliente                                                                                                                                        |
| CRUD dependiente        | 1. CRUD Vehiculo {depende de} CRUD Tipo Vehiculo<br>2. CRUD Cliente {depende de} CRUD Localidad                                                                                                                          |
| Listado<br>+<br>detalle | 1. Listado de vehículos reservados por ciudad y fechas. <br> 2. Listado de Alquileres activos por ciudad y fecha.                                                                                                        |
| CUU/Epic                | 1.Realizar reserva de un vehículo. <br> 2.Realizar el alquiler de un vehículo. <br>3. Realizar devolución de un vehículo. <br> 4. Realizar cancelación de la reserva. <br> 5.Realizar el alta/baja de un nuevo vehículo. |
|                         |
