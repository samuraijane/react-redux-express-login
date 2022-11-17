import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import navs from '../configs/navs.json';
import { selectIsAuth } from '../features/authenticationSlice';

const Header = () => {
  const isLoggedIn = useSelector(selectIsAuth);
  const _navs = navs
    .filter(x => x.isPrivate === isLoggedIn || x.isPublic !== isLoggedIn)
    .map((nav, index) => <NavLink key={`${index}-${nav.href}`} to={nav.href}>{nav.text}</NavLink>);

  return (
    <header>
      <div className="y-wrap">
        <nav>{_navs}</nav>
      </div>
    </header>
  );
};

export default Header;