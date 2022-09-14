import * as z from 'zod';

export const Goal = z.object({
  id: z.number().optional(),
  setid: z.number().min(1),
  goal_num: z.number().default(1),
  goal_name: z.string(),
  goal_desc: z.string(),
});

export type Goal = z.infer<typeof Goal>;

export const Table = 'goals';