import { IUser } from './user';

export interface AppState {
    users: IUser[];
    currentUser: any;
}
