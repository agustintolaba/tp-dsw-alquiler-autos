import { MikroORM } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export const orm = await MikroORM.init({
  entities: ['dist/**/*.entity.js'],
  entitiesTs : ['src/**/*.entity.ts'],
  dbName: 'agenciadsw',
  type: 'mysql',
  clientUrl: 'mysql://root:48964@localhost:3306/agenciadsw',
  highlighter: new SqlHighlighter(),
  debug: true,
  schemaGenerator: { //NUNCA USAR EN PRODUCCION, PUEDE BORRAR LA BASE DE DATOS
    disableForeignKeys: true,
    createForeignKeyConstraints: true,
    ignoreSchema: [],
  },
}) 

export const syncSchema = async ()=> {
  const generator = orm.getSchemaGenerator()
  /*puede ir antes un drop y create*/
  await generator.updateSchema()
}