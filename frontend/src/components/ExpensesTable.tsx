import EditExpenseForm from "./EditExpenseForm";
import Modal from "./Modal";
import Button from "./Button";
import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_EXPENSES, REMOVE_EXPENSE } from "../queries/expenses";
import { GET_CATEGORIES } from "../queries/categories";
import type { GetExpensesData, GetExpensesVars, Expense, GetCategoriesData } from "../types/graphql";

interface IExpensesTable {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    selectedCategory: string | undefined;
    setSelectedCategory: Dispatch<SetStateAction<string | undefined>>;
    take?: number;
    setRefetch?: (fn: (vars?: any) => Promise<any>) => void;
}

const TAKE_DEFAULT = 10;

export default function ExpensesTable({page, setPage, selectedCategory, setSelectedCategory, take = TAKE_DEFAULT, setRefetch,}: IExpensesTable) {
    const [editing, setEditing] = useState<Expense | null>(null);

    const { data, loading, error, refetch } = useQuery<GetExpensesData, GetExpensesVars>(GET_EXPENSES, {
        variables: { skip: page * take, take, categoryId: selectedCategory ?? null },
        fetchPolicy: "cache-and-network",
    });

    useEffect(() => {
        if (setRefetch && refetch) {
            setRefetch(refetch);
        }
    }, [refetch]);

    const { data: catData } = useQuery<GetCategoriesData>(GET_CATEGORIES);

    const [removeExpense] = useMutation(REMOVE_EXPENSE);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this expense?")) return;
        try {
            await removeExpense({ variables: { id } });
            await refetch({ skip: page * take, take, categoryId: selectedCategory ?? null });
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    if (loading && !data) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const items = data?.expenses?.items ?? [];
    const totalCount = data?.expenses?.totalCount ?? 0;
    const totalPages = Math.max(1, Math.ceil(totalCount / take));

    return (
        <>
            <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Expenses</h2>
                    <div className="flex gap-2 items-center">
                        <select
                            className="w-full rounded-lg shadow-sm border border-gray-300 dark:border-grey bg-white/90 dark:bg-grey-light px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            value={selectedCategory ?? ""}
                            onChange={async (e) => {
                                const v = e.target.value || undefined;
                                setSelectedCategory(v);
                                setPage(0);
                                // refetch first page with new filter
                                await refetch({ skip: 0, take: take, categoryId: v ?? null });
                            }}
                        >
                            <option value="" className="dark:bg-black">
                                All categories
                            </option>
                            {catData?.categories?.map((category) => (
                                <option key={category.id} value={category.id} className="dark:bg-black">
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-grey-light shadow-sm">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-50 dark:bg-grey-light">
                        <tr className="text-left">
                            <th className="p-3">Title</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Notes</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((exp) => (
                            <tr key={exp.id} className="border-t border-gray-100 dark:border-gray-800">
                                <td className="p-3 font-medium">{exp.title}</td>
                                <td className="p-3">${exp.amount}</td>
                                <td className="p-3">{exp.category?.name ?? exp.category?.id ?? "—"}</td>
                                <td className="p-3">{exp?.notes ?? "—"}</td>
                                <td className="p-3 whitespace-nowrap">{new Date(exp.date).toLocaleDateString()}</td>
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        <Button variant="outline" onClick={() => setEditing(exp)}>
                                            Edit
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(exp.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {items.length === 0 && (
                            <tr>
                                <td colSpan={10} className="p-6 text-center">
                                    No items to show.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <Button
                        variant="outline"
                        disabled={page === 0}
                        onClick={async () => {
                            const next = Math.max(0, page - 1);
                            setPage(next);
                            await refetch({ skip: next * take, take: take, categoryId: selectedCategory ?? null });
                        }}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Prev
                    </Button>
                    <span>
                        Page {page + 1} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        disabled={page + 1 >= totalPages}
                        onClick={async () => {
                            const next = Math.min(totalPages - 1, page + 1);
                            setPage(next);
                            await refetch({ skip: next * take, take: take, categoryId: selectedCategory ?? null });
                        }}
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        Next
                    </Button>
                </div>

                <Modal open={!!editing} onClose={() => setEditing(null)} title="Edit Expense">
                    {editing && (
                        <EditExpenseForm
                            expense={editing}
                            onClose={() => setEditing(null)}
                            refetchTable={() => refetch({ skip: page * take, take, categoryId: selectedCategory ?? null })}
                            take={take}
                        />
                    )}
                </Modal>
            </div>
        </>
    );
}