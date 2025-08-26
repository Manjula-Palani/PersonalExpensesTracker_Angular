import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/InterfaceFolder/transaction';
import { AuthService } from 'src/app/ServiceFolder/auth.service';
import { TransactionsService } from 'src/app/ServiceFolder/transactions.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
  list: Transaction[] = [];
  userId?: string;

  constructor(private txSvc: TransactionsService, private auth: AuthService){}
  ngOnInit(){
    this.userId = this.auth.currentUser()!.id;
    this.refresh();
  }

  refresh(){ 
    if(this.userId) 
      this.txSvc.listByUser(this.userId).subscribe(r => this.list = r);
  }

  remove(id: string){ 
    this.txSvc.remove(id).subscribe(() => this.refresh()); 
  }
}
