import { container } from 'tsyringe';

import IStorageProvider from './StorageProviders.ts/models/IStorageProvider';
import DiskStorageProvider from './StorageProviders.ts/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
