const reducer = (
    state = {
        message: {},
        loggedIn: false,
        user: {
            alias: '',
            userId: 0,
            verified: 0,
            unreadMessages: false,
            unreadGroups: []
        }
    },
    action
) => {
    if (action.type === 'DELETE_MESSAGE') {
        return {
            ...state,
            message: {}
        };
    }
    if (action.type === 'SET_MESSAGE') {
        return {
            ...state,
            message: { ...action.message }
        };
    }
    if (action.type === 'LOG_OUT') {
        return {
            ...state,
            loggedIn: false,
            user: {
                alias: '',
                userId: 0,
                verified: 0,
                unreadMessages: false,
                unreadGroups: []
            },
            message: { ...action.message }
        };
    }
    if (action.type === 'LOG_IN') {
        return {
            ...state,
            loggedIn: true,
            user: {
                ...action.data
            }
        };
    }
    if (action.type === 'VERIFY_ACCOUNT') {
        return {
            ...state,
            user: {
                ...state.user,
                verified: 1
            }
        }
    }
    if (action.type === 'GET_GROUPS') {
        return {
            ...state,
            groups: { ...action.data }
        };
    }
    return state;
}

export default reducer;
