import { Repository } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository
  extends Repository<Appointment> {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
