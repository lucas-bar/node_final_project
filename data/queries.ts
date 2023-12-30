import { Pool,QueryResult } from 'pg';

const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'Final_project',
    password: 'admin',
    port: 5432, // Port PostgreSQL par défaut
});

const getAllSubjects = async () => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM subjects');
        return result.rows;
    } finally {
        client.release();
    }
};

const getSubjectById = async (id: number) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM subjects WHERE id = $1', [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
};

const getCoursesBySubjectAndLevel = async (subjectId: number, levelId: number) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT course_id, course_name, pdf_link FROM courses WHERE subject_id = $1 order by level_id',
            [subjectId]
        );
        return result.rows;
    } finally {
        client.release();
    }
};

const getCoursesBySubjectAndLevel1 = async (subjectId: number, levelId: number) => {
    const client = await pool.connect();
    try {
        const result = await client.query(
            'SELECT course_id, course_name, pdf_link FROM courses WHERE subject_id = $1 AND level_id = $2 order by level_id',
            [subjectId, levelId]
        );
        return result.rows;
    } finally {
        client.release();
    }
};

const createUser = async (username: string, email: string, password: string): Promise<QueryResult> => {
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    const values = [username, email, password];
    return await pool.query(query, values);
};

const getUserByEmail = async (email: string): Promise<QueryResult> => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    return await pool.query(query, values);
};

const getCheminFichier = async (id: number): Promise<Buffer | null> => {
    try {
        const client = await pool.connect();
        const query = 'SELECT pdf_content FROM pdf_table WHERE pdf_id = $1';
        const values = [id];
        const result: QueryResult = await client.query(query, values);
        client.release();

        if (result.rows.length > 0) {
            return result.rows[0].pdf_content;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération du contenu du PDF:', error);
        return null;
    }
};


export { getCheminFichier,getAllSubjects, getSubjectById, getCoursesBySubjectAndLevel, getCoursesBySubjectAndLevel1,createUser, getUserByEmail };
