import {serverHost, serverPort, serverProto} from "../environments/environment";


export const BACKEND_SERVER = serverHost + ':' + serverPort;
const SERVER_ROOT = serverProto + '://' + BACKEND_SERVER;


// http://localhost:8889/api/
export const SERVER_API = SERVER_ROOT + '/';


export const LOGIN_URL = SERVER_API +  'login';
export const TOPICS_URL = SERVER_API +  'topics';
export const QUESTIONS_URL = SERVER_API +  'questions';
export const VOTE_URL = SERVER_API + 'vote';
export const ASK_QUESTION_URL = SERVER_API + 'add-question';

export const JWT_ALLOWED_DOMAINS = [
  serverHost,  // For deployed app this should not include port
  BACKEND_SERVER
];

export const JWT_DISALLOWED_ROUTES = [
  LOGIN_URL,
  TOPICS_URL,
  QUESTIONS_URL
];

