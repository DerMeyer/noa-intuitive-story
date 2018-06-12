const reducer = (state = {}, action) => {
    if (action.type === 'SHOW_NAVIGATION') {
        return {
            ...state,
            navigation: {
                left: '0'
            }
        }
    }
    if (action.type === 'HIDE_NAVIGATION') {
        return {
            ...state,
            navigation: {
                left: '-17vw'
            }
        }
    }
    return state;
}

export default reducer;
