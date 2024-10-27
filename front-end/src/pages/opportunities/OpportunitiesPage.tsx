import { IoAddOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { InputSearch, Title } from '../../components';
import { getOpportunities } from '../../store/opportunities/opportunitiesSlice';
import './opportunity.scss';

export const OpportunitiesPage = () => {
  const opportunities = useSelector(getOpportunities);
  return (
    <section className="opportunities section">
      <Title title="Oportunidades" />

      <div className="opportunities__header">
        <InputSearch />

        <button className="button">
          <IoAddOutline size={20} /> Añadir oportunidad
        </button>
      </div>

      <table className="table">
        <thead className="table__head">
          <tr>
            <th className="table__th">Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Compañía</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map(opportunity => (
            <tr key={opportunity.id} className="table__row">
              <td className="table__data--name">{opportunity.name}</td>
              <td className="table__data">{opportunity.email}</td>
              <td className="table__data">{opportunity.phone}</td>
              <td className="table__data">{opportunity.status}</td>
              <td className="table__data">{opportunity.company}</td>
              <td className="table__data table__data--actions">
                <IoPencilOutline /> <IoTrashBinOutline />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
