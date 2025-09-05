import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { CREATE_EXPENSE } from "../queries/expenses";
import { GET_CATEGORIES } from "../queries/categories";
import type {Category, CreateExpenseData, CreateExpenseVars} from "../types/graphql.ts";
import TextInput from "./Input.tsx";
import TextArea from "./TextArea.tsx";
import Button from "./Button.tsx";

export default function AddExpenseForm({ onCreated }: { onCreated?: () => Promise<void> | void }) {
    const { data: catData } = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

    const [createExpense, { loading }] = useMutation<CreateExpenseData, CreateExpenseVars>(CREATE_EXPENSE);

    const [form, setForm] = useState({
        title: "",
        amount: "",
        category: "",
        notes: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createExpense({
                variables: {
                    title: form.title,
                    amount: parseFloat(form.amount),
                    category: form.category,
                    notes: form.notes || null,
                },
            });

            setForm({ title: "", amount: "", category: "", notes: "" });

            if (onCreated) await onCreated();
        } catch (err) {
            console.error("Create expense failed", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl pt-2 font-semibold min-h-[42px]">Add Expense</h2>
            <TextInput
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border p-2 rounded w-full"
                required
            />
            <TextInput
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
                className="w-full rounded-lg shadow-sm border border-gray-300 dark:border-grey bg-white/90 dark:bg-grey-light px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
            >
                <option value="" className="dark:bg-black">Select category</option>
                {catData?.categories.map((category: { id: string; name: string }) => (
                    <option key={category.id} value={category.id} className="dark:bg-black">
                        {category.name}
                    </option>
                ))}
            </select>
            <TextArea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="border p-2 rounded w-full"
            />
            <Button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Adding..." : "Add Expense"}
            </Button>
        </form>
    );
}
