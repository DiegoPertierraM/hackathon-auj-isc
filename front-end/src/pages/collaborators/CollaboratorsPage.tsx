import { useEffect, useState } from 'react';
import { IoAddOutline, IoCloseOutline, IoPencilOutline, IoSaveOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch, Skleton, Title } from '../../components';
import { CollaboratorFormModal } from '../../components/specific-modals/CollaboratorFormModal/CollaboratorFormModal';
import { Collaborator, CollaboratorFormData } from '../../interfaces/Collaborator.interface';
import { getCollaborators, getError, getLoading } from '../../store/collaborators/collaboratorsSlice';
import {
  createCollaborator,
  deleteCollaborator,
  fetchCollaborators,
  updateCollaborator
} from '../../store/collaborators/collaboratorsThunk';
import { AppDispatch } from '../../store/store';
import './collaborator.scss';

export const CollaboratorsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const collaborators = useSelector(getCollaborators);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);
  const [searchTerm, setSearchTerm] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedCollaborator, setEditedCollaborator] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCollaborators = searchCollaborators(collaborators, searchTerm);

  useEffect(() => {
    dispatch(fetchCollaborators());
  }, [dispatch]);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCollaborator = (collaboratorData: CollaboratorFormData) => {
    dispatch(createCollaborator(collaboratorData));
  };

  const handleEditClick = (collaborator: (typeof collaborators)[0]) => {
    setEditingId(collaborator.id);
    setEditedCollaborator({ ...collaborator });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCollaborator(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (editingId) {
      dispatch(updateCollaborator({ ...editedCollaborator, id: editingId }));
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedCollaborator({ name: '', email: '', phone: '', company: '' });
  };

  const handleDelete = (collaboratorId: number) => {
    dispatch(deleteCollaborator(collaboratorId));
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="collaborators section">
      <Title title="Colaboradores" />

      {loading === 'loading' ? (
        <Skleton />
      ) : (
        <>
          <div className="collaborators__header">
            <InputSearch onSearch={onSearch} placeHolder="Buscar nombre..." />

            <button className="button" onClick={() => setIsModalOpen(true)}>
              <IoAddOutline size={20} role="button" tabIndex={0} /> Añadir colaborador
            </button>
          </div>

          <CollaboratorFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddCollaborator={handleAddCollaborator}
          />
          <table className="table">
            <thead className="table__head">
              <tr>
                <th className="table__th">Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Compañía</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredCollaborators.map(collaborator => (
                <tr key={collaborator.id} className="table__row">
                  <td className="table__data--name">
                    {editingId === collaborator.id ? (
                      <input type="text" name="name" value={editedCollaborator.name} onChange={handleChange} />
                    ) : (
                      collaborator.name
                    )}
                  </td>
                  <td className="table__data">
                    {editingId === collaborator.id ? (
                      <input type="email" name="email" value={editedCollaborator.email} onChange={handleChange} />
                    ) : (
                      collaborator.email
                    )}
                  </td>
                  <td className="table__data">
                    {editingId === collaborator.id ? (
                      <input type="text" name="phone" value={editedCollaborator.phone} onChange={handleChange} />
                    ) : (
                      collaborator.phone
                    )}
                  </td>
                  <td className="table__data">
                    {editingId === collaborator.id ? (
                      <input
                        type="text"
                        name="company"
                        value={editedCollaborator.company}
                        onChange={handleChange}
                      />
                    ) : (
                      collaborator.company
                    )}
                  </td>
                  <td className="table__data table__data--actions">
                    {editingId === collaborator.id ? (
                      <>
                        <IoSaveOutline onClick={handleSave} role="button" tabIndex={0} />
                        <IoCloseOutline onClick={handleCancel} role="button" tabIndex={0} />
                      </>
                    ) : (
                      <>
                        <IoPencilOutline
                          onClick={() => handleEditClick(collaborator)}
                          role="button"
                          tabIndex={0}
                        />
                        <IoTrashBinOutline
                          onClick={() => handleDelete(collaborator.id)}
                          role="button"
                          tabIndex={0}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filteredCollaborators.length && <span>No se encontraron resultados 😅</span>}
        </>
      )}
    </section>
  );
};

const searchCollaborators = (collaborators: Collaborator[], search: string) => {
  if (!search) return collaborators;

  const searchLower = search.toLowerCase();

  const filteredCollaborators = collaborators.filter(collaborator =>
    collaborator.name.toLocaleLowerCase().includes(searchLower)
  );
  return filteredCollaborators;
};
