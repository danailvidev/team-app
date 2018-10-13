import * as userActions from './../actions/user.actions';

export function userReducer(state = [], action: userActions.Action) {
    switch (action.type) {
        case userActions.LOAD_USERS_SUCCESS: {
            return action.payload;
        }
        case userActions.DELETE_USER_SUCCESS: {
            return state.filter(user => user.id !== action.payload);
        }
        default: {
            return state;
        }
    }
}
