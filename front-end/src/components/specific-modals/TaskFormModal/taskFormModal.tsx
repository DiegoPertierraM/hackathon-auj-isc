// src/components/TaskFormModal.js
import { useEffect, useState } from 'react';
import { Modal } from '../../modal/Modal';
import './taskFormModal.scss';
import { TaskFormData, TaskFormModalProps } from '../../../interfaces/Task.interface';

export const TaskFormModal: React.FC<TaskFormModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    taskDate: '',
    notification: '',
    expirationDate: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({ title: '', taskDate: '', notification: '', expirationDate: '', description: '' });
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddTask(formData as TaskFormData);
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
