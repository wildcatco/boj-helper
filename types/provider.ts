import { SUPPORTED_PROVIDERS } from '@/libs/constants/providers';

export type Provider = (typeof SUPPORTED_PROVIDERS)[number];
