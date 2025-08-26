import { Component } from '@angular/core';
import { Transaction } from 'src/app/InterfaceFolder/transaction';
import { AuthService } from 'src/app/ServiceFolder/auth.service';
import { TransactionsService } from 'src/app/ServiceFolder/transactions.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent {
  user = this.auth.currentUser(); 
  userId?: string;
  list: Transaction[] = [];
  totalIncome = 0;
  totalExpense = 0;
  balance = 0;
  constructor(private auth: AuthService, private txSvc:TransactionsService){}

  ngOnInit(){
    this.userId = this.user!.id;
    this.refresh();
  }

  refresh(){ 
    if(this.userId) 
      this.txSvc.listByUser(this.userId).subscribe(r => {this.list = r;
        this.totalIncome = r.filter((r:any)=>r.type==='income').reduce((s:any,a:any)=>s+a.amount,0);
        this.totalExpense = r.filter((r:any)=>r.type==='expense').reduce((s:any,a:any)=>s+a.amount, 0);
        this.balance = this.totalIncome - this.totalExpense;
    });      
  }
}
