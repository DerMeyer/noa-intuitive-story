const reducer = (state = { user: {} }, action) => {
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

    if (action.type === 'ACCEPT_COOKIES') {
        const { cookies } = action;
        return {
            ...state,
            cookies
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
                ...action.user
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

    if (action.type === 'GET_PAGES') {
        return {
            ...state,
            pages: [...action.data]
        }
    }

    if (action.type === 'GET_MENU') {
        return {
            ...state,
            menu: {...action.data}
        }
    }

    if (action.type === 'SAVE_PAGE') {
        return {
            ...state,
            message: action.message
        }
    }

    return state;
};

export default reducer;
