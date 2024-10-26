import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../../components';
import { Register, registerSchema } from '../login/logiSchema';
import { Link, useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Register>({
    resolver: zodResolver(registerSchema)
  });

  const onHandleSubmit: SubmitHandler<Register> = data => {
    console.log(data);
    navigate('/');
  };

  return (
    <section className="login">
      <div className="login__content">
        <img className="login__logo" src="/images/auth-logo.png" alt="" />

        <h2 className="auth-title">Regístrate</h2>

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
            Registrarse
          </button>
          <p className="login__link-register">
            ¿Ya eres usuario?{' '}
            <Link to="/auth" className="login__register-link">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>

      <div className="login__bg">{/* <img src="/images/impact-social-bg.png" alt="" /> */}</div>
    </section>
  );
};
