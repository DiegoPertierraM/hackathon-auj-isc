// src/components/TaskFormModal.js
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Modal } from '../../modal/Modal';
import './taskFormModal.scss';
import { TaskFormModalProps } from '../../../interfaces/Task.interface';

export const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const currentDate = useMemo(() => new Date(), []);
  const nextDay = useMemo(() => {
    const tempDate = new Date(currentDate);
    tempDate.setDate(currentDate.getDate() + 1);
    return tempDate;
  }, [currentDate]);

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    title: '',
    taskDate: formatDate(currentDate),
    notification: formatDate(currentDate),
    expirationDate: formatDate(nextDay),
    description: ''
  });

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      taskDate: formatDate(currentDate),
      notification: formatDate(nextDay),
      expirationDate: formatDate(nextDay),
      description: ''
    });
  }, [currentDate, nextDay]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const formatToISO8601 = (date: string) => {
    return new Date(date + 'T00:00:00.000Z').toISOString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      ...formData,
      taskDate: formatToISO8601(formData.taskDate),
      notification: formatToISO8601(formData.notification),
      expirationDate: formatToISO8601(formData.expirationDate)
    };
    onAddTask(formattedData);
    setFormData({ title: '', taskDate: '', notification: '', expirationDate: '', description: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Añadir nueva tarea</h2>
      <form onSubmit={handleSubmit} className="task__form">
        <div className="form__group">
          <label>Título</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form__group">
          <label>Fecha</label>
          <input type="date" name="taskDate" value={formData.taskDate} onChange={handleChange} required />
        </div>
        <div className="form__group">
          <label>Notificación</label>
          <input type="date" name="notification" value={formData.notification} onChange={handleChange} required />
        </div>
        <div className="form__group">
          <label>Fecha de expiración</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__group">
          <label>Descripcion</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">
          Añadir
        </button>
      </form>
    </Modal>
  );
};
