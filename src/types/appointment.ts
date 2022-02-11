import { z } from 'zod';
import { UserSchema } from './user';

const isISOString = (val: any): val is Date => {
  const d = new Date(val);
  return !Number.isNaN(d.valueOf()) && d.toISOString() === val;
};

export const AppointmentSchema = z
  .object({
    id: z.string().uuid().optional(),
    description: z.string().optional(),
    startAt: z
      .string({ required_error: 'StartAt field is required' })
      .refine(isISOString, 'StartAt date must be a valid ISO string'),
    endAt: z
      .string({ required_error: 'EndAt field is required' })
      .refine(isISOString, 'EndAt date must be a valid ISO string'),
    user: UserSchema.required(),
  })
  .strip();
