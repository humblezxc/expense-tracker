import { useRef, useState } from "react";
import ExpensesTable from "../components/ExpensesTable";
import AddExpenseForm from "../components/AddExpenseForm";

export default function ExpensesPage() {
    const [page, setPage] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const TAKE = 10;

    const refetchRef = useRef<null | ((vars?: any) => Promise<any>)>(null);

    const setTableRefetch = (fn: (vars?: any) => Promise<any>) => {
        refetchRef.current = fn;
    };

    const handleCreated = async () => {
        setPage(0);
        if (refetchRef.current) {
            await refetchRef.current({ skip: 0, take: TAKE, categoryId: selectedCategory ?? null });
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                    <AddExpenseForm onCreated={handleCreated} />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <ExpensesTable
                        page={page}
                        setPage={setPage}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        take={TAKE}
                        setRefetch={setTableRefetch}
                    />
                </div>
            </div>
        </>
    );
}
