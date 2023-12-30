"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'admin',
    host: 'localhost',
    database: 'Final_project',
    password: 'admin',
    port: 5432, // Le port par défaut de PostgreSQL est 5432
});
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données', err);
    }
    else {
        console.log('Connecté à la base de données');
    }
});
