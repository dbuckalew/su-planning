import * as z from 'zod';

export const Year = z.object({
  id: z.number().optional(),
  beginyear: z.number().min(2000).max(3000),
  endyear: z.number().min(2000).max(3000),
});

export type Year = z.infer<typeof Year>;

export const Table = 'years';