import { CREATE, AppActions, Create} from "./app.action";
import {
    Action,
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';

export interface AppState {
    createPayload: any;
    editPayload: any;
    deletePayload: any;
}

const initialState: AppState = {
    createPayload: [],
    editPayload: [],
    deletePayload: []
}

export interface State {
    app: AppState;
}

export function appReducer(state: AppState = initialState, action: AppActions) {
    switch (action.type) {
        case CREATE:
            return {
                ...state,
                createPayload: (<Create>action).createPayload
            };
        default:
            return state;
    }
}

export const reducers: ActionReducerMap<State> = {
    app: appReducer
};

export const getAppState = createFeatureSelector<AppState>('app');

export const getCreatePayload = createSelector(
    getAppState,
    (state: AppState) => state.createPayload
);
