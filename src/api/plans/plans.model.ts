import * as z from 'zod';

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
}, z.date());

export const Plan = z.object({
  fileID: z.number().optional(),
  ayear: z.number().min(1),
  outcomenumber: z.string().min(1),
  goal: z.number().min(1),
  objective: z.string().default(''),
  outcometype: z.string().default(''),
  outcome: z.string().default(''),
  graduatecompetencies: z.string().default(''),
  assessment: z.string().default(''),
  completiondate: z.string().default(''),
  budget: z.string().default('0'),
  action: z.string().default(''),
  measure: z.string().default(''),
  unit_id: z.number().min(1),
  created_at: dateSchema.default(new Date()),
  updated_at: dateSchema,
  created_by: z.number().min(1)
});

export type Plan = z.infer<typeof Plan>;

export const Table = 'unitdata';
