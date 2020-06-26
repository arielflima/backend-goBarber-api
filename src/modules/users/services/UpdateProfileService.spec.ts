import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Three',
      email: 'johntrhee@example.com',
    });

    await expect(updatedUser.name).toBe('John Three');
    await expect(updatedUser.email).toBe('johntrhee@example.com');
  });

  it('should not be able show the profile from non-existing user', async () => {
    expect(
      updateProfile.execute({
        user_id: 'non-existing-user-id',
        name: 'Test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Joao',
      email: 'joao@teste.com',
      password: '123123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Jao',
      email: 'trocado@teste.com',
      password: '123123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joao',
        email: 'joao@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'tete@example.com',
      password: 'ttt',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste',
      email: 'tete@example.com',
      old_password: 'ttt',
      password: 'aaa',
    });

    await expect(updatedUser.password).toBe('aaa');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joao',
        email: 'joao@teste.com',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joao',
        email: 'joao@teste.com',
        old_password: 'wrong-old-password',
        password: '123123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
