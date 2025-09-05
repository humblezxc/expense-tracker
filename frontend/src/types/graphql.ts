export interface Category {
    id: string;
    name: string;
}

export interface Expense {
    id: string;
    title: string;
    amount: number;
    date: string;
    notes?: string;
    category: {
        id: string;
        name: string;
    };
}

export interface GetExpensesData {
    expenses: {
        items: Expense[];
        totalCount: number;
    };
}

export interface GetExpensesVars {
    skip: number;
    take: number;
    categoryId?: string | null;
}

export interface GetCategoriesData {
    categories: Category[];
}


export interface CreateExpenseData {
    createExpense: {
        id: string;
        title: string;
        amount: number;
        notes?: string | null;
        date: string;
        category: { id: string; name: string } | null;
    };
}

export interface CreateExpenseVars {
    title: string;
    amount: number;
    category: string;
    notes?: string | null;
}

export interface AnalyticsCategory {
    id: string;
    name: string;
}

export interface CategoryBreakdown {
    category?: AnalyticsCategory | null;
    total: number;
}

export interface ExpensesAnalytics {
    total: number;
    breakdown: CategoryBreakdown[];
}

export interface GetAnalyticsData {
    analytics: ExpensesAnalytics;
}
