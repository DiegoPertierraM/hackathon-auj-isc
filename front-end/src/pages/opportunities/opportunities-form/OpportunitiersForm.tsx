import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FormInput } from '../../../components';
import { getOpportunities } from '../../../store/opportunities/opportunitiesSlice';
import { createOpportunity, updateOportinity } from '../../../store/opportunities/opportunitiesThunk';
import { AppDispatch } from '../../../store/store';
import './opportunitiesForm.scss';
import { Opportunities, opportunitiesSchema } from './opportunitiesSchema';

export const OpportunitiersForm = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useDispatch<AppDispatch>();
  const opportunities = useSelector(getOpportunities).find(opportunity => opportunity.id === Number(id));
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Opportunities>({
    resolver: zodResolver(opportunitiesSchema)
  });

  const onHandleSubmit: SubmitHandler<Opportunities> = async data => {
    await dispatch(createOpportunity(data));
  };

  const onEdit: SubmitHandler<Opportunities> = async opportunity => {
    if (!id) return;
    const oportunittieId = Number(id);
    await dispatch(updateOportinity({ oportunittieId, opportunity }));
  };
  const onBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!opportunities) return;
    reset(opportunities);
  }, [opportunities, reset]);
  return (
    <section className="form-opp section">
      <button onClick={onBack}>
        <IoArrowBackOutline size={30} />
      </button>
      <form className="form" onSubmit={handleSubmit(opportunities ? onEdit : onHandleSubmit)}>
        <FormInput
          label="Titulo"
          placeholder="titulo..."
          type="text"
          id="tittle"
          error={errors['title']}
          {...register('title')}
        />
        <FormInput
          label="Nombre"
          placeholder="nombre..."
          type="text"
          id="name"
          error={errors['name']}
          {...register('name')}
        />

        <div className="form__select-container">
          <label htmlFor="status">Estado*</label>
          <select className="form__select" id="status" {...register('status')}>
            <option value="new">Nuevo</option>
            <option value="inProgress">En progreso</option>
            <option value="closed">Cerrado</option>
          </select>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea className="form__area" id="description" {...register('description')}></textarea>
        </div>

        <button className="form__submit" type="submit">
          Agregar
        </button>
      </form>
    </section>
  );
};
