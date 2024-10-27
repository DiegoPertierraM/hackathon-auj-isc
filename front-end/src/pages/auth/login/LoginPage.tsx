import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../../../components';
import { getLoading } from '../../../store/auth/authSlice';
import { loginThunk } from '../../../store/auth/authThunk';
import { AppDispatch } from '../../../store/store';
import './login.scss';
import { Login, loginSchema } from './logiSchema';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(getLoading);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Login>({
    resolver: zodResolver(loginSchema)
  });

  const onHandleSubmit: SubmitHandler<Login> = async data => {
    const { email, password } = data;

    await dispatch(loginThunk({ email, password }));
    navigate('/');
  };

  return (
    <section className="login wrapper">
      <div className="login__content">
        <img className="login__logo" src="/images/auth-logo.png" alt="" />

        <h2 className="auth-title">Bienvenido de nuevo</h2>

        <form className="login__form" onSubmit={handleSubmit(onHandleSubmit)}>
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
            placeholder="Introduce tu contraseña"
            id="password"
            type="password"
            error={errors['password']}
            {...register('password')}
          />
          <p className="login__forgot-password">¿Olvidaste tu contraseña?</p>

          <button className="login__form-btn" type="submit">
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
          <p className="login__link-register">
            ¿No tienes cuenta?
            <Link to="/auth/register" className="login__register-link">
              Regístrate
            </Link>
          </p>
        </form>
      </div>

      <img className="login__bg" src="/images/impact-social-bg.png" alt="" />
    </section>
  );
};
