import { IoAddOutline, IoPencilOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { InputSearch, Title } from '../../components';
import { getTasks } from '../../store/tasks/tasksSlice';
import './tasks.scss';

export const TasksPage = () => {
  const tasks = useSelector(getTasks);
  return (
    <section className="tasks section">
      <Title title="Oportunidades" />

      <div className="tasks__header">
        <InputSearch />

        <button className="button">
          <IoAddOutline size={20} /> Añadir tarea
        </button>
      </div>

      <table className="table">
        <thead className="table__head">
          <tr>
            <th className="table__th">Nombre</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th className="table__th">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="table__row">
              <td className="table__data">{task.name}</td>
              <td className="table__data">{task.format}</td>
              <td className="table__data">{task.date}</td>
              <td className="table__data--desc">{task.description}</td>
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
