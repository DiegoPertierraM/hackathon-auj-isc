import { IoAddOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { InputSearch, Title } from '../../components';
import { getParticipants } from '../../store/participants/participantsSlice';
import './participant.scss';

export const ParticipantsPage = () => {
  const participants = useSelector(getParticipants);
  return (
    <section className="participants section">
      <Title title="Participantes" />

      <div className="participants__header">
        <InputSearch />

        <button className="button">
          <IoAddOutline size={20} /> Añadir participante
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
          {participants.map(participant => (
            <tr key={participant.id} className="table__row">
              <td className="table__data">{participant.name}</td>
              <td className="table__data">{participant.email}</td>
              <td className="table__data">{participant.phone}</td>
              <td className="table__data">{participant.tikets}</td>
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
