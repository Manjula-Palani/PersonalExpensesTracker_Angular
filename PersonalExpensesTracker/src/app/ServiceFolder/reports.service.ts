import { Injectable } from '@angular/core';
import { Transaction } from '../InterfaceFolder/transaction';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  groupMonthly(tx: Transaction[]) {
    const byMonth: Record<string, { income: number; expense: number; net:number }> = {};
    for (const t of tx) {
      const key = (t.date || '').slice(0,7); // YYYY-MM
      if (!byMonth[key]) byMonth[key] = { 
        income: 0, expense: 0, net: 0 
      };
      if (t.type === 'income') 
        byMonth[key].income += t.amount; 
      else
        byMonth[key].expense += t.amount;
      byMonth[key].net = byMonth[key].income - byMonth[key].expense;
    }
    const labels = Object.keys(byMonth).sort();
    return {
      labels,
      income: labels.map(m => byMonth[m].income),
      expense: labels.map(m => byMonth[m].expense),
      net: labels.map(m => byMonth[m].net)
    };
    }
}
