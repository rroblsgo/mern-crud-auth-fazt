import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string({
    required_error: 'Username es requerido',
  }),
  email: z
    .string({
      required_error: 'Email es requerido',
    })
    .email({
      message: 'Email No válido',
    }),
  password: z
    .string({
      required_error: 'Password es requerido',
    })
    .min(4, {
      message: 'Password al menos de 4 caracteres',
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email es requerido',
    })
    .email({
      message: 'Email No válido',
    }),
  password: z
    .string({
      required_error: 'Password es requerido',
    })
    .min(4, {
      message: 'Password al menos de 4 caracteres',
    }),
});
