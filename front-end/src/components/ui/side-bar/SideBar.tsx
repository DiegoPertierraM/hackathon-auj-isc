import { IoCreateOutline, IoNavigateOutline, IoPeopleOutline, IoPersonOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { Aside } from '../../../interfaces/Aside.interface';
import { ImpactLogo } from '../impact-logo/ImpactLogo';
import './sidebar.scss';

const aside: Aside[] = [
  {
    title: 'Colaboradores',
    path: '/',
    icon: <IoPeopleOutline size={25} />
  },
  {
    title: 'Participantes',
    path: '/participants',
    icon: <IoPersonOutline size={25} />
  },
  {
    title: 'Oportunidades',
    path: '/opportunities',
    icon: <IoNavigateOutline size={25} />
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: <IoCreateOutline size={25} />
  }
];

export const SideBar = () => {
  return (
    <aside className="aside">
      <ImpactLogo />
      <nav className="aside__nav">
        <ul className="aside__links">
          {aside.map(item => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) => `aside__link ${isActive && 'aside__link--active'}`}
                to={item.path}
              >
                {item.icon} {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
