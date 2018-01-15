import * as authActions from './../actions/auth.actions';

export function authReducer(state = [], action: authActions.Action) {
    switch (action.type) {
        case authActions.GET_CURRENT_USER_DATA_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}
