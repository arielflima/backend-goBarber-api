import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able show to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Joao Um',
      email: 'joaoum@teste.com',
      password: '123123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Joao Dois',
      email: 'joaodois@teste.com',
      password: '123123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Joao tres',
      email: 'joaotres@teste.com',
      password: '123123123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
