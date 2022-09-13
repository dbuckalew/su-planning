import { Knex, knex } from 'knex';
require('dotenv').config();

const env = process.env;

const config: Knex.Config = {
  client: 'mysql',
  connection:  `mysql://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_BASE}`,
};

export const db = knex(config);