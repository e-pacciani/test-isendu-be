import {
  validateBody,
  validateParams,
  validateQueryParams,
} from '../middlewares';
import { AppointmentSchema } from '../models';
import express from 'express';
import { AppointmentsController } from '../controllers/appointments.controller';
import { z } from 'zod';
import { idParamValidator } from '../helpers/zod-validators';

export const appointmentsRouter = express.Router();

appointmentsRouter.get(
  '/',
  validateQueryParams(
    z.object({
      page: z
        .string()
        .refine(
          page => !isNaN(Number(page)),
          'Please provide a valide page number'
        ),
      limit: z
        .string()
        .refine(
          limit => !isNaN(Number(limit)),
          'Please provide a valid limit number'
        ),
      userId: z.string(),
      role: z.string(),
    })
  ),
  AppointmentsController.getAll
);
appointmentsRouter.post(
  '/:userId',
  validateBody(AppointmentSchema),
  AppointmentsController.create
);

appointmentsRouter.delete(
  '/:id',
  validateParams(idParamValidator),
  AppointmentsController.remove
);