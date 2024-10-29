import { z } from 'zod';

const STATUS = ['new', 'inProgress', 'closed'] as const;

export const opportunitiesSchema = z.object({
  title: z
    .string({ required_error: 'El titulo deber ser un sting' })
    .min(1, { message: 'El titulo no puede estar vacío' }),

  name: z
    .string({ required_error: 'El nombre deber ser un sting' })
    .min(1, { message: 'El nombre no puede estar vacío' }),
  description: z
    .string({ required_error: 'La descripción deber ser un sting' })
    .min(1, { message: 'La descripción no puede estar vacío' }),
  status: z.enum(STATUS)
});

export type Opportunities = z.infer<typeof opportunitiesSchema>;
