import { IoAddOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { InputSearch, Title } from '../../components';
import { getCollaborators } from '../../store/collaborators/collaboratorsSlice';
import './collaborator.scss';

export const CollaboratorsPage = () => {
  const collaborators = useSelector(getCollaborators);
  return (
    <section className="collaborators section">
      <Title title="Colaboradores" />

      <div className="collaborators__header">
        <InputSearch />

        <button className="button">
          <IoAddOutline size={20} /> Añadir colaborador
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
          {collaborators.map(collaborator => (
            <tr key={collaborator.id} className="table__row">
              <td className="table__data">{collaborator.name}</td>
              <td className="table__data">{collaborator.email}</td>
              <td className="table__data">{collaborator.phone}</td>
              <td className="table__data">{collaborator.company}</td>
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
