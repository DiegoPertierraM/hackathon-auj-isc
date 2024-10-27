import { IoAddOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch, Title } from '../../components';
import { getError, getLoading, getParticipants } from '../../store/participants/participantsSlice';
import './participant.scss';
import { AppDispatch } from '../../store/store';
import { useEffect } from 'react';
import { fetchParticipants } from '../../store/participants/participantsThunk';

export const ParticipantsPage = () => {
  const participants = useSelector(getParticipants);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchParticipants());
  }, [dispatch]);

  if (loading === 'loading') return <p>Loading participants...</p>;
  if (error) return <p>Error: {error}</p>;

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
            <th>Nº entradas</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(participant => (
            <tr key={participant.id} className="table__row">
              <td className="table__data--name">{participant.name}</td>
              <td className="table__data">{participant.email}</td>
              <td className="table__data--tickets">{participant.ticket}</td>
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
