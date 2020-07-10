import { addMinutes } from 'date-fns';

interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'admin@admin.com',
      name: 'Julia dos los hermanos',
    },
  },
} as IMailConfig;
