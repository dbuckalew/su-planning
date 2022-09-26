import * as z from 'zod';

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

export const Leader = z.object({
  id: z.number().optional(),
  staff: z.number(),
  unit: z.number(),
  beginning: dateSchema,
  ending: dateSchema,
});

export type Leader = z.infer<typeof Leader>;

export const Table = 'leaders';