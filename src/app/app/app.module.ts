import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importez FormsModule depuis @angular/forms

import { AppComponent } from '../app.component';
import { SubjectListComponent } from '../subject-list/subject-list.component';

const routes = [
  { path: 'subjects', component: SubjectListComponent }
  // ... d'autres routes si nécessaire
];

@NgModule({
  declarations: [
    AppComponent,
    SubjectListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule // Ajoutez FormsModule ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
