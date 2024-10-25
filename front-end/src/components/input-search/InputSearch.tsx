import { IoSearchOutline } from 'react-icons/io5';
import './inputSearch.scss';

export const InputSearch = () => {
  return (
    <label className="search">
      <input className="search__input" type="search" />
      <IoSearchOutline className="search__icon" />
    </label>
  );
};
