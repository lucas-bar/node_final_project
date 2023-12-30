"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createUser = exports.getCoursesBySubjectAndLevel1 = exports.getCoursesBySubjectAndLevel = exports.getSubjectById = exports.getAllSubjects = exports.getCheminFichier = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'admin',
    host: 'localhost',
    database: 'Final_project',
    password: 'admin',
    port: 5432, // Port PostgreSQL par défaut
});
const getAllSubjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const result = yield client.query('SELECT * FROM subjects');
        return result.rows;
    }
    finally {
        client.release();
    }
});
exports.getAllSubjects = getAllSubjects;
const getSubjectById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const result = yield client.query('SELECT * FROM subjects WHERE id = $1', [id]);
        return result.rows[0];
    }
    finally {
        client.release();
    }
});
exports.getSubjectById = getSubjectById;
const getCoursesBySubjectAndLevel = (subjectId, levelId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const result = yield client.query('SELECT course_id, course_name, pdf_link FROM courses WHERE subject_id = $1 order by level_id', [subjectId]);
        return result.rows;
    }
    finally {
        client.release();
    }
});
exports.getCoursesBySubjectAndLevel = getCoursesBySubjectAndLevel;
const getCoursesBySubjectAndLevel1 = (subjectId, levelId) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        const result = yield client.query('SELECT course_id, course_name, pdf_link FROM courses WHERE subject_id = $1 AND level_id = $2 order by level_id', [subjectId, levelId]);
        return result.rows;
    }
    finally {
        client.release();
    }
});
exports.getCoursesBySubjectAndLevel1 = getCoursesBySubjectAndLevel1;
const createUser = (username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    const values = [username, email, password];
    return yield pool.query(query, values);
});
exports.createUser = createUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    return yield pool.query(query, values);
});
exports.getUserByEmail = getUserByEmail;
const getCheminFichier = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield pool.connect();
        const query = 'SELECT pdf_content FROM pdf_table WHERE pdf_id = $1';
        const values = [id];
        const result = yield client.query(query, values);
        client.release();
        if (result.rows.length > 0) {
            return result.rows[0].pdf_content;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Erreur lors de la récupération du contenu du PDF:', error);
        return null;
    }
});
exports.getCheminFichier = getCheminFichier;
