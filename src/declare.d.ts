declare module 'semantic-ui-react-form-validator'

interface ImportMetaEnv {
    VITE_REACT_APP_FIREBASE_APIKEY: string;
    VITE_REACT_APP_FIREBASE_AUTHDOMAIN: string;
    VITE_REACT_APP_FIREBASE_DATABASEURL: string;
    VITE_REACT_APP_FIREBASE_PROJECTID: string;
    VITE_REACT_APP_FIREBASE_STORAGEBUCKET: string;
    VITE_REACT_APP_FIREBASE_MESSAGINGSENDERID: string;
    VITE_REACT_APP_FIREBASE_APPID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }