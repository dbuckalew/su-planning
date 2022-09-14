import * as z from 'zod';

export const ResultType = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  desc: z.string().nullable(),
});

export type ResultType = z.infer<typeof ResultType>;

export const Table = 'result_types';