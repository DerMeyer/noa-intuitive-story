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
    if (action.type === 'NO_MESSAGE') {
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
            }
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
    if (action.type === 'GET_GROUPS') {
        return {
            ...state,
            groups: { ...action.data }
        };
    }
    return state;
}

export default reducer;
