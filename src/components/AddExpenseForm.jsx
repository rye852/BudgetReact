import { useState, useEffect } from 'react';
import { useRef } from 'react';
import { useFetcher, Form } from 'react-router-dom';
import {PlusCircleIcon} from '@heroicons/react/24/solid'

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const formRef = useRef();
  const inputRef = useRef();
  const [title, setTitle] = useState(
    budgets && budgets[0].name
  );

  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      inputRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add new <span className="accent">{title} </span>
        Expense
      </h2>
      <fetcher.Form  method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g, coffee"
              ref={inputRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step={0.1}
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g, 1.20$"
              required
            />
          </div>
        </div>
        <div hidden={budgets.length < 2} className="grid-xs">
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => {
                return (
                  <option
                    onClick={() => setTitle(budget.name)}
                    key={budget.id}
                    value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input type="hidden" name="budgets" value={JSON.stringify(budgets)} />
        <input type="hidden" name="_action" value="createExpense" />
        <button disabled={isSubmitting} type="submit" className="btn btn--dark">
          {isSubmitting ? (
            <span>is submitting ...</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20}/>
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
