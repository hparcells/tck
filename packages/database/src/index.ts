import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

export * from './client';

export * from './functions/admin';
export * from './functions/backblaze';
export * from './functions/clips';
export * from './functions/collection';
export * from './functions/giveaways';
export * from './functions/ip';
export * from './functions/kick/kick-raffle';
export * from './functions/kick/kick';
export * from './functions/leaderboard';
export * from './functions/permissions';
export * from './functions/user/accounts';
export * from './functions/user/auth';
export * from './functions/user/discord';
export * from './functions/user/fetch';
export * from './functions/user/points';
export * from './functions/user/user';
export * from './functions/user/wallets';

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://c4b3693a0da99d61e927970a414bcc88@o4505824725172224.ingest.sentry.io/4505824765018112',
    integrations: [new ProfilingIntegration()],
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    environment: process.env.NODE_ENV
  });
}
