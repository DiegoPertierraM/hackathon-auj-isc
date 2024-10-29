import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createOpportunity } from '../../../store/opportunities/opportunitiesThunk';
import { AppDispatch } from '../../../store/store';
import { FormInput } from '../../form-input/FormInput';
import { Modal } from '../../modal/Modal';
import { TextAreaForm } from '../../text-area-form/TextAreaForm';
import './opportinitiesModal.scss';
import { Opportunities, opportunitiesSchema } from './opportunitiesSchema';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const OpportunitiesModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Opportunities>({
    resolver: zodResolver(opportunitiesSchema)
  });

  const onHandleSubmit: SubmitHandler<Opportunities> = async data => {
    await dispatch(createOpportunity(data));
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="form__title">Agregar oportunidad</h2>
      <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
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

        <TextAreaForm
          label="Description"
          id="description"
          error={errors['description']}
          {...register('description')}
        />

        <button className="form__submit" type="submit">
          Agregar
        </button>
      </form>
    </Modal>
  );
};
