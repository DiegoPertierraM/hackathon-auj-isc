import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '../../../components';
import './login.scss';
import { Login, loginSchema } from './logiSchema';
export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Login>({
    resolver: zodResolver(loginSchema)
  });

  const onHandleSubmit: SubmitHandler<Login> = data => {
    console.log(data);
  };
  return (
    <section className="login">
      <div className="login__content">
        <img className="login__logo" src="/images/auth-logo.png" alt="" />

        <h2 className="auth-title">Bienvenido</h2>

        <form className="login__form" onSubmit={handleSubmit(onHandleSubmit)}>
          <FormInput
            label="Email"
            placeholder="email"
            id="email"
            type="email"
            error={errors['email']}
            {...register('email')}
          />
          <FormInput
            label="Password"
            placeholder="******"
            id="password"
            type="password"
            error={errors['password']}
            {...register('password')}
          />

          <button className="login__form-btn" type="submit">
            Iniciar Sessión
          </button>
        </form>
      </div>

      <div className="login__bg">{/* <img src="/images/impact-social-bg.png" alt="" /> */}</div>
    </section>
  );
};
