import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import ExpensesPage from "./pages/Expenses";
import AnalyticsPage from "./pages/Analytics";

function App() {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white dark:from-bg-dark dark:to-bg-dark text-bg-dark dark:text-white">
            <div className="container mx-auto px-4 py-8">
                <Header />
                <main className="flex flex-col gap-10">
                    <Routes>
                        <Route path="/" element={<Navigate to="/expenses" replace />} />
                        <Route path="/expenses" element={<ExpensesPage />} />
                        <Route path="/analytics" element={<AnalyticsPage />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default App;
