import { fatchData } from '../Helpers';
import { Outlet, useLoaderData } from 'react-router-dom';
import wave from '../assets/wave.svg';
import Nav from '../components/Nav';
export const mainLoader = async () => {
  const userName = fatchData('userName');
  return { userName };
};

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} />
    </div>
  );
};

export default Main;
