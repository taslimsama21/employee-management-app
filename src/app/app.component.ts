import { TokenStorageService } from './services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Employee-Management-app';
  private roles: string[];
  isLoggedIn = false;
  showManagerBoard = false;

  email: string;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const manager = this.tokenStorageService.getManager();
      this.roles = manager.roles;

      this.showManagerBoard = this.roles.includes('ROLE_MANAGER');

      this.email = manager.email;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
