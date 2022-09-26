import * as z from 'zod';

export const ParamsWithFileId = z.object({
  fileID: z.string().min(1).refine((val) => parseInt(val) > 0, {
    message: 'ID must be greater than zero.'
  }),
});

export type ParamsWithFileId = z.infer<typeof ParamsWithFileId>;
