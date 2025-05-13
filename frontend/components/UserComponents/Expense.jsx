import { useState, useEffect } from "react";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
  ChartBarIcon,
  BanknotesIcon,
  CalendarIcon,
  XMarkIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/lib/axiosInstance";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { toast } from "sonner";


const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const ExpenseTracker = () => {
  const params = useParams();
  const { data, error, isLoading, mutate } = useSWR(
    `/user/expenses/${params.id}`,
    fetcher
  );

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
 if (editingExpense) {
   console.log(editingExpense.id);
 }
  const [activeTab, setActiveTab] = useState("current"); // 'current' or 'history'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [budgetForm, setBudgetForm] = useState({
    amount: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
      .toISOString()
      .split("T")[0],
  });

  const [expenseForm, setExpenseForm] = useState({
    description: "",
    amount: "",
    category: "Other",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    "Materials",
    "Labor",
    "Equipment",
    "Transportation",
    "Permits",
    "Consultants",
    "Other",
  ];

  // Set initial form values when data is loaded
  useEffect(() => {
    if (data && data.budget) {
      setBudgetForm({
        amount: data.budget.toString(),
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
          .toISOString()
          .split("T")[0],
      });
    }
  }, [data]);

  const totalExpenses =
    data?.expenses?.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    ) || 0;

  const remainingBudget = data?.budget ? data.budget - totalExpenses : 0;
  const budgetProgress = data?.budget ? (totalExpenses / data.budget) * 100 : 0;

  // Organize expenses by category for summary chart
  const expensesByCategory =
    data?.expenses?.reduce((acc, expense) => {
      const category = expense.category || "Other";
      acc[category] = (acc[category] || 0) + parseFloat(expense.amount);
      return acc;
    }, {}) || {};

  const sortedExpenses = data?.expenses
    ? [...data.expenses].sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  const handleAddBudget = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
   const res = await axiosInstance.put(`/user/updateBudget/${params.id}`, {
        budget: budgetForm.amount,
      });
     if(res.status === 200){
      await mutate(); // Refresh data
      setIsBudgetModalOpen(false);
      toast.success("Budget updated successfully");
     }
    
    } catch (error) {
      console.error("Error updating budget:", error);
      toast.error("Failed to update budget");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingExpense) {
      const res =   await axiosInstance.put(`/user/updateExpense/${params.id}`, {
          eid: editingExpense.id,
          description: expenseForm.description,
          amount: parseFloat(expenseForm.amount),
          category: expenseForm.category,
        });

        if(res.status === 200){
        toast.success("Expense updated successfully");}
      } else {
       const res =  await axiosInstance.post(`/user/addExpense/${params.id}`, {
          description: expenseForm.description,
          amount: parseFloat(expenseForm.amount),
          category: expenseForm.category,
        
        });

        if(res.status === 200){
        toast.success("Expense added successfully");
        }
      }

      await mutate(); // Refresh data
      setIsExpenseModalOpen(false);
      setEditingExpense(null);
      resetExpenseForm();
    } catch (error) {
      console.error("Error with expense:", error);
      toast.error(
        editingExpense ? "Failed to update expense" : "Failed to add expense"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      try {
       const res = await axiosInstance.delete(
          `/user/deleteExpense`,
          {
            data: { eid: id }
          });

          if(res.status === 200){
            await mutate(); // Refresh data
            toast.success("Expense deleted successfully");
          }
       
      } catch (error) {
        console.error("Error deleting expense:", error);
        toast.error("Failed to delete expense");
      }
    }
  };

  const resetExpenseForm = () => {
    setExpenseForm({
      description: "",
      amount: "",
      category: "Other",
     
    });
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "Rs. 0";
    return `Rs. ${parseFloat(amount).toLocaleString("en-IN")}`;
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  // Get category percentage of total
  const getCategoryPercentage = (categoryAmount) => {
    return totalExpenses
      ? ((categoryAmount / totalExpenses) * 100).toFixed(1)
      : 0;
  };

  if ((!data?.budget && !isBudgetModalOpen) || isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 text-center max-w-md mx-auto border border-gray-700/50 shadow-xl">
          <BanknotesIcon className="h-16 w-16 text-orange-500/70 mx-auto mb-6" />
          <h3 className="text-2xl font-semibold text-white mb-2">
            {isLoading ? "Loading..." : "No Budget Set"}
          </h3>
          <p className="text-gray-400 mb-8">
            {isLoading
              ? "Fetching your budget information"
              : "Create a budget to start tracking project expenses"}
          </p>
          {!isLoading && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsBudgetModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl 
                       text-white font-medium shadow-lg shadow-orange-500/20 
                       hover:shadow-orange-500/40 transition-all duration-200"
            >
              Create Budget
            </motion.button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Expense Tracker</h2>
          <p className="text-sm text-gray-400">Track project expenses</p>
        </div>

        {data?.budget && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsExpenseModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 
                     text-white rounded-lg shadow-lg shadow-orange-500/20 
                     hover:shadow-orange-500/40 transition-all duration-200"
          >
            
            Add Expense
          </motion.button>
        )}
      </div>

      {/* Budget Overview */}
      {data?.budget && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700/50">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="text-lg font-medium text-white">
                Budget Overview
              </h3>
              <p className="text-sm text-gray-400">
                Total Budget: {formatCurrency(data.budget)}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBudgetModalOpen(true)}
              className="text-sm text-orange-500 hover:text-orange-400 flex items-center gap-1 px-2 py-1"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Update Budget
            </motion.button>
          </div>
          <div className="space-y-2">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  budgetProgress > 90
                    ? "bg-red-500"
                    : budgetProgress > 70
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${Math.min(budgetProgress, 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>{formatCurrency(totalExpenses)} spent</span>
              <span
                className={
                  remainingBudget < 0
                    ? "text-red-400"
                    : remainingBudget < data.budget * 0.2
                    ? "text-yellow-500"
                    : "text-green-500"
                }
              >
                {remainingBudget < 0
                  ? `Overbudget by ${formatCurrency(Math.abs(remainingBudget))}`
                  : `${formatCurrency(remainingBudget)} remaining`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      {data?.budget && (
        <div className="border-b border-gray-700">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("current")}
              className={`py-2 px-1 border-b-2 font-medium text-sm 
                       ${
                         activeTab === "current"
                           ? "border-orange-500 text-orange-500"
                           : "border-transparent text-gray-400 hover:text-gray-300"
                       }`}
            >
              Current Expenses
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-2 px-1 border-b-2 font-medium text-sm 
                       ${
                         activeTab === "history"
                           ? "border-orange-500 text-orange-500"
                           : "border-transparent text-gray-400 hover:text-gray-300"
                       }`}
            >
              Expense History
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area - Expenses and Analytics */}
      {data?.budget && activeTab === "current" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Expenses List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">Expenses</h3>
              {data?.expenses?.length > 0 && (
                <div className="text-sm text-gray-400">
                  {data.expenses.length}{" "}
                  {data.expenses.length === 1 ? "transaction" : "transactions"}
                </div>
              )}
            </div>

            {!data?.expenses || data.expenses.length === 0 ? (
              <div className="bg-gray-800/30 rounded-lg p-6 text-center border border-gray-700/50">
                <p className="text-gray-400">
                  No expenses yet. Add your first expense to start tracking.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.expenses.map((expense) => (
                  <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 
                           border border-gray-700/50 hover:bg-gray-800/50 transition-colors"
                  >
                    <div>
                      <h4 className="text-white font-medium">
                        {expense.description}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">
                          {expense.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(expense.date)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-medium text-white">
                        {formatCurrency(expense.amount)}
                      </p>
                      <div className="flex items-center gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setEditingExpense(expense);
                            setExpenseForm({
                              description: expense.description,
                              amount: expense.amount.toString(),
                              category: expense.category,
                              date: new Date(expense.date)
                                .toISOString()
                                .split("T")[0],
                            });
                            setIsExpenseModalOpen(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-orange-500 rounded-full 
                                 hover:bg-gray-700/50 transition-colors"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteExpense(expense.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-full 
                                 hover:bg-gray-700/50 transition-colors"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Summary Card */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 h-fit">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5 text-orange-500" />
              Expense Summary
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Total Expenses</p>
                <p className="text-2xl font-bold text-white">
                  {formatCurrency(totalExpenses)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Remaining Budget</p>
                <p
                  className={`text-2xl font-bold ${
                    remainingBudget < 0 ? "text-red-400" : "text-white"
                  }`}
                >
                  {formatCurrency(remainingBudget)}
                </p>
              </div>

              {/* Category breakdown */}
              <div className="pt-4 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-3">
                  Expenses by Category
                </p>

                {Object.keys(expensesByCategory).length === 0 ? (
                  <p className="text-sm text-gray-500">No categories yet</p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(expensesByCategory)
                      .sort(([, a], [, b]) => b - a)
                      .map(([category, amount], index) => (
                        <div key={category}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  index === 0
                                    ? "bg-orange-500"
                                    : index === 1
                                    ? "bg-orange-400"
                                    : index === 2
                                    ? "bg-orange-300"
                                    : "bg-orange-200"
                                }`}
                              ></div>
                              <span className="text-sm text-gray-300">
                                {category}
                              </span>
                            </div>
                            <span className="text-sm text-gray-400">
                              {getCategoryPercentage(amount)}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                index === 0
                                  ? "bg-orange-500"
                                  : index === 1
                                  ? "bg-orange-400"
                                  : index === 2
                                  ? "bg-orange-300"
                                  : "bg-orange-200"
                              }`}
                              style={{
                                width: `${getCategoryPercentage(amount)}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expense History Tab */}
      {data?.budget && activeTab === "history" && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-orange-500" />
            Expense History
          </h3>

          {!data?.expenses || data.expenses.length === 0 ? (
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg p-6 text-center border border-gray-700/50">
              <p className="text-gray-400">
                No expense history to display yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700 bg-gray-800/20">
                  {sortedExpenses.map((expense) => (
                    <tr
                      key={expense.id}
                      className="hover:bg-gray-800/40 transition-colors"
                    >
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(expense.date)}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {expense.description}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-orange-500/20 text-orange-400">
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-white">
                        {formatCurrency(expense.amount)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingExpense(expense);
                              setExpenseForm({
                                description: expense.description,
                                amount: expense.amount.toString(),
                                category: expense.category,
                                date: new Date(expense.date)
                                  .toISOString()
                                  .split("T")[0],
                              });
                              setIsExpenseModalOpen(true);
                            }}
                            className="text-orange-500 hover:text-orange-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Budget Modal */}
      <AnimatePresence>
        {isBudgetModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 
                       shadow-2xl shadow-black/30 w-full max-w-md mx-auto my-auto relative overflow-hidden"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {data?.budget ? "Update Budget" : "Create Budget"}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Set your project budget details
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setIsBudgetModalOpen(false)}
                    className="p-1.5 bg-gray-700/70 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  </motion.button>
                </div>

                <form onSubmit={handleAddBudget} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">
                      Budget Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">
                        Rs. {""}
                      </span>
                      <input
                        type="number"
                        value={budgetForm.amount}
                        onChange={(e) =>
                          setBudgetForm({
                            ...budgetForm,
                            amount: e.target.value,
                          })
                        }
                        className="w-full pl-8 pr-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white
                                 placeholder-gray-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                        placeholder="Enter amount"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setIsBudgetModalOpen(false)}
                      className="px-4 py-2.5 bg-gray-700/70 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium
                             shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200 flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && (
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                      {data?.budget ? "Update Budget" : "Create Budget"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expense Modal */}
      <AnimatePresence>
        {isExpenseModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 
                       shadow-2xl shadow-black/30 w-full max-w-md mx-auto my-auto relative overflow-hidden"
              style={{ maxHeight: "90vh", overflowY: "auto" }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {editingExpense ? "Edit Expense" : "Add Expense"}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {editingExpense
                        ? "Update expense details"
                        : "Enter expense details"}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      setIsExpenseModalOpen(false);
                      setEditingExpense(null);
                    }}
                    className="p-1.5 bg-gray-700/70 rounded-full hover:bg-gray-700 transition-colors"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
                  </motion.button>
                </div>

                <form onSubmit={handleAddExpense} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">
                      Description
                    </label>
                    <input
                      type="text"
                      value={expenseForm.description}
                      onChange={(e) =>
                        setExpenseForm({
                          ...expenseForm,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white
                               placeholder-gray-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                      placeholder="What was this expense for?"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-gray-500">
                        Rs.
                      </span>
                      <input
                        type="number"
                        value={expenseForm.amount}
                        onChange={(e) =>
                          setExpenseForm({
                            ...expenseForm,
                            amount: e.target.value,
                          })
                        }
                        className="w-full pl-8 pr-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white
                                 placeholder-gray-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 font-medium">
                      Category
                    </label>
                    <select
                      value={expenseForm.category}
                      onChange={(e) =>
                        setExpenseForm({
                          ...expenseForm,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white
                               focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-colors"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        setIsExpenseModalOpen(false);
                        setEditingExpense(null);
                      }}
                      className="px-4 py-2.5 bg-gray-700/70 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white font-medium
                             shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-200 flex items-center"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && (
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      )}
                      {editingExpense ? "Update Expense" : "Add Expense"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseTracker;
