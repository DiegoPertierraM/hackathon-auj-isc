import { z } from 'zod';

export const participantsSchema = z.object({
  name: z
    .string({ required_error: 'El nombre deber ser un string' })
    .min(1, { message: 'El nombre no puede estar vacio' }),
  email: z
    .string({ required_error: 'El email debe ser un string' })
    .email({ message: 'El email no es válido' })
    .min(1, { message: 'El email no puede estar vacío' }),
  ticket: z
    .string({ required_error: 'El Numero de entradas debe ser un número' })
    .min(1, { message: 'El campo no puede estar vacio' })
    .refine(value => !isNaN(Number(value)), { message: 'Debe ser un número' })
    .transform(value => Number(value))
    .refine(value => Number.isInteger(value), { message: 'Solo números enteros' })
    .refine(value => value > 0, { message: 'El número de entradas debe ser positivo' })
    .refine(value => value >= 1, { message: 'El campo no puede estar vacio' })
});

export type Participants = z.infer<typeof participantsSchema>;
