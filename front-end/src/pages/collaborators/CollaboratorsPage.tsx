import { IoAddOutline, IoCloseOutline, IoPencilOutline, IoSaveOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch, Title } from '../../components';
import { getCollaborators, getError, getLoading } from '../../store/collaborators/collaboratorsSlice';
import './collaborator.scss';
import { useEffect, useState } from 'react';
import { AppDispatch } from '../../store/store';
import {
  createCollaborator,
  deleteCollaborator,
  fetchCollaborators,
  updateCollaborator
} from '../../store/collaborators/collaboratorsThunk';

export const CollaboratorsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const collaborators = useSelector(getCollaborators);
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedCollaborator, setEditedCollaborator] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  useEffect(() => {
    dispatch(fetchCollaborators());
  }, [dispatch]);

  const handleCreate = () => {
    dispatch(
      createCollaborator({
        name: 'New Collaborator',
        email: 'new@example.com',
        phone: '123-456-7890',
        company: 'NewCo'
      })
    );
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
  };

  const handleDelete = (collaboratorId: number) => {
    dispatch(deleteCollaborator(collaboratorId));
  };

  if (loading === 'loading') return <p>Cargando colaboradores...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="collaborators section">
      <Title title="Colaboradores" />

      <div className="collaborators__header">
        <InputSearch />

        <button className="button" onClick={() => handleCreate()}>
          <IoAddOutline size={20} role="button" tabIndex={0} /> Añadir colaborador
        </button>
      </div>

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
          {collaborators!.map(collaborator => (
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
                  <input type="text" name="company" value={editedCollaborator.company} onChange={handleChange} />
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
                    <IoPencilOutline onClick={() => handleEditClick(collaborator)} role="button" tabIndex={0} />
                    <IoTrashBinOutline onClick={() => handleDelete(collaborator.id)} role="button" tabIndex={0} />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
