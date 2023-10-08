/*PRUEBA DE CONEXION A LA BD*/

import mysql from 'mysql2/promise'

export const pooldb= mysql.createPool({
  /*host: process.env.DB_HOST ||'localhost',
  user: process.env.DB_USER ||'root',
  password: process.env.DB_PASSWORD||'48964',
  database: process.env.DB_NAME||'agencia_autos',*/
  host: "localhost",
  user: "root",
  password: "48964",
  database: "agencia_autos",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle:10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
})







