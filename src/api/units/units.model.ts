import * as z from 'zod';

export const Unit = z.object({
  id: z.number().optional(),
  unit_number: z.string().min(1),
  unit_name: z.string().min(1),
  type: z.enum(['ipas1', 'ip', 'adm', 'sup', 'comm']),
});

export type Unit = z.infer<typeof Unit>;

export const Table = 'units';