const reducer = (state = { testProp: 'Hello!' }, action) => {
    if (action.type === 'SHOW_NAVIGATION') {
        return {
            ...state,
            navigation: {
                left: '0'
            }
        }
    }
    return state;
}

export default reducer;
