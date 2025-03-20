import { PlusIcon, BanknotesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";


const ExpenseCom = () => {
  const [budget, setBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [budgetForm, setBudgetForm] = useState({
    amount: '',
    startDate: '',
    endDate: ''
  });
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    amount: '',
    date: '',
    category: ''
  });

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetProgress = budget ? (totalExpenses / budget.amount) * 100 : 0;

const cancelForm = () => {
  
  setIsAddingExpense(false);
  setExpenseForm({ description: '', amount: '', date: '', category: '' });
}

  const handleCreateBudget = (e) => {
    e.preventDefault();
    setBudget({
      amount: parseFloat(budgetForm.amount),
 
      
    });
    setIsAddingBudget(false);
  };
  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setExpenseForm({
      description: expense.description,
      amount: expense.amount.toString(),
      date: expense.date,
      category: ''
    });
    setIsAddingExpense(true);
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (editingExpense) {
      setExpenses(expenses.map(exp =>
        exp.id === editingExpense.id
          ? {
            ...exp,
            description: expenseForm.description,
            amount: parseFloat(expenseForm.amount),
            date: expenseForm.date,
          }
          : exp
      ));
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, {
        id: expenses.length + 1,
        description: expenseForm.description,
        amount: parseFloat(expenseForm.amount),
        date: expenseForm.date,
      }]);
    }
    setIsAddingExpense(false);
    setExpenseForm({ description: '', amount: '', date: '', category: '' });
  };

  if (!budget && !isAddingBudget) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-800/50 rounded-2xl p-8 text-center max-w-md mx-auto">
          <BanknotesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Budget Set</h3>
          <p className="text-gray-400 mb-6">Create a budget to start tracking project expenses</p>
          <button
            onClick={() => setIsAddingBudget(true)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-medium"
          >
            Create Budget
          </button>
        </div>
      </div>
    );
  }

  if (isAddingBudget) {
    return (
      <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700/50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Create Budget</h3>
              <p className="text-sm text-gray-400 mt-1">Set project budget details</p>
            </div>
            <button onClick={() => setIsAddingBudget(false)} className="p-2 hover:bg-gray-700/50 rounded-lg">
              <XMarkIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleCreateBudget}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Budget Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">Rs</span>
                  <input
                    type="number"
                    value={budgetForm.amount}
                    onChange={(e) => setBudgetForm({ ...budgetForm, amount: e.target.value })}
                    className="w-full pl-8 pr-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setIsAddingBudget(false) }}
                  
                  className="px-6 py-2.5 border border-gray-600 rounded-xl text-sm text-gray-300"
                > 
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-sm text-white font-medium"
                >
                  Create Budget
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }





  // ..................................................................................................

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">Expenses</h2>
          <p className="text-xs sm:text-sm text-gray-400">Track project expenses</p>
        </div>
        <button
          onClick={() => setIsAddingExpense(true)}
          className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500 text-white rounded-lg text-sm"
        >
          <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Add Expense</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Budget Overview */}
      <div className="bg-gray-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-white">Budget Overview</h3>
            <p className="text-xs sm:text-sm text-gray-400">Rs.{budget ? budget.amount.toLocaleString() : 0}</p>
          </div>
          <button
            onClick={() => setIsAddingBudget(true)}
            className="text-xs sm:text-sm text-gray-400 hover:text-white"
          >
            Edit Budget
          </button>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${budgetProgress > 90 ? 'bg-red-500' :
                  budgetProgress > 70 ? 'bg-yellow-500' :
                    'bg-green-500'
                }`}
              style={{ width: `${Math.min(budgetProgress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Rs.{totalExpenses.toLocaleString()} spent</span>
            <span>{budgetProgress.toFixed(1)}% of budget</span>
          </div>
        </div>
      </div>

      {/* Expenses List and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3 sm:p-4">
              <div>
                <h4 className="text-sm sm:text-base font-medium text-white">
                  {expense.description}
                </h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-base sm:text-lg font-medium text-white">
                    Rs.{expense.amount.toLocaleString()}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditExpense(expense)}
                    className="p-1.5 hover:bg-gray-600/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(expense.id)}
                    className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-gray-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4">
            Expense Summary
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Total Expenses</p>
              <p className="text-xl sm:text-2xl font-bold text-white">
                Rs.{totalExpenses.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Remaining Budget</p>
              <p className="text-xl sm:text-2xl font-bold text-white">
                Rs.{budget ? (budget.amount - totalExpenses).toLocaleString() : 0}
              </p>
            </div>
            <div className="pt-4 border-t border-gray-600">
              <p className="text-xs sm:text-sm text-gray-400 mb-2">Categories</p>
              {/* Add category breakdown here */}
            </div>
          </div>
        </div>
      </div>

      {isAddingExpense && ( 
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700/50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">Add Expmense</h3>
                <p className="text-sm text-gray-400 mt-1">Enter expense details</p>
              </div>
              <button onClick={() => {setIsAddingExpense(false) ;cancelForm()}} className="p-2 hover:bg-gray-700/50 rounded-lg">
                <XMarkIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <input
                    type="text"
                    value={expenseForm.description}
                    onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500">Rs.</span>
                    <input
                      type="number"
                      value={expenseForm.amount}
                      onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white"
                      required
                    />
                  </div>
                </div>
               
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date</label>
                  <input
                    type="date"
                    value={expenseForm.date || new Date().toISOString().split('T')[0]}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white"
                    required
                  />

                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setIsAddingExpense(false); cancelForm(); }}
                    className="px-6 py-2.5 border border-gray-600 rounded-xl text-sm text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-sm text-white font-medium"
                  >
                    Add Expense
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCom;