import { useState } from "react";
import type { Category, Expense } from "../types/graphql.ts";
import { GET_CATEGORIES } from "../queries/categories.ts";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_EXPENSES, UPDATE_EXPENSE } from "../queries/expenses.ts";
import Button from "./Button.tsx";

interface IEditExpenseForm {
    expense: Expense;
    onClose: () => void;
    refetchTable: (vars?: any) => Promise<any>;
    take?: number;
}

export default function EditExpenseForm({expense, onClose, refetchTable, take = 10}: IEditExpenseForm) {
    const { data: catData } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);
    const [updateExpense, { loading }] = useMutation(UPDATE_EXPENSE, {
        refetchQueries: [{ query: GET_EXPENSES, variables: { skip: 0, take, categoryId: null } }],
        awaitRefetchQueries: true,
    });

    const [form, setForm] = useState({
        title: expense.title,
        amount: String(expense.amount),
        category: expense.category?.id ?? "",
        notes: expense.notes ?? "",
    });

    const handleSave = async () => {
        try {
            await updateExpense({
                variables: {
                    data: {
                        id: expense.id,
                        title: form.title,
                        amount: parseFloat(form.amount),
                        category: form.category,
                        notes: form.notes || null,
                    },
                },
            });

            if (refetchTable) await refetchTable();
            onClose();
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    return (
        <div className="space-y-3">
            <input className="border p-2 rounded w-full" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input className="border p-2 rounded w-full" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
            <select className="border p-2 rounded w-full" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="">Select category</option>
                {catData?.categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
            <textarea className="border p-2 rounded w-full" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSave} disabled={loading} className="disabled:opacity-60">
                    Save
                </Button>
            </div>
        </div>
    );
}
