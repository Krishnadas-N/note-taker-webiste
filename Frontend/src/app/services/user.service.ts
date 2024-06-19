import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/responseHandler';
import { Observable } from 'rxjs';
import { EditorForm } from '../models/form.models';
import { INote } from '../models/user.models';

@Injectable()
export class UserService {
 private apiUrl = `${environment.backendUrl}/user`
  constructor(private http: HttpClient) { }
    saveNotes(notes:EditorForm):Observable<ApiResponse<void>>{
      console.log("save notes",notes)
      return this.http.post<ApiResponse<void>>(`${this.apiUrl}/add-notes`,notes)
    }

  getNotes():Observable<ApiResponse<INote[]>>{
    return this.http.get<ApiResponse<INote[]>>(`${this.apiUrl}/get-notes`)
  }

  getANote(noteId:string):Observable<ApiResponse<INote>>{
    return this.http.get<ApiResponse<INote>>(`${this.apiUrl}/get-note/${noteId}`)
  }

  deleteNote(noteId:string):Observable<ApiResponse<void>>{
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/delete-note/${noteId}`)
  }

}
