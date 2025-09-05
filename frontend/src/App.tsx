import Categories from "./pages/Categories.tsx";
import Expenses from "./pages/Expenses.tsx";
import AddExpenseForm from "./components/AddExpenseForm.tsx";

function App() {

  return (
      <div className="container mx-auto p-4">
          <Categories />
          <AddExpenseForm />
          <Expenses />
      </div>
  )
}

export default App
