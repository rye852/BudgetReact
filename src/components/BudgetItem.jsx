import { Form, Link } from 'react-router-dom';
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from '../helpers';
import { BanknotesIcon, TrashIcon } from '@heroicons/react/24/outline';

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div
      style={{
        '--accent': color,
      }}
      className="budget budget-sp">
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
        <progress max={amount} value={spent}>
          {formatPercentage(spent / amount)}
        </progress>
        <div className="progress-text">
          <small>{formatCurrency(spent)}</small>
          <small>{formatCurrency(amount - spent)}</small>
        </div>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            action={`/budget/${id}/delete`}
            method="post"
            onSubmit={(e) => {
              if (
                !confirm(
                  'Are You Sure You Want To Permanently delete this Budget?'
                )
              )
                e.preventDefault();
            }}>
            <button name="id" value={id} className="btn" type="submit">
              <span>Delete Bydget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`budget/${id}`} className="btn ">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
