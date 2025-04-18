import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-hover-nav',
  templateUrl: './hover-nav.component.html',
  styleUrls: ['./hover-nav.component.css']
})
export class HoverNavComponent {
  isOpen = false;
  isLoggedIn = false;

  constructor(private router: Router) {
    this.checkLoginStatus();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isOpen = false;
        this.checkLoginStatus();
      }
    });
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    alert('User logged out');
    this.router.navigate(['/auth/admin/login']);
  }
}
