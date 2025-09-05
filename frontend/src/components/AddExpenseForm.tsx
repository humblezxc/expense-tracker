import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_EXPENSE } from "../queries/expenses";
import { GET_EXPENSES } from "../queries/expenses";
import { GET_CATEGORIES } from "../queries/categories";
import type {Category} from "../../types/graphql.ts";

interface GetCategoriesData {
    categories: Category[];
}

export default function AddExpenseForm() {
    const { data: catData } = useQuery<GetCategoriesData>(GET_CATEGORIES);
    const [createExpense, { loading }] = useMutation(CREATE_EXPENSE, {
        refetchQueries: [
            { query: GET_EXPENSES, variables: { skip: 0, take: 10 } },
        ],
        awaitRefetchQueries: true,
    });

    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        notes: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createExpense({
            variables: {
                title: form.title,
                amount: parseFloat(form.amount),
                category: form.category,
                notes: form.notes || undefined,
            },
        });
        setForm({ title: "", amount: "", category: "", notes: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 border rounded-lg bg-white shadow">
            <h2 className="text-lg font-semibold">Add Expense</h2>

            <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 rounded w-full"
                required
            />

            <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="border p-2 rounded w-full"
                required
            />

            <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="border p-2 rounded w-full"
                required
            >
                <option value="">Select category</option>
                {catData?.categories.map((category: { id: string; name: string }) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="border p-2 rounded w-full"
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Adding..." : "Add Expense"}
            </button>
        </form>
    );
}
