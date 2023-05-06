import { formatCurrency, formatDate, getAllMatching } from '../helpers';
import { Link, useFetcher } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/solid';

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();
  const budget = getAllMatching({
    category: 'budgets',
    key: 'id',
    value: expense.budgetId,
  });
  console.log(budget)
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDate(expense.createdAt)}</td>
      {showBudget  && (
        <td>
          <Link
            className="btn"
            style={{ '--accent': budget.map((bud) => bud.color) }}
            to={`/budget/${budget[0].id}`}>
            {budget.map((bud) => bud.name)}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form action="/expenses" method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <button
            className="btn btn--warning"
            type="submit"
            name="expenseId"
            aria-label={`Delete ${expense.name} from ${budget.name}`}
            value={expense.id}>
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
