import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createParticipant } from '../../../store/participants/participantsThunk';
import { AppDispatch } from '../../../store/store';
import { FormInput } from '../../form-input/FormInput';
import { Modal } from '../../modal/Modal';
import { Participants, participantsSchema } from './participantsShema';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ParticipantsModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Participants>({
    resolver: zodResolver(participantsSchema)
  });

  const onHandleSubmit: SubmitHandler<Participants> = async data => {
    console.log({ data });
    await dispatch(createParticipant(data));
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="form__title">Agregar Participante</h2>
      <form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
        <FormInput
          label="Nombre"
          placeholder="nombre..."
          type="text"
          id="name"
          error={errors['name']}
          {...register('name')}
        />
        <FormInput
          label="Email"
          placeholder="email..."
          type="email"
          id="name"
          error={errors['email']}
          {...register('email')}
        />
        <FormInput
          label="Nº de entradas"
          placeholder="2..."
          type="number"
          id="ticket"
          error={errors['ticket']}
          {...register('ticket')}
        />

        <button className="form__submit" type="submit">
          Agregar
        </button>
      </form>
    </Modal>
  );
};
