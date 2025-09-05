import Header from "./components/Header.tsx";
import ExpensesPage from "./pages/Expenses.tsx";

function App() {

  return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-white dark:from-bg-dark dark:to-bg-dark text-bg-dark dark:text-white">
          <div className="container mx-auto px-4 py-8">
              <Header />
              <main className="flex flex-col gap-10">
                  <ExpensesPage />
              </main>
          </div>
      </div>
  )
}

export default App
