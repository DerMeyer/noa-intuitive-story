const reducer = (state = {
    loggedIn: false,
    verified: false,
    alias: '',
    unreadMessages: false,
    unreadGroups: [],
    errorMessage: ''
}, action) => {
    if (action.type === 'GET_GROUPS') {
        return {
            ...state,
            groups: { ...action.data }
        }
    }
    if (action.type === 'LOG_IN') {
        return {
            ...state
        }
    }
    return state;
}

export default reducer;
