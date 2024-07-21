import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    database: 'm7_d11_repertorio',
    idleTimeoutMillis: 1000
});

export default pool; 