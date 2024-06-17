import { Component,Input, OnDestroy, OnInit } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/token.service';
import { RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent,FormsModule,CommonModule,RouterLink,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[AuthService,TokenService,]
})
export class HomeComponent implements OnInit,OnDestroy  {
 html = 'Hello world!';
  constructor(private authService:AuthService){}
  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  public isAuthenticated():boolean{
   return this.authService.isAuthenticated()
  }
}
