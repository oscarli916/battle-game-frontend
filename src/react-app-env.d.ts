/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    //types of envs
    REACT_APP_AUTH0_DOMAIN: string;
    REACT_APP_AUTH0_CLIENT_ID: string;
  }
}
