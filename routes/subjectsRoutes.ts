import express from 'express';
import {getCoursesByLevelHandler,recupererCheminFichier, getSubjectByIdHandler, signUp, signIn ,getSubjects,getCoursesBySubjectAndLevelHandler1} from '../controllers/subjectsController';

const subjectsRouter = express.Router();

subjectsRouter.get('/', getSubjects);
subjectsRouter.get('/:id', getSubjectByIdHandler);
subjectsRouter.get('/:id/levels/', getCoursesByLevelHandler);
subjectsRouter.get('/:id/levels/:levelId', getCoursesBySubjectAndLevelHandler1);
subjectsRouter.post('/signup', signUp);
subjectsRouter.post('/signin', signIn);
subjectsRouter.get('/:id/levels/:levelId/pdf', recupererCheminFichier); // Appel à la fonction du contrôleur
export default subjectsRouter;
