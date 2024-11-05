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
import { NavLink } from 'react-router-dom';
import { InputSearch, Skleton, Title } from '../../components';
import { TaskFormModal } from '../../components/specific-modals/TaskFormModal/taskFormModal';
import { Task, TaskFormData } from '../../interfaces/Task.interface';
import { AppDispatch } from '../../store/store';
import { getError, getLoading, getTasks } from '../../store/tasks/tasksSlice';
import { createTask, deleteTask, fetchTasks, updateTask } from '../../store/tasks/tasksThunk';
import './tasks.scss';

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
  const [search, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const TASKS_PER_PAGE = 10;

  const tasksFiltered = searchTasks(tasks, search);

  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const currentTasks = tasksFiltered.slice(startIndex, startIndex + TASKS_PER_PAGE);

  const totalPages = Math.ceil(tasksFiltered.length / TASKS_PER_PAGE);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (taskData: TaskFormData) => {
    dispatch(createTask(taskData));
  };

  const handleEditClick = (task: (typeof tasks)[0]) => {
    setEditingId(task.id);
    setEditedTask(task);
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
    setEditedTask({
      title: '',
      taskDate: '',
      notification: '',
      expirationDate: '',
      description: ''
    });
  };

  const handleDelete = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  const formatDateToSpanish = (isoDateString: string) => {
    const date = new Date(isoDateString);
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (error) return <p>Error: {error}</p>;

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="tasks section">
      <Title title="Tareas" />

      {loading === 'loading' ? (
        <Skleton />
      ) : (
        <>
          <div className="tasks__header">
            <InputSearch onSearch={onSearch} placeHolder="Buscar tarea.." />

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
                <th>Usuario asignado</th>
                <th className="table__th">Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map(task => (
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
                      <input
                        type="date"
                        name="notification"
                        value={editedTask.notification}
                        onChange={handleChange}
                      />
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
                  <td className="table__data">
                    {task.UserTask && task.UserTask.length > 0
                      ? task.UserTask.map(userTask => <div key={userTask.userId}>{userTask.user.name}</div>)
                      : 'Sin usuarios asignados'}
                  </td>
                  <td className="table__data--desc">
                    {editingId === task.id ? (
                      <input
                        type="text"
                        name="description"
                        value={editedTask.description}
                        onChange={handleChange}
                      />
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

                        <NavLink to={`/tasks-add-user/${task.id}`}>
                          <IoAddOutline size={20} role="button" tabIndex={0} />
                        </NavLink>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!tasksFiltered.length && <span>No se encontraron resultados 😅</span>}

          <div className="pagination">
            <button className="pagination__button" onClick={handlePrevPage} disabled={currentPage === 1}>
              <IoArrowBackOutline size={24} />
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button className="pagination__button" onClick={handleNextPage} disabled={currentPage === totalPages}>
              <IoArrowForwardOutline size={24} />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

const searchTasks = (tasks: Task[], search: string) => {
  if (!search) return tasks;

  const searchLower = search.toLowerCase();

  const taskFiltered = tasks.filter(task => task.title.toLowerCase().includes(searchLower));
  return taskFiltered;
};
