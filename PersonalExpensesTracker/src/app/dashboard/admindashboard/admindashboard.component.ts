import { Component } from '@angular/core';
import { users } from 'src/app/InterfaceFolder/userInterface';
import { UsersService } from 'src/app/ServiceFolder/users.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  users: users[] = [];
  loading = true;

  constructor(private usersSvc: UsersService){}
  
  ngOnInit(){ 
    this.usersSvc.list().subscribe(u => { 
      this.users = u;
      this.loading = false; 
    }); 
  }
}
