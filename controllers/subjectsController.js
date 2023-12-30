"use strict";
// subjectsController.ts
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
exports.signIn = exports.signUp = exports.getCoursesBySubjectAndLevelHandler1 = exports.getCoursesByLevelHandler = exports.getSubjectByIdHandler = exports.recupererCheminFichier = exports.getSubjects = void 0;
const queries_1 = require("../data/queries");
const getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subjects = yield (0, queries_1.getAllSubjects)();
        res.json(subjects);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des matières' });
    }
});
exports.getSubjects = getSubjects;
const getSubjectByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const subject = yield (0, queries_1.getSubjectById)(parseInt(id, 10)); // Récupère une matière par son ID depuis la base de données
        if (subject) {
            res.json(subject);
        }
        else {
            res.status(404).json({ message: 'Matière non trouvée' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de la matière par ID' });
    }
});
exports.getSubjectByIdHandler = getSubjectByIdHandler;
const getCoursesByLevelHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, levelId } = req.params; // Récupération des paramètres d'URL
    try {
        const courses = yield (0, queries_1.getCoursesBySubjectAndLevel)(parseInt(id, 10), parseInt(levelId, 10)); // Appel de la fonction pour récupérer les cours
        res.json(courses);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des cours par niveau' });
    }
});
exports.getCoursesByLevelHandler = getCoursesByLevelHandler;
const getCoursesBySubjectAndLevelHandler1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, levelId } = req.params; // Récupération des paramètres d'URL
    try {
        const courses = yield (0, queries_1.getCoursesBySubjectAndLevel1)(parseInt(id, 10), parseInt(levelId, 10));
        res.json(courses);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des cours pour le sujet et le niveau spécifiés' });
    }
});
exports.getCoursesBySubjectAndLevelHandler1 = getCoursesBySubjectAndLevelHandler1;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        const existingUser = yield (0, queries_1.getUserByEmail)(email);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }
        yield (0, queries_1.createUser)(username, email, password);
        return res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de l\'inscription.' });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Récupérer l'utilisateur à partir de l'email
        const user = yield (0, queries_1.getUserByEmail)(email);
        if (user.rows.length === 0) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }
        // Comparer le mot de passe fourni avec celui stocké dans la base de données
        const storedPassword = user.rows[0].password; // À adapter selon ta structure de données
        if (password !== storedPassword) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
        }
        // Authentification réussie
        res.status(200).json({ message: 'Connexion réussie.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
});
exports.signIn = signIn;
const recupererCheminFichier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pdfContent = yield (0, queries_1.getCheminFichier)(parseInt(id, 10));
        if (pdfContent) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="nom_du_fichier.pdf"`);
            res.send(pdfContent);
        }
        else {
            res.status(404).json({ erreur: 'Fichier non trouvé' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du fichier PDF' });
    }
});
exports.recupererCheminFichier = recupererCheminFichier;
