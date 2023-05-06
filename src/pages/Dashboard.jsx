import { createBudget, createExpense, fatchData, removeItem } from '../Helpers';
import { Link, useLoaderData } from 'react-router-dom';
import Intro from '../components/Intro';
import { toast } from 'react-toastify';
import AddBufgetsForm from '../components/AddBufgetsForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

export const dashBoardLoader = async () => {
  const userName = fatchData('userName');
  const budgets = fatchData('budgets');
  const expenses = fatchData('expenses');
  return { userName, budgets, expenses };
};

export const dashBoardAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...value } = Object.fromEntries(data);
  const toastOptions = {
    autoClose: 2000,
  };

  if (_action === 'newUser') {
    try {
      localStorage.setItem('userName', JSON.stringify(value.userName));
      return toast.success(
        `Welcome, ${JSON.stringify(value.userName)}`,
        toastOptions
      );
    } catch (err) {
      console.log(err);
      throw new Error('there was a problem creating your username');
    }
    }

  if (_action === 'newBudget') {
    try {
      createBudget({ name: value.newBudget, amount: value.newBudgetAmount });
      return toast.success(`Budget created!`, toastOptions);
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

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


  throw Error('form Action is undefiend');
};

const Dashboard = () => {
  // const allmybudgets = JSON.parse(localStorage.getItem('budgets'));
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back,
            <span className="accent">{` ${userName}`}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBufgetsForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem budget={budget} key={budget.id} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expences</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 0 && (
                      <Link to="expenses" className="btn btn--dark">
                        view details
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the sucret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBufgetsForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
