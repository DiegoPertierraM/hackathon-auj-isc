import { useEffect, useState } from 'react';
import { IoAddOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { InputSearch, Title } from '../../components';
import { getOpportunities } from '../../store/opportunities/opportunitiesSlice';
import { deleteOportunity, getAllOpportunities } from '../../store/opportunities/opportunitiesThunk';
import { AppDispatch } from '../../store/store';
import { Opportunities } from './opportunities-form/opportunitiesSchema';
import './opportunity.scss';

export const OpportunitiesPage = () => {
  const opportunities = useSelector(getOpportunities);
  const dispatch = useDispatch<AppDispatch>();
  const [serach, setSearch] = useState('');

  const onDelete = async (id: number) => {
    await dispatch(deleteOportunity(id));
  };
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const opportunitiesFiltered = searchOpportunities(opportunities, serach);

  useEffect(() => {
    dispatch(getAllOpportunities());
  }, [dispatch]);

  return (
    <section className="opportunities section">
      <Title title="Oportunidades" />

      <div className="opportunities__header">
        <InputSearch onSearch={onSearch} />

        <NavLink to={`/opportunities-from`} className="button">
          <IoAddOutline size={20} /> Añadir oportunidad
        </NavLink>
      </div>
      {!opportunitiesFiltered.length && <p>No hay oportunidades</p>}

      {!!opportunitiesFiltered.length && (
        <table className="table">
          <thead className="table__head">
            <tr>
              <th className="table__th">Nombre</th>
              <th>Titulo</th>
              <th>Description</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {opportunities.map(opportunity => (
              <tr key={opportunity.id} className="table__row">
                <td className="table__data--name">{opportunity.name}</td>
                <td className="table__data--name">{opportunity.title}</td>
                <td className="table__data--name">{opportunity.description}</td>

                <td className="table__data">{opportunity.status}</td>
                <td className="table__data table__data--actions">
                  <NavLink to={`/opportunities-from/${opportunity.id}`}>
                    <IoPencilOutline />
                  </NavLink>
                  <IoTrashBinOutline onClick={() => onDelete(opportunity.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

const searchOpportunities = (opportunities: Opportunities[], search: string) => {
  const serachLower = search.toLowerCase();

  return opportunities.filter(opportunity => opportunity.name.toLowerCase().includes(serachLower));
};
