import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/InterfaceFolder/userInterface';
import { UsersService } from 'src/app/ServiceFolder/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  users: users[] = [];
  constructor(private usersSvc: UsersService){}

  ngOnInit(){ 
    this.usersSvc.listUsersOnly().subscribe(u => this.users = u); 
  }
}
