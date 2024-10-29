import { IoAddOutline, IoCloseOutline, IoPencilOutline, IoSaveOutline, IoTrashBinOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { InputSearch, Title } from '../../components';
import { getError, getLoading, getTasks } from '../../store/tasks/tasksSlice';
import './tasks.scss';
import { AppDispatch } from '../../store/store';
import { useEffect, useState } from 'react';
import { createTask, deleteTask, fetchTasks, updateTask } from '../../store/tasks/tasksThunk';
import { TaskFormData } from '../../interfaces/Task.interface';
import { TaskFormModal } from '../../components/specific-modals/TaskFormModal/taskFormModal';

export const TasksPage = () => {
  const tasks = useSelector(getTasks);
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState({
    title: '',
    taskDate: '',
    notification: '',
    expirationDate: '',
    description: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (taskData: TaskFormData) => {
    dispatch(createTask(taskData));
  };

  const handleEditClick = (task: (typeof tasks)[0]) => {
    setEditingId(task.id);
    setEditedTask({ ...task });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (editingId) {
      dispatch(updateTask({ ...(editedTask as TaskFormData), id: editingId }));
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedTask({ title: '', taskDate: '', notification: '', expirationDate: '', description: '' });
  };

  const handleDelete = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  const formatDateToSpanish = (isoDateString: string) => {
    const date = new Date(isoDateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  if (loading === 'loading') return <p className="data-loading">Cargando tareas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="tasks section">
      <Title title="Tareas" />

      <div className="tasks__header">
        <InputSearch />

        <button className="button" onClick={() => setIsModalOpen(true)}>
          <IoAddOutline size={20} role="button" tabIndex={0} /> Añadir tarea
        </button>
      </div>

      <TaskFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddTask={handleAddTask} />

      <table className="table">
        <thead className="table__head">
          <tr>
            <th className="table__th">Título</th>
            <th>Fecha</th>
            <th>Notificación</th>
            <th>Fecha de expiración</th>
            <th className="table__th">Descripción</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} className="table__row">
              <td className="table__data--name">
                {editingId === task.id ? (
                  <input type="text" name="title" value={editedTask.title} onChange={handleChange} />
                ) : (
                  task.title
                )}
              </td>
              <td className="table__data">
                {editingId === task.id ? (
                  <input type="date" name="taskDate" value={editedTask.taskDate} onChange={handleChange} />
                ) : (
                  formatDateToSpanish(task.taskDate)
                )}
              </td>
              <td className="table__data">
                {editingId === task.id ? (
                  <input type="date" name="notification" value={editedTask.notification} onChange={handleChange} />
                ) : (
                  formatDateToSpanish(task.notification)
                )}
              </td>
              <td className="table__data">
                {editingId === task.id ? (
                  <input
                    type="date"
                    name="expirationDate"
                    value={editedTask.expirationDate}
                    onChange={handleChange}
                  />
                ) : (
                  formatDateToSpanish(task.expirationDate)
                )}
              </td>
              <td className="table__data--desc">
                {editingId === task.id ? (
                  <input type="text" name="description" value={editedTask.description} onChange={handleChange} />
                ) : (
                  task.description
                )}
              </td>
              <td className="table__data table__data--actions">
                {editingId === task.id ? (
                  <>
                    <IoSaveOutline onClick={handleSave} role="button" tabIndex={0} />
                    <IoCloseOutline onClick={handleCancel} role="button" tabIndex={0} />
                  </>
                ) : (
                  <>
                    <IoPencilOutline onClick={() => handleEditClick(task)} role="button" tabIndex={0} />
                    <IoTrashBinOutline onClick={() => handleDelete(task.id)} role="button" tabIndex={0} />
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
