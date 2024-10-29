import { IoSearchOutline } from 'react-icons/io5';
import './inputSearch.scss';
type Pops = {
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputSearch = ({ onSearch }: Pops) => {
  return (
    <label className="search">
      <input className="search__input" type="search" onChange={onSearch} />
      <IoSearchOutline className="search__icon" />
    </label>
  );
};
