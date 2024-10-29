// src/components/CollaboratorFormModal.js
import { useState } from 'react';
import { Modal } from '../../modal/Modal';
import './collaboratorFormModal.scss';
import { CollaboratorFormModalProps } from '../../../interfaces/Collaborator.interface';

export const CollaboratorFormModal: React.FC<CollaboratorFormModalProps> = ({
  isOpen,
  onClose,
  onAddCollaborator
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCollaborator(formData);
    setFormData({ name: '', email: '', phone: '', company: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Añadir nuevo colaborador</h2>
      <form onSubmit={handleSubmit} className="collaborator__form">
        <div className="form__group">
          <label>Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form__group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form__group">
          <label>Teléfono</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div className="form__group">
          <label>Compañía</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <button type="submit" className="button">
          Añadir
        </button>
      </form>
    </Modal>
  );
};
