import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/ServiceFolder/auth.service';
import { TransactionsService } from 'src/app/ServiceFolder/transactions.service';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {
  id?: string;
  form = this.fb.group({
    date: ['', Validators.required],
    type: ['expense', Validators.required],
    category: ['', Validators.required],
    note: [''],
    amount: [0, [Validators.required, Validators.min(0.01)]]
  });

  constructor(private fb: FormBuilder,
     private route: ActivatedRoute, 
     private  router: Router, 
     private txSvc: TransactionsService,
     private auth: AuthService){}

  ngOnInit(){
    const param = this.route.snapshot.paramMap.get('id');
    if(param){
      this.id = param!;
      this.txSvc.get(this.id).subscribe(t => this.form.patchValue(t));
    }
  }

  submit(){
    if(this.form.invalid) return;
    const userId = this.auth.currentUser()!.id;
    const payload = { ...this.form.value, userId } as any;
    if(this.id){
      this.txSvc.update(this.id, payload).subscribe(() =>
      this.router.navigate(['/transactions']));
    } else {
      this.txSvc.create(payload).subscribe(() => this.router.navigate(['/transactions']));
    }
  }
}
