export interface IConfig {
    apiUrl: string;
    loginEndpoint: string;
    facebookId: string;
    googleId: string;
    firebase?: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket?: string;
        messagingSenderId?: string;
    }
}