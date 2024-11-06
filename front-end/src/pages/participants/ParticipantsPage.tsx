import { useEffect, useState } from 'react';
import {
  IoAddOutline,
  IoCloseOutline,
  IoPencilOutline,
  IoSaveOutline,
  IoTrashBinOutline,
  IoArrowBackOutline,
  IoArrowForwardOutline
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch, Skleton, Title } from '../../components';
import { ParticipantsModal } from '../../components/specific-modals/participantsFormModal/ParticipantsModal';
import { Participant } from '../../interfaces/Participant.interface';
import { getError, getLoading, getParticipants } from '../../store/participants/participantsSlice';
import {
  deleteParticipant,
  fetchParticipants,
  updateParticipant
} from '../../store/participants/participantsThunk';
import { AppDispatch } from '../../store/store';
import './participant.scss';

export const ParticipantsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const participants = useSelector(getParticipants);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [participantToEdit, setParticipantToEdit] = useState<Participant | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredParticipants = searchParticipant(participants, searchTerm);

  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const paginatedParticipants = filteredParticipants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onDelete = async (id: number) => {
    await dispatch(deleteParticipant(id));
  };

  const handleEditClick = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setParticipantToEdit(prevState => {
      if (!prevState) return null;
      return { ...prevState, [name]: value };
    });
  };

  const handleSave = async () => {
    const participantId = participantToEdit!.id;
    let participant = participantToEdit;
    if (!participant) return;
    const editedTicket = Number(participant.ticket);
    participant = { ...participant, ticket: editedTicket };

    await dispatch(updateParticipant({ participantId, participant }));
    setParticipantToEdit(null);
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setIsEditing(!isEditing);
    setParticipantToEdit(null);
  };

  useEffect(() => {
    dispatch(fetchParticipants());
  }, [dispatch]);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="participants section">
      <Title title="Participantes" />

      {loading === 'loading' ? (
        <Skleton />
      ) : (
        <>
          <div className="participants__header">
            <InputSearch onSearch={onSearch} placeHolder="Buscar nombre..." />
            <button className="button" onClick={() => setIsModalOpen(!isModalOpen)}>
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
              {paginatedParticipants.map(participant => (
                <tr key={participant.id} className="table__row">
                  <td className="table__data--name">
                    {participantToEdit?.id === participant.id ? (
                      <input type="text" name="name" value={participantToEdit.name} onChange={handleEditClick} />
                    ) : (
                      participant.name
                    )}
                  </td>
                  <td className="table__data">
                    {participantToEdit?.id === participant.id ? (
                      <input type="text" name="email" value={participantToEdit.email} onChange={handleEditClick} />
                    ) : (
                      participant.email
                    )}
                  </td>
                  <td className="table__data--tickets">
                    {participantToEdit?.id === participant.id ? (
                      <input
                        type="number"
                        name="ticket"
                        value={participantToEdit.ticket}
                        onChange={handleEditClick}
                      />
                    ) : (
                      participant.ticket
                    )}
                  </td>
                  <td className="table__data table__data--actions">
                    {participantToEdit?.id === participant.id ? (
                      <>
                        <IoSaveOutline onClick={handleSave} role="button" tabIndex={0} />
                        <IoCloseOutline onClick={handleCancel} role="button" tabIndex={0} />
                      </>
                    ) : (
                      <>
                        <IoPencilOutline
                          onClick={() => {
                            setIsEditing(!isEditing);
                            setParticipantToEdit(participant);
                          }}
                        />
                        <IoTrashBinOutline onClick={() => onDelete(participant.id)} />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ParticipantsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(!isModalOpen)} />
          {!filteredParticipants.length && <span>No se encontraron resultados 😅</span>}

          <div className="pagination">
            <button className="pagination__arrow" onClick={handlePrevPage} disabled={currentPage === 1}>
              <IoArrowBackOutline size={24} />
            </button>

            <span>
              Página {currentPage} de {totalPages}
            </span>

            <button className="pagination__arrow" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <IoArrowForwardOutline size={24} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

const searchParticipant = (participants: Participant[], search: string) => {
  if (!search) return participants;
  const searchLower = search.toLowerCase();
  return participants.filter(participant => participant.name.toLowerCase().includes(searchLower));
};
