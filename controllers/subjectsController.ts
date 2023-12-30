// subjectsController.ts

import { Request, Response } from 'express';
import { getCheminFichier, getAllSubjects, getSubjectById, getCoursesBySubjectAndLevel,getCoursesBySubjectAndLevel1, createUser, getUserByEmail } from '../data/queries';


const getSubjects = async (req: Request, res: Response) => {
    try {
        const subjects = await getAllSubjects();
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des matières' });
    }
};


const getSubjectByIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const subject = await getSubjectById(parseInt(id, 10)); // Récupère une matière par son ID depuis la base de données
        if (subject) {
            res.json(subject);
        } else {
            res.status(404).json({ message: 'Matière non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la matière par ID' });
    }
};


const getCoursesByLevelHandler = async (req: Request, res: Response) => {
    const { id, levelId } = req.params; // Récupération des paramètres d'URL

    try {
        const courses = await getCoursesBySubjectAndLevel(parseInt(id, 10), parseInt(levelId, 10)); // Appel de la fonction pour récupérer les cours
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des cours par niveau' });
    }
};

const getCoursesBySubjectAndLevelHandler1 = async (req: Request, res: Response) => {
    const { id, levelId } = req.params; // Récupération des paramètres d'URL

    try {
        const courses = await getCoursesBySubjectAndLevel1(parseInt(id, 10), parseInt(levelId, 10));
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des cours pour le sujet et le niveau spécifiés' });
    }
};

const signUp = async (req: Request, res: Response): Promise<any> => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        await createUser(username, email, password);
        return res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
    }
};

const signIn = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        // Récupérer l'utilisateur à partir de l'email
        const user = await getUserByEmail(email);
        if (user.rows.length === 0 || password !== user.rows[0].password) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }

        // Authentification réussie
        return res.status(200).json({ message: 'Connexion réussie.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
};

const recupererCheminFichier = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const pdfContent = await getCheminFichier(parseInt(id, 10));

        if (pdfContent) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="nom_du_fichier.pdf"`);
            res.send(pdfContent);
        } else {
            res.status(404).json({ erreur: 'Fichier non trouvé' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du fichier PDF' });
    }
};



export { getSubjects,recupererCheminFichier, getSubjectByIdHandler,getCoursesByLevelHandler,getCoursesBySubjectAndLevelHandler1, signUp, signIn };
