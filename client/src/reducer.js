const reducer = (state = {
    alias: '',
    userId: 0,
    loggedIn: false,
    verified: false,
    unreadMessages: false,
    unreadGroups: []
}, action) => {
    if (action.type === 'GET_GROUPS') {
        if (action.success) {
            return {
                ...state,
                groups: { ...action.data }
            }
        } else {
            return {
                ...state,
                groupsError: action.data
            }
        }
    }
    if (action.type === 'LOG_IN') {
        if (action.success) {
            console.log('hi');
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
                loginError: {
                    message: 'Wrong mail or password. Please try again.',
                    messageRed: { color: 'red' }
                }
            }
        }
    }
    return state;
}

export default reducer;
