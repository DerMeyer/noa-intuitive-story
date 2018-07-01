const reducer = (
    state = {
        error: {},
        alias: '',
        userId: 0,
        loggedIn: false,
        verified: 0,
        unreadMessages: false,
        unreadGroups: []
    },
    action
) => {
    if (action.type === 'NO_ERROR') {
        return {
            ...state,
            error: {}
        }
    }
    if (action.type === 'LOG_OUT') {
        if (action.success) {
            return {
                ...state,
                alias: '',
                userId: 0,
                loggedIn: false,
                verified: 0
            }
        } else {
            return {
                ...state,
                error: { ...action.error }
            }
        }
    }
    if (action.type === 'LOG_IN') {
        if (action.success) {
            return {
                ...state,
                alias: action.data.alias,
                userId: action.data.id,
                loggedIn: true,
                verified: action.data.verified,
            }
        } else {
            return {
                ...state,
                error: { ...action.error }
            }
        }
    }
    if (action.type === 'GET_GROUPS') {
        if (action.success) {
            return {
                ...state,
                groups: { ...action.data }
            }
        } else {
            return {
                ...state,
                error: { ...action.error }
            }
        }
    }
    return state;
}

export default reducer;
