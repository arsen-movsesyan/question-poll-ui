const remote = false;

export const environment = {
  production: false
};

export const serverProto = remote ? 'https' : 'http';
export const serverHost = remote ? 'commercial-backend.uw.r.appspot.com' : 'localhost';
export const serverPort = remote ? '443' : '5000';
