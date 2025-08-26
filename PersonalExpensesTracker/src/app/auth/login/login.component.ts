import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userrole } from 'src/app/EnumFolder/role';
import { users } from 'src/app/InterfaceFolder/userInterface';
import { AuthService } from 'src/app/ServiceFolder/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  err="";
  userlist:users[]=[];
  error = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });
  constructor(
    private toast:ToastrService,
    private auth: AuthService,
    private router: Router
  ){}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value as any;
    this.auth.login(email, password).subscribe(user => {
      if(!user){ 
        this.err = 'Invalid credentials'; 
        return; 
      }
      this.toast.success('Login Successfully..');
      if(user.role === userrole.admin){
        this.router.navigate(['/dashboard/admin']);
      }
      else{
        this.router.navigate(['/dashboard']);
      }
    });
  }
}