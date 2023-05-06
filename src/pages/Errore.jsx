import { useRouteError, Link, useNavigate } from 'react-router-dom';
import { HomeIcon, ArrowUturnLeftIcon } from '@heroicons/react/24/solid';

const Errore = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  console.log(error);
  return (
    <div className="error">
      <h1>Uh oh ! we've got a problem.</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Go Back</span>
        </button>
        <Link className="btn btn--dark" to="/">
          <HomeIcon width={20} />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
};

export default Errore;
