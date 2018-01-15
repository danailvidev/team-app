import { Action } from '@ngrx/store';
export const GET_CURRENT_USER_DATA = 'GET_CURRENT_USER_DATA';
export const GET_CURRENT_USER_DATA_SUCCESS = 'GET_CURRENT_USER_DATA_SUCCESS';

export class GetCurrentUserAction {
    readonly type = GET_CURRENT_USER_DATA;
    constructor() { }
}

export class GetCurrentUserSuccessAction {
    readonly type = GET_CURRENT_USER_DATA_SUCCESS;
    constructor(public payload: any) { }
}

export type Action
    = GetCurrentUserAction
    | GetCurrentUserSuccessAction;

