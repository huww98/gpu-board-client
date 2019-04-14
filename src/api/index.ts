export * from './api-datasource';
export * from './types';

export interface Config {
    servers: string[];
}

export async function fetchConfig() {
    const res = await fetch(`${process.env.BASE_URL}config.json`);
    return await res.json() as Config;
}
