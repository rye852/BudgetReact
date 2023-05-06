import logomark from '../assets/logomark.svg';
import { Form, NavLink, redirect } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/solid';

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="go-to Home">
        <img src={logomark} height={30} />
        <span>HomeBudget</span>
      </NavLink>
      {userName && (
        <Form
          action="/logout"
          method="post"
          onSubmit={(event) => {
            if (!confirm('Delete user and All data ?')) {
              event.preventDefault();
            }
          }}>
          <button className="btn btn--warning">
            Submit <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  );
};
export default Nav;
