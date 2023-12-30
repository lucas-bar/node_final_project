import express from 'express';
import subjectsRouter from './routes/subjectsRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Autorise l'accès depuis cette URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Répond favorablement aux requêtes OPTIONS
    }
    next();
});
app.get('/', (req, res) => {
    res.send('Backend is up and running with TypeScript!');
});

app.use('/subjects', subjectsRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
