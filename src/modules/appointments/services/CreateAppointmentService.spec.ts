import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should to be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '333333',
      provider_id: '333333',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('333333');
  });
  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '333333',
      user_id: '333333',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '333333',
        user_id: '333333',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
