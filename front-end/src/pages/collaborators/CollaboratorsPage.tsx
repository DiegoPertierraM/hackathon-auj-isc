import { IoAddOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch, Title } from '../../components';
import { getCollaborators, getError, getLoading } from '../../store/collaborators/collaboratorsSlice';
import './collaborator.scss';
import { useEffect } from 'react';
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

  const handleUpdate = (collaboratorId: number) => {
    const updatedCollaborator = {
      id: collaboratorId,
      name: 'Updated Name',
      email: 'updated@example.com',
      phone: '987-654-3210',
      company: 'UpdatedCo'
    };
    dispatch(updateCollaborator(updatedCollaborator));
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
              <td className="table__data--name">{collaborator.name}</td>
              <td className="table__data">{collaborator.email}</td>
              <td className="table__data">{collaborator.phone}</td>
              <td className="table__data">{collaborator.company}</td>
              <td className="table__data table__data--actions">
                <IoPencilOutline onClick={() => handleUpdate(collaborator.id)} role="button" tabIndex={0} />{' '}
                <IoTrashBinOutline onClick={() => handleDelete(collaborator.id)} role="button" tabIndex={0} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
