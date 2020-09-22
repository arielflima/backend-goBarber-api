"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    updateProfile = new _UpdateProfileService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Three',
      email: 'johntrhee@example.com'
    });
    await expect(updatedUser.name).toBe('John Three');
    await expect(updatedUser.email).toBe('johntrhee@example.com');
  });
  it('should not be able show the profile from non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Test',
      email: 'test@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Joao',
      email: 'joao@teste.com',
      password: '123123123'
    });
    const user = await fakeUsersRepository.create({
      name: 'Jao',
      email: 'trocado@teste.com',
      password: '123123123'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Joao',
      email: 'joao@teste.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'tete@example.com',
      password: 'ttt'
    });
    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste',
      email: 'tete@example.com',
      old_password: 'ttt',
      password: 'aaa'
    });
    await expect(updatedUser.password).toBe('aaa');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Joao',
      email: 'joao@teste.com',
      password: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Joao',
      email: 'joao@teste.com',
      old_password: 'wrong-old-password',
      password: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});