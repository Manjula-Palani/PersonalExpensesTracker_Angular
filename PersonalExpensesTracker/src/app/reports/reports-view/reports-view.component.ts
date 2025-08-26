import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { AuthService } from 'src/app/ServiceFolder/auth.service';
import { ReportsService } from 'src/app/ServiceFolder/reports.service';
import { TransactionsService } from 'src/app/ServiceFolder/transactions.service';

@Component({
  selector: 'app-reports-view',
  templateUrl: './reports-view.component.html',
  styleUrls: ['./reports-view.component.css']
})
export class ReportsViewComponent implements OnInit {
  labels: string[] = [];
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  }; 
  
  constructor(private auth: AuthService, 
    private txSvc: TransactionsService,
    private reports: ReportsService){}
  
  ngOnInit(){
    const id = this.auth.currentUser()!.id;
    console.dir("report id"+id)
    this.txSvc.listByUser(id).subscribe(list => {
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
