import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartData, ChartType } from 'chart.js';
import { Transaction } from 'src/app/InterfaceFolder/transaction';
import { users } from 'src/app/InterfaceFolder/userInterface';
import { ReportsService } from 'src/app/ServiceFolder/reports.service';
import { TransactionsService } from 'src/app/ServiceFolder/transactions.service';
import { UsersService } from 'src/app/ServiceFolder/users.service';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
  user?: users;
  tx: Transaction[] = [];
  labels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
      labels: [],
      datasets: []
  }; 
  constructor(
    private route: ActivatedRoute,
    private usersSvc: UsersService,
    private txSvc: TransactionsService,
    private reports: ReportsService
  ){}

  ngOnInit(){
    console.log("user-detail");
    const id = this.route.snapshot.paramMap.get('id')!;
    this.usersSvc.get(id).subscribe(u => this.user = u);
    this.txSvc.listByUser(id).subscribe(list => {
    this.tx = list;
    const m = this.reports.groupMonthly(list);
    this.labels = m.labels;
    this.barChartData = {
      labels: m.labels,
      datasets: [
        { data: m.income, label: 'Income' },
        { data: m.expense, label: 'Expense' },
        { data: m.net, label: 'Net' }
      ]};
    });
  }  
}
