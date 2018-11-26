import axios from './axios';

export const deleteMessage = () => ({ type: 'DELETE_MESSAGE' });

export const setMessage = message => ({
    type: 'SET_MESSAGE',
    message
});

export const checkCookies = async () => {
    try {
        const resp = await axios.get('/api/check_cookies');
        if (resp.data.success) {
            return {
                type: 'ACCEPT_COOKIES',
                cookies: resp.data.cookies
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const acceptCookies = async () => {
    try {
        const resp = await axios.get('/api/accept_cookies');
        if (resp.data.success) {
            return {
                type: 'ACCEPT_COOKIES',
                cookies: true
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const signOut = async () => {
    try {
        const resp = await axios.get('/api/signout');
        if (resp.data.success) {
            return {
                type: 'SIGN_OUT'
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const checkSignIn = async () => {
    try {
        const resp = await axios.get('/api/check_signin');
        if (resp.data.success) {
            console.log(resp.data.cookies);
            return {
                type: 'SIGN_IN',
                user: { ...resp.data.user },
                cookies: resp.data.cookies
            };
        } else {
            return {
                type: 'YIELD'
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const signIn = async (alias, pw) => {
    try {
        const resp = await axios.post('/api/signin', { alias, pw });
        if (resp.data.success) {
            return {
                type: 'SIGN_IN',
                user: { ...resp.data.user }
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: 'Wrong user name or password.'
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const signUp = async (first, last, alias, mail, phone, pw) => {
    try {
        const resp = await axios.post('/api/signup', {
            first,
            last,
            alias,
            mail,
            phone,
            pw
        });
        if (resp.data.success) {
            window.location.replace('/verify');
            return {
                type: 'SIGN_IN',
                data: { ...resp.data.user }
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: 'That user name or mail already exists.'
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const newVerificationCode = async alias => {
    try {
        const resp = await axios.post('/api/new_verification_code', { alias });
        if (resp.data.success) {
            return {
                type: 'SET_MESSAGE',
                message:
                    'We sent you a new confirmation code to your e mail address.'
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: 'Sorry, something went wrong.'
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const verifyAccount = async (alias, verificationCode) => {
    try {
        const resp = await axios.post('/api/verify_account', {
            alias,
            verificationCode
        });
        if (resp.data.success) {
            return {
                type: 'VERIFY_ACCOUNT',
                message: 'Your account has been verified.'
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: 'You entered a wrong verification code.'
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const updateProfile = async (
    id,
    first,
    last,
    alias,
    mail,
    phone,
    newPW
) => {
    try {
        const resp = await axios.post('/api/update_profile', {
            id,
            first,
            last,
            alias,
            mail,
            phone,
            newPW
        });
        if (resp.data.success) {
            return {
                type: 'UPDATE_PROFILE',
                data: { ...resp.data.user },
                message: 'Your profile was updated.'
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: 'Something went wrong.'
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const updateIconUrl = url => {
    return {
        type: 'UPDATE_ICON_URL',
        data: url
    };
};

export const getGroups = async () => {
    try {
        const resp = await axios.get('/api/get_groups');
        if (resp.data.success) {
            return {
                type: 'GET_GROUPS',
                data: resp.data.groups
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: `The server didn't send any group data.`
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const getHistory = async () => {
    try {
        const resp = await axios.get('/api/get_history');
        if (resp.data.success) {
            return {
                type: 'GET_HISTORY',
                data: resp.data.history
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: `The server didn't send any history entries.`
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const getNotes = async () => {
    try {
        const resp = await axios.get('/api/get_notes');
        const notes = {};
        if (resp.data.success) {
            return {
                type: 'GET_NOTES',
                data: notes
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: `The server didn't send any notes.`
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};

export const createHistory = async (
    user_id,
    name,
    time_period,
    place,
    link,
    comment
) => {
    try {
        const resp = await axios.post('/api/create_history', {
            user_id,
            name,
            time_period,
            place,
            link,
            comment
        });
        if (resp.data.success) {
            return {
                type: 'CREATE_HISTORY',
                data: resp.data.historyEntry
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: 'Something went wrong.'
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: `The server didn't respond.`
        };
    }
};
