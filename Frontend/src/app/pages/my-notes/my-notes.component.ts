import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { INote } from '../../models/user.models';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-notes',
  standalone: true,
  imports: [CommonModule,TruncatePipe,RouterLink],
  templateUrl: './my-notes.component.html',
  styleUrl: './my-notes.component.css',
   providers:[UserService]
})
export class MyNotesComponent implements OnInit {
   userNotes:INote[]=[]
    constructor(private userService:UserService){}
    ngOnInit(): void {
      this.loadnotes()
    }
    loadnotes(){
      this.userService.getNotes().subscribe({
       next:(res)=>{
       if(res.success){
       this.userNotes=res.data
      console.log(this.userNotes)
        }
      },
      error:(error)=>{
      console.log(error)
      }
    })
    }
}
