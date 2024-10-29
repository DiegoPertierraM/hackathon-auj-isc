import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../../../components';
import { Register, registerSchema } from '../login/logiSchema';
import { getLoading } from '../../../store/auth/authSlice';
import { registerThunk } from '../../../store/auth/authThunk';
import { AppDispatch } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(getLoading);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Register>({
    resolver: zodResolver(registerSchema)
  });

  const onHandleSubmit: SubmitHandler<Register> = async data => {
    const { name, email, password, confirmPassword, phone } = data;

    try {
      await dispatch(registerThunk({ name, email, password, confirmPassword, phone }));
      navigate('/');
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <section className="login wrapper">
      <div className="login__content">
        <img className="login__logo" src="/images/auth-logo.png" alt="" />

        <h2 className="auth-title">Regístrate</h2>

        <form className="login__form" onSubmit={handleSubmit(onHandleSubmit)}>
          <FormInput
            label="Nombre"
            placeholder="Introduce tu nombre"
            id="name"
            type="name"
            error={errors['name']}
            {...register('name')}
          />
          <FormInput
            label="Email"
            placeholder="Introduce tu email"
            id="email"
            type="email"
            error={errors['email']}
            {...register('email')}
          />
          <FormInput
            label="Contraseña"
            placeholder="Introduce una contraseña válida"
            id="password"
            type="password"
            error={errors['password']}
            {...register('password')}
          />
          <FormInput
            label="Repite tu contraseña"
            placeholder="Introduce de nuevo tu contraseña"
            id="confirmPassword"
            type="password"
            error={errors['confirmPassword']}
            {...register('confirmPassword')}
          />

          <button className="login__form-btn" type="submit">
            {isLoading ? 'Realizando registro...' : 'Registrarse'}
          </button>
          <p className="login__link-register">
            ¿Ya eres usuario?{' '}
            <Link to="/auth" className="login__register-link">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>

      <img className="login__bg" src="/images/impact-social-bg.png" alt="" />
    </section>
  );
};
