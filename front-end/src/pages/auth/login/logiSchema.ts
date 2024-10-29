import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'El email debe ser un string'
    })
    .email({ message: 'El email no es válido' })
    .min(1, { message: 'El email no puede estar vacío' }),
  password: z
    .string({
      required_error: 'La contraseña debe ser un string'
    })
    .min(1, { message: 'La contraseña no puede estar vacía' })
});

export const registerSchema = loginSchema
  .extend({
    name: z
      .string({
        required_error: 'El nombre es requerido'
      })
      .min(1, { message: 'El nombre no puede estar vacío' }),
    phone: z.string().optional(),
    confirmPassword: z
      .string({
        required_error: 'La confirmación de la contraseña es requerida'
      })
      .min(1, { message: 'La confirmación de la contraseña no puede estar vacía' })
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword']
  });

export type Login = z.infer<typeof loginSchema>;
export type Register = z.infer<typeof registerSchema>;
