import { Form, useFetcher } from 'react-router-dom';
import { CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { useRef } from 'react';
import { useEffect } from 'react';
const AddBufgetsForm = () => {
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      newBudgetRef.current.focus();
    }
  }, [isSubmitting]);

  const formRef = useRef();
  const newBudgetRef = useRef();
  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form ref={formRef} method="post" className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            ref={newBudgetRef}
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount"> Amount</label>
          <input
            type="number"
            step={0.1}
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., 300$"
            required
            inputMode="decimal"
          />
          <input type="hidden" name="_action" value="newBudget" />
        </div>
        <button disabled={isSubmitting} type="submit" className="btn btn--dark">
          {isSubmitting ? (
            <span>is submitting ...</span>
          ) : (
            <>
              <span>submit</span> <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBufgetsForm;
