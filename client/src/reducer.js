const reducer = (state = {}, action) => {
    if (action.type === 'DELETE_MESSAGE') {
        return {
            ...state,
            message: ''
        };
    }

    if (action.type === 'SET_MESSAGE') {
        const { message } = action;
        return {
            ...state,
            message
        };
    }

    if (action.type === 'SIGN_OUT') {
        const { message } = action;
        return {
            ...state,
            signedIn: false,
            user: {},
            message
        };
    }

    if (action.type === 'SIGN_IN') {
        return {
            ...state,
            signedIn: true,
            user: {
                ...action.data
            }
        };
    }

    if (action.type === 'VERIFY_ACCOUNT') {
        const { message } = action;
        return {
            ...state,
            user: {
                ...state.user,
                verified: 1
            },
            message
        };
    }

    if (action.type === 'UPDATE_PROFILE') {
        const { message } = action;
        return {
            ...state,
            user: {
                ...action.data
            },
            message
        };
    }

    if (action.type === 'UPDATE_ICON_URL') {
        return {
            ...state,
            user: {
                ...state.user,
                icon_url: action.data
            }
        };
    }

    if (action.type === 'GET_GROUPS') {
        return {
            ...state,
            groups: [...action.data]
        };
    }

    if (action.type === 'GET_HISTORY') {
        return {
            ...state,
            history: [...action.data]
        };
    }

    if (action.type === 'GET_NOTES') {
        return {
            ...state,
            notes: [...action.data]
        };
    }

    if (action.type === 'CREATE_HISTORY') {
        return {
            ...state,
            history: [...state.history, action.data]
        };
    }

    return state;
};

export default reducer;
