export const environment = {
  production: process.env['NODE_ENV'] === 'development',
  api: process.env['API_URL'] || 'http://localhost:3001/api/1.0'
};

declare var process: {
  env: {
    NODE_ENV: string;
    API_URL: string;
    [key: string]: string;
  };
};
