import { NavLink } from 'react-router-dom';
import navs from '../configs/navs.json';

const Header = () => {

  const _navs = navs.map((nav, index) => {
    return <NavLink key={`${index}-${nav.href}`} to={nav.href}>{nav.text}</NavLink>
  });

  return (
    <header>
      <div className="y-wrap">
        <nav>{_navs}</nav>
      </div>
    </header>
  );
};

export default Header;