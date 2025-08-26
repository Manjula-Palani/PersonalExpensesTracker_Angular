import { Component } from '@angular/core';
import { AuthService } from './ServiceFolder/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PersonalExpensesTracker';
  constructor(public auth: AuthService, private router: Router){}
  logout(){ this.auth.logout(); this.router.navigate(['/auth/login']); }
}
