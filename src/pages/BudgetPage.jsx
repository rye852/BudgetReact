import { useLoaderData } from 'react-router-dom';
import { createExpense, getAllMatching } from '../Helpers';
import BudgetItem from '../components/BudgetItem';
import AddExpenseForm from '../components/AddExpenseForm';
import Table from '../components/Table';
import { toast } from 'react-toastify';

export const budgetPageLoader = async ({ params }) => {
  const budget = await getAllMatching({
    category: 'budgets',
    key: 'id',
    value: params.id,
  })[0];
  const expenses = await getAllMatching({
    category: 'expenses',
    key: 'budgetId',
    value: params.id,
  });
  return { budget, expenses };
};

export const budgetAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...value } = Object.fromEntries(data);
  const toastOptions = {
    autoClose: 2000,
  };

  if (_action === 'createExpense') {
    try {
      createExpense({
        name: value.newExpense,
        amount: value.newExpenseAmount,
        budgetId: value.newExpenseBudget,
      });
      return toast.success(
        `Expense ${value.newExpense} added to ${
          JSON.parse(value.budgets).find(
            (budget) => budget.id === value.newExpenseBudget
          ).name
        } `,
        toastOptions
      );
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
};

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  if (!budget) {
    throw new Error("The budget you're trying to find doesn't exist");
  }
  return (
    <div
      className="grid-lg"
      style={{
        '--accent': budget.color,
      }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem showDelete={true} budget={budget} />
        <AddExpenseForm budgets={[budget]} />
        {expenses && expenses.length > 0 && (
          <div className="grid-md">
            <h2>
              <span className="accent">{budget.name}</span> Expenses
            </h2>
            <Table expenses={expenses} showBudget={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetPage;
