import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fatchData, getAllMatching, removeItem } from '../Helpers';

const deleteBudget = async ({ params }) => {
  try {
    console.log(params.id);
    removeItem({ key: 'budgets', id: params.id });

    const associatedExpenses = getAllMatching({
      category: 'expenses',
      key: 'budgetId',
      value: params.id,
    });

    associatedExpenses.forEach((expense) =>
      removeItem({ key: 'expenses', id: expense.id })
    );

    toast.success('Budget deleted successfully!', { autoClose: 2000 });
  } catch (err) {
    console.log(err);
    throw new Error('there was A probleme Deleting Your Budget');
  }

  return redirect('/');
};

export default deleteBudget;
