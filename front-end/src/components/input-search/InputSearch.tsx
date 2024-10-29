import { IoSearchOutline } from 'react-icons/io5';
import './inputSearch.scss';
type Pops = {
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
};

export const InputSearch = ({ placeHolder, onSearch }: Pops) => {
  return (
    <label className="search">
      <input className="search__input" type="search" onChange={onSearch} placeholder={placeHolder} />
      <IoSearchOutline className="search__icon" />
    </label>
  );
};
