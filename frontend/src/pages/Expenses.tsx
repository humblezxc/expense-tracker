import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import type {GetExpensesData, GetExpensesVars} from "../../types/graphql.ts";
import {GET_EXPENSES} from "../queries/expenses.ts";

export default function Expenses() {
    const [page, setPage] = useState(0);
    const take = 5;

    const { data, loading, error } = useQuery<GetExpensesData, GetExpensesVars>(
        GET_EXPENSES,
        {
            variables: { skip: page * take, take },
            fetchPolicy: "cache-and-network",
        }
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const totalCount = data?.expenses.totalCount ?? 0;
    const totalPages = Math.ceil(totalCount / take);

    return (
       <>
           <h2 className="text-xl font-bold mb-2">Expenses</h2>
           <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-grey-light">
               <table className="min-w-full text-sm">
                   <thead className="bg-gray-50 dark:bg-grey-light">
                   <tr className="text-left">
                       <th className="p-3">Title</th>
                       <th className="p-3">Amount</th>
                       <th className="p-3">Category</th>
                       <th className="p-3">Date</th>
                   </tr>
                   </thead>
                   <tbody>
                   {data?.expenses.items.map((exp) => (
                       <tr key={exp.id} className="border-t border-gray-100 dark:border-gray-800">
                           <td className="p-3">{exp.title}</td>
                           <td className="p-3 ">${exp.amount}</td>
                           <td className="p-3">{exp.category.name}</td>
                           <td className="p-3">{new Date(exp.date).toLocaleDateString()}</td>
                       </tr>
                   ))}
                   {data?.expenses.items.length === 0 && (
                       <tr>
                           <td colSpan={10} className="p-6 text-center">No items to show.</td>
                       </tr>
                   )}
                   </tbody>
               </table>
           </div>
           <div className="flex items-center justify-between mt-4">
               <button
                   disabled={page === 0}
                   onClick={() => setPage((p) => p - 1)}
                   className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
               >
                   Prev
               </button>
               <span>
                    Page {page + 1} of {totalPages}
               </span>
               <button
                   disabled={page + 1 >= totalPages}
                   onClick={() => setPage((p) => p + 1)}
                   className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
               >
                   Next
               </button>
           </div>
       </>
);
}