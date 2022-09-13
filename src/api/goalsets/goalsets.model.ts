import * as z from 'zod';

const Goalset = z.object({
  id: z.number().optional(),
  begin_date: z.date(),
  end_date: z.date().nullable().default(null)
});

export type Goalset = z.infer<typeof Goalset>;

export const Table = 'goalsets';