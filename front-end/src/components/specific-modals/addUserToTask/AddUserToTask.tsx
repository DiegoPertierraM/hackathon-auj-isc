import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch } from '../../../store/store';
import { getUsers } from '../../../store/users/usersSlice';
import { addTaskToUser, fetchUsers } from '../../../store/users/usersThunk';

export const AddUserToTask = () => {
  const { id } = useParams<{ id: string }>();
  const users = useSelector(getUsers);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(addTaskToUser({ taskId: Number(id), userId: 1 }));

    navigate(-1);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <section>
      <form action="" onSubmit={onHandleSubmit}>
        <select name="" id="">
          {users.map(user => (
            <option value={user.id}>{user.name}</option>
          ))}
        </select>

        <button type="submit">enviar</button>
      </form>
    </section>
  );
};
