import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  description: z.string({
    required_error: 'Description must be a string',
  }),
  // date: z.coerce.date(),
  date: z.string(),
  // date: z.string().datetime().optional(),
});
