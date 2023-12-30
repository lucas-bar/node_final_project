import { Component } from '@angular/core';
import { SubjectService } from '../subject.service';
import {signIn} from "../../../../controllers/subjectsController";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent {
  subjects: any[] = [];
  selectedSubjectLevels: any[] = [];
  email: string = '';
  password: string = '';
  isConnected: boolean = false;



  constructor(private subjectService: SubjectService) {
    this.loadSubjects();
  }

  loadSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (data: any) => {
        this.subjects = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadLevels(subjectId: number) {
    this.subjectService.getLevelsForSubject(subjectId).subscribe(
      (data: any) => {
        this.selectedSubjectLevels = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  downloadPDF(subjectId: number, levelId: number): void {
    this.subjectService.getPdfLink(subjectId, levelId).subscribe(response => {
      const pdfLink = response[0].pdf_link;
      this.downloadFile(pdfLink);
    }, error => {
      console.error('Erreur lors du téléchargement du fichier :', error);
    });
  }

  downloadFile(url: string): void {
    if (this.isConnected) {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          const blobURL = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = blobURL;
          a.download = 'cours.pdf'; // Nom du fichier de téléchargement
          a.click();
        })
        .catch(error => {
          console.error('Erreur lors du téléchargement du fichier :', error);
        });
    } else {
      console.log('Vous devez être connecté pour télécharger.');
      // Vous pouvez rediriger l'utilisateur vers la page de connexion ici si nécessaire
    }
  }

  onSubmit(): void {
    this.subjectService.login(this.email, this.password).subscribe(
      (response) => {
        this.isConnected = true;
        // Gérer la réponse de connexion réussie ici
        console.log('Connecté avec succès!', response);
        // Redirection vers une autre page ou autres actions après connexion réussie
      },
      (error) => {
        // Gérer les erreurs de connexion ici
        console.error('Échec de connexion!', error);
      }
    );
  }




}
