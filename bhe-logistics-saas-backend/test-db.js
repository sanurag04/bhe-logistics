import { Client } from 'pg';

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: 'postgres', // connect to default
});

client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL default database');
    return client.query('CREATE DATABASE bhe_logistics');
  })
  .then(() => {
    console.log('Database bhe_logistics created');
    return client.end();
  })
  .then(() => console.log('Connection closed'))
  .catch((err) => console.error('Error:', err));
