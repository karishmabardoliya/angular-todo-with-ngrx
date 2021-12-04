import { Action } from '@ngrx/store';
export const CREATE = '[Create] Set Create';

export class Create implements Action {
    readonly type = CREATE;
    constructor(public createPayload: any) { }
}

export type AppActions =
    | Create;
