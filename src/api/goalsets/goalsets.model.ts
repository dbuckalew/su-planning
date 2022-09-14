import * as z from 'zod';

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

export const Goalset = z.object({
  id: z.number().optional(),
  begin_date: dateSchema,
  end_date: dateSchema.nullable().default(null)
});

export type Goalset = z.infer<typeof Goalset>;

export const Table = 'goalsets';