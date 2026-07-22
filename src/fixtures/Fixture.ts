import { test as base } from '@playwright/test';

export interface User {
    email: string;
    password: string;
}

type Fixtures = {};

export const test = base.extend<Fixtures>({});
