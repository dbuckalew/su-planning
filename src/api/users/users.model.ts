import * as z from 'zod';

export const User = z.object({
  id: z.number().optional(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  extension: z.number().min(5000).max(5999),
  email: z.string(),
  admin: z.number().default(0)
});

export type User = z.infer<typeof User>;

export const Table = 'staff';
