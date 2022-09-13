import * as z from 'zod';

export const ParamsWithId = z.object({
  id: z.string().min(1).refine((val) => parseInt(val) > 0, {
    message: 'ID must be greater than zero.'
  }),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;