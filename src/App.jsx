import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard, { dashBoardAction, dashBoardLoader } from './pages/Dashboard';
import Main, { mainLoader } from './layouts/Main';
import Errore from './pages/Errore';
import { logoutAction } from './actions/logoutAction';
import ExpensesDetails, {
  expensesAction,
  expensesLoader,
} from './pages/ExpensesDetails';
import Errore404 from './pages/Errore404';
import BudgetPage, { budgetAction, budgetPageLoader } from './pages/BudgetPage';
import deleteBudget from './actions/deleteBudget';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      loader: mainLoader,
      children: [
        {
          index: true,
          element: <Dashboard />,
          action: dashBoardAction,
          loader: dashBoardLoader,
          errorElement: <Errore />,
        },
        {
          path: 'expenses',
          element: <ExpensesDetails />,
          loader: expensesLoader,
          action: expensesAction,
        },
        {
          path: 'budget/:id',
          element: <BudgetPage />,
          loader: budgetPageLoader,
          errorElement: <Errore />,
          action: budgetAction,
          children: [
            {
              path: 'delete',
              action: deleteBudget,
            },
          ],
        },
        {
          path: 'logout',
          action: logoutAction,
        },
        {
          path: '*',
          element: <Errore404 />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
