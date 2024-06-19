import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterLink,LoginComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers:[AuthService,TokenService,]
})
export class SidebarComponent {
  isOpen = false;
  constructor(private authService:AuthService){}
  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  public isAuthenticated():boolean{
    return this.authService.isAuthenticated()
   }
}
