import { useLoaderData } from 'react-router-dom';
import { removeItem } from '../helpers';
import { toast } from 'react-toastify';
import Table from '../components/Table';
import { fatchData } from '../helpers';

export const expensesLoader = async () => {
  const expenses = fatchData('expenses').sort(
    (a, b) => b.createdAt - a.createdAt
  );
  return { expenses };
};

export const expensesAction = async ({ request }) => {
  const data = await request.formData();
  const { _action, ...value } = Object.fromEntries(data);
  const toastOptions = {
    autoClose: 2000,
  };
  if (_action === 'deleteExpense') {
    try {
      removeItem({ id: value.expenseId, key: 'expenses' });
      return toast.success('expense deleted!', toastOptions);
    } catch (err) {
      console.log(err);
      throw new Error('there was a probleme deletting Your expense.');
    }
  }
};

const ExpensesDetails = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses </h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            All Expenses <small>({expenses.length} total )</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expences to show</p>
      )}
    </div>
  );
};

export default ExpensesDetails;
