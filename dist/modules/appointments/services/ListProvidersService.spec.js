"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProvidersService = _interopRequireDefault(require("./ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeCacheProvider;
let listProviders;
describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProvidersService.default(fakeUsersRepository, fakeCacheProvider);
  });
  it('should be able show to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Joao Um',
      email: 'joaoum@teste.com',
      password: '123123123'
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Joao Dois',
      email: 'joaodois@teste.com',
      password: '123123123'
    });
    const loggedUser = await fakeUsersRepository.create({
      name: 'Joao tres',
      email: 'joaotres@teste.com',
      password: '123123123'
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id
    });
    expect(providers).toEqual([user1, user2]);
  });
});