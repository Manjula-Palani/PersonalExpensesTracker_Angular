export interface Transaction {
    id: string;
    userId: string;
    date: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    note?: string;
}