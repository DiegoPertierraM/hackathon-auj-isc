import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../../store/store';
import { getUsers } from '../../../store/users/usersSlice';
import { addTaskToUser, fetchUsers } from '../../../store/users/usersThunk';
import { IoArrowBackOutline } from 'react-icons/io5';
import './addUserToTask.scss';

export const AddUserToTask = () => {
  const { id } = useParams<{ id: string }>();
  const users = useSelector(getUsers);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUserId !== null) {
      await dispatch(addTaskToUser({ taskId: Number(id), userId: selectedUserId }));
      navigate('/tasks');
    } else {
      alert('Please select a user');
    }

    navigate('/tasks');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(event.target.value));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <section className="add-user">
      <button className="back-button" onClick={() => navigate(-1)}>
        <IoArrowBackOutline size={24} role="button" tabIndex={0} />
      </button>
      <form className="add-user-form" onSubmit={onHandleSubmit}>
        <label htmlFor="user-select">Seleccionar Usuario</label>
        <select name="user" id="user-select" onChange={handleUserChange} value={selectedUserId || ''}>
          <option value="" disabled>
            -- Seleccione un usuario --
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};
