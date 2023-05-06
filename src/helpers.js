const generateRandomColor = () => {
  const existingBudgetLength = fatchData('budgets')?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local storage
export const fatchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// delete item
export const removeItem = ({ key /*budhets*/, id /*params */ }) => {
  console.log('*************************');

  if (id) {
    const dataFromLocalStorage = fatchData(key);
    return localStorage.setItem(
      key,
      JSON.stringify(
        dataFromLocalStorage.filter((singleData) => singleData.id !== id)
      )
    );
  }
  return localStorage.removeItem(key);
};

// Get ALl
export const getAllMatching = ({ category, key, value }) => {
  const data = fatchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// create budget
export const createBudget = ({ name, amount }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fatchData('budgets') ?? [];
  return localStorage.setItem(
    'budgets',
    JSON.stringify([...existingBudgets, newItem])
  );
};
// create  expense
export const createExpense = ({ name, amount, budgetId }) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId,
  };
  const existingExpenses = fatchData('expenses') ?? [];
  return localStorage.setItem(
    'expenses',
    JSON.stringify([...existingExpenses, newItem])
  );
};

// total spand
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fatchData('expenses') ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// formatting curency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
  });
};

//formating porcentage
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 0,
  });
};

// formating Time
export const formatDate = (amt) => {
  return new Date(amt).toLocaleDateString();
};
