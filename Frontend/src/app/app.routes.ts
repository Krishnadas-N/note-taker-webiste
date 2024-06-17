import { Routes } from '@angular/router';





export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    children:[
      {
        path:'',
        loadComponent:() => import('./pages/editor/editor.component').then(m => m.EditorComponent),
      },{
        path:'my-notes',
        loadComponent:() => import('./pages/my-notes/my-notes.component').then(m => m.MyNotesComponent),
      }
    ]
  }
];
