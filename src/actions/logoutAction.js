import { redirect, useActionData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeItem } from '../Helpers';

export const logoutAction = async () => {
  removeItem({ key: 'userName' });
  removeItem({ key: 'budgets' });
  removeItem({ key: 'expenses' });
  toast.warning('deleted acounte', {
    autoClose: 2000,
  });
  return redirect('/');
};
