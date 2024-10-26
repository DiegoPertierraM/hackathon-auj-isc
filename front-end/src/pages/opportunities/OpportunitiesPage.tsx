import { IoAddOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';
import { InputSearch, Title } from '../../components';
/* import { opportunities, opportunities } from "../../data/opportunities"; */
import { useSelector } from 'react-redux';
/* import { getOpportunities} from '../../store/opportunities/opportunitiesSlice'; */
import './paticipant.scss';

export const OpportunitiesPage = () => {
  const opportunities = useSelector(/* opportunity */);
  return (
    <section className="opportunities section">
      <Title title="Oportunidad" />

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
            <th>Nº entradas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map(opportunity => (
            <tr key={opportunity.id} className="table__row">
              <td className="table__data">{opportunity.name}</td>
              <td className="table__data">{opportunity.email}</td>
              <td className="table__data">{opportunity.phone}</td>
              <td className="table__data">{opportunity.tikets}</td>
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
