import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userrole } from 'src/app/EnumFolder/role';
import { users } from 'src/app/InterfaceFolder/userInterface';
import { UsersService } from 'src/app/ServiceFolder/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  regusers:users[]=[];

  roleOption = [
    {key:userrole.admin, label:'Admin'},
    {key:userrole.user, label:'User'},
  ];

  form = this.fb.group({ name: ['', Validators.required], 
    email: ['', [Validators.required, Validators.email]], 
    password: ['', Validators.required], 
    role:['', Validators.required]});
    error = '';
    
    constructor(private toastMes:ToastrService,
      private fb: FormBuilder, 
      private userService: UsersService, 
      private router: Router) 
    {}
    
    ngOnInit(): void {
      this.userService.list().subscribe((data: users[]) => {
        this.regusers = data;
      });
    }

    submit(){
      if(this.form.valid){
        const reguser:users = this.form.getRawValue() as users;
        if (this.regusers.find(u => u.email === reguser.email)){
          this.error ='Email exists';
        }else{
          this.userService.addUser(reguser).subscribe((user)=>{
          this.regusers.push(user);
          this.toastMes.success("Registerd successfully..");
          this.form.reset();
          this.router.navigate(['/auth/login'])
          }); 
        }
      }
      else{
        this.error = 'Missing fields'; 
      }
    }    
}
