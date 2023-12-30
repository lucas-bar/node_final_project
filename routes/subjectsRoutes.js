"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subjectsController_1 = require("../controllers/subjectsController");
const subjectsRouter = express_1.default.Router();
subjectsRouter.get('/', subjectsController_1.getSubjects);
subjectsRouter.get('/:id', subjectsController_1.getSubjectByIdHandler);
subjectsRouter.get('/:id/levels/', subjectsController_1.getCoursesByLevelHandler);
subjectsRouter.get('/:id/levels/:levelId', subjectsController_1.getCoursesBySubjectAndLevelHandler1);
subjectsRouter.post('/signup', subjectsController_1.signUp);
subjectsRouter.post('/signin', subjectsController_1.signIn);
subjectsRouter.get('/:id/levels/:levelId/pdf', subjectsController_1.recupererCheminFichier); // Appel à la fonction du contrôleur
exports.default = subjectsRouter;
