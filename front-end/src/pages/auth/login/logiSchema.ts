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

export type Login = z.infer<typeof loginSchema>;