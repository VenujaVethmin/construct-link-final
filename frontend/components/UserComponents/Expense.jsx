import { PlusIcon, BanknotesIcon, XMarkIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const ExpenseTracker = () => {
  const [budget, setBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [isAddingBudget, setIsAddingBudget] = useState(false);
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [categories, setCategories] = useState([
    "Food", "Transportation", "Housing", "Entertainment", "Utilities", "Other"
  ]);
  const [budgetForm, setBudgetForm] = useState({
    amount: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0]
  });
  const [expenseForm, setExpenseForm] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Other'
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedBudget = localStorage.getItem('budget');
    const savedExpenses = localStorage.getItem('expenses');
    
    if (savedBudget) setBudget(JSON.parse(savedBudget));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (budget) localStorage.setItem('budget', JSON.stringify(budget));
    if (expenses.length) localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [budget, expenses]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetProgress = budget ? (totalExpenses / budget.amount) * 100 : 0;

  // Group expenses by category for the summary chart
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category || 'Other';
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});

  const cancelForm = () => {
    setIsAddingExpense(false);
    setEditingExpense(null);
    setExpenseForm({
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Other'
    });
  };

  const handleCreateBudget = (e) => {
    e.preventDefault();
    setBudget({
      amount: parseFloat(budgetForm.amount),
      startDate: budgetForm.startDate,
      endDate: budgetForm.endDate
    });
    setIsAddingBudget(false);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setExpenseForm({
      description: expense.description,
      amount: expense.amount.toString(),
      date: expense.date,
      category: expense.category || 'Other'
    });
    setIsAddingExpense(true);
  };

  const handleDeleteExpense = (id) => {
    // Add confirmation dialog
    if (confirm("Are you sure you want to delete this expense?")) {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
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
            category: expenseForm.category
          }
          : exp
      ));
      setEditingExpense(null);
    } else {
      setExpenses([...expenses, {
        id: Date.now(), // Use timestamp for unique IDs
        description: expenseForm.description,
        amount: parseFloat(expenseForm.amount),
        date: expenseForm.date,
        category: expenseForm.category
      }]);
    }
    
    setIsAddingExpense(false);
    setExpenseForm({
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Other'
    });
  };

  // Format currency function
  const formatCurrency = (amount) => {
    return `Rs.${amount.toLocaleString('en-IN')}`;
  };

  // Get expense date in readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  // Calculate percentage of total for each category
  const getCategoryPercentage = (categoryAmount) => {
    return totalExpenses ? ((categoryAmount / totalExpenses) * 100).toFixed(1) : 0;
  };

  // Sort expenses by date (newest first)
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (!budget && !isAddingBudget) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-800/50 rounded-2xl p-8 text-center max-w-md mx-auto">
          <BanknotesIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Budget Set</h3>
          <p className="text-gray-400 mb-6">Create a budget to start tracking project expenses</p>
          <button
            onClick={() => setIsAddingBudget(true)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-colors"
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
        <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700/50 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white">
                {budget ? 'Update Budget' : 'Create Budget'}
              </h3>
              <p className="text-sm text-gray-400 mt-1">Set project budget details</p>
            </div>
            <button 
              onClick={() => setIsAddingBudget(false)} 
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
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
                    className="w-full pl-8 pr-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white focus:border-orange-500 focus:ring focus:ring-orange-500/20 transition-colors"
                    placeholder="Enter budget amount"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Start Date</label>
                <input
                  type="date"
                  value={budgetForm.startDate}
                  onChange={(e) => setBudgetForm({ ...budgetForm, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white focus:border-orange-500 focus:ring focus:ring-orange-500/20 transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">End Date</label>
                <input
                  type="date"
                  value={budgetForm.endDate}
                  onChange={(e) => setBudgetForm({ ...budgetForm, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white focus:border-orange-500 focus:ring focus:ring-orange-500/20 transition-colors"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddingBudget(false)}
                  className="px-6 py-2.5 border border-gray-600 rounded-xl text-sm text-gray-300 hover:bg-gray-700/30 transition-colors"
                > 
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-sm text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-colors"
                >
                  {budget ? 'Update Budget' : 'Create Budget'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white">Expense Tracker</h2>
          <p className="text-xs sm:text-sm text-gray-400">
            {budget && budget.startDate && budget.endDate ? (
              <>Budget period: {formatDate(budget.startDate)} - {formatDate(budget.endDate)}</>
            ) : (
              'Track project expenses'
            )}
          </p>
        </div>
        <button
          onClick={() => setIsAddingExpense(true)}
          className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm hover:from-orange-600 hover:to-orange-700 transition-colors"
        >
          <PlusIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Add Expense</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Budget Overview */}
      <div className="bg-gray-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg border border-gray-700/50">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base sm:text-lg font-medium text-white">Budget Overview</h3>
            <p className="text-xs sm:text-sm text-gray-400">{formatCurrency(budget ? budget.amount : 0)}</p>
          </div>
          <button
            onClick={() => setIsAddingBudget(true)}
            className="text-xs sm:text-sm text-gray-400 hover:text-white px-3 py-1 rounded-md hover:bg-gray-700/50 transition-colors"
          >
            Edit Budget
          </button>
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                budgetProgress > 90 ? 'bg-red-500' :
                budgetProgress > 70 ? 'bg-yellow-500' :
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(budgetProgress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatCurrency(totalExpenses)} spent</span>
            <span>
              {budgetProgress > 100 ? (
                <span className="text-red-400">Over budget by {formatCurrency(totalExpenses - budget.amount)}</span>
              ) : (
                <>{budgetProgress.toFixed(1)}% of budget</>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Expenses List and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-3 sm:space-y-4">
          {/* Expenses Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-medium text-white">Expenses</h3>
            {sortedExpenses.length > 0 && (
              <div className="text-sm text-gray-400">
                {sortedExpenses.length} {sortedExpenses.length === 1 ? 'transaction' : 'transactions'}
              </div>
            )}
          </div>
          
          {/* Expenses List */}
          {sortedExpenses.length === 0 ? (
            <div className="bg-gray-700/30 rounded-lg p-6 text-center">
              <p className="text-gray-400">No expenses yet. Add your first expense to start tracking.</p>
            </div>
          ) : (
            sortedExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3 sm:p-4 hover:bg-gray-700/50 transition-colors border border-gray-700/50">
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-white">
                    {expense.description}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {expense.category || 'Uncategorized'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-base sm:text-lg font-medium text-white">
                      {formatCurrency(expense.amount)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {formatDate(expense.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditExpense(expense)}
                      className="p-1.5 hover:bg-gray-600/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                      aria-label="Edit expense"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete expense"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Card */}
        <div className="bg-gray-700/30 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-700/50">
          <h3 className="text-base sm:text-lg font-medium text-white mb-3 sm:mb-4 flex items-center gap-2">
            <ChartBarIcon className="h-5 w-5 text-gray-400" />
            Expense Summary
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Total Expenses</p>
              <p className="text-xl sm:text-2xl font-bold text-white">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-400">Remaining Budget</p>
              <p className={`text-xl sm:text-2xl font-bold ${(budget && budget.amount - totalExpenses < 0) ? 'text-red-400' : 'text-white'}`}>
                {formatCurrency(budget ? (budget.amount - totalExpenses) : 0)}
              </p>
            </div>
            
            {/* Category breakdown */}
            <div className="pt-4 border-t border-gray-600">
              <p className="text-xs sm:text-sm text-gray-400 mb-2">Categories</p>
              {Object.keys(expensesByCategory).length === 0 ? (
                <p className="text-sm text-gray-500">No categories yet</p>
              ) : (
                <div className="space-y-2">
                  {Object.entries(expensesByCategory)
                    .sort(([, a], [, b]) => b - a)
                    .map(([category, amount]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          <span className="text-sm text-gray-300">{category}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-white">{formatCurrency(amount)}</p>
                          <p className="text-xs text-gray-400">{getCategoryPercentage(amount)}%</p>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Expense Modal */}
      {isAddingExpense && ( 
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700/50 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {editingExpense ? 'Edit Expense' : 'Add Expense'}
                </h3>
                <p className="text-sm text-gray-400 mt-1">Enter expense details</p>
              </div>
              <button 
                onClick={() => {setIsAddingExpense(false); cancelForm();}} 
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
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
                    className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white focus:border-orange-500 focus:ring focus:ring-orange-500/20 transition-colors"
                    placeholder="What was this expense for?"
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
                      className="w-full pl-8 pr-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white focus:border-orange-500 focus:ring focus:ring-orange-500/20 transition-colors"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>
               
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Category</label>
                  <select
                    value={expenseForm.category}
                    onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white focus:border-orange-500 focus:ring focus:ring-orange-500/20 transition-colors"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Date</label>
                  <input
                    type="date"
                    value={expenseForm.date}
                    onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-700/30 border border-gray-600 rounded-xl text-white focus:border-orange-500 focus:ring focus:ring-orange-500/20 transition-colors"
                    required
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => { setIsAddingExpense(false); cancelForm(); }}
                    className="px-6 py-2.5 border border-gray-600 rounded-xl text-sm text-gray-300 hover:bg-gray-700/30 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-sm text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-colors"
                  >
                    {editingExpense ? 'Update Expense' : 'Add Expense'}
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

export default ExpenseTracker;