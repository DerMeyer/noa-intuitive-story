import axios from './axios';

export const deleteMessage = () => ({ type: 'DELETE_MESSAGE' });

export const setMessage = (text, color, time) => ({
    type: 'SET_MESSAGE',
    message: {
        text,
        color: { color },
        time
    }
});

export const logout = async () => {
    try {
        const resp = await axios.get('/api/logout');
        if (resp.data.success) {
            return {
                type: 'LOG_OUT'
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: {
                text: `The server didn't respond.`
            }
        };
    }
}

export const checkLogin = async () => {
    try {
        const resp = await axios.get('/api/check_login');
        if (resp.data.success) {
            return {
                type: 'LOG_IN',
                data: { ...resp.data.user }
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: {
                    text: `You're logged out.`
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: {
                text: `The server didn't respond to show if you're logged in.`,
                color: { color: 'red' }
            }
        };
    }
}

export const login = async (alias, pw) => {
    try {
        const resp = await axios.post('/api/login', { alias, pw });
        if (resp.data.success) {
            return {
                type: 'LOG_IN',
                data: { ...resp.data.user }
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: {
                    loginText: 'Wrong user name or password. Please try again.',
                    loginColor: { color: 'red' }
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: {
                text: `The server didn't respond.`,
                color: { color: 'red' }
            }
        };
    }
}

export const register = async (first, last, alias, mail, phone, pw) => {
    try {
        const resp = await axios.post('/api/register', { first, last, alias, mail, phone, pw });
        if (resp.data.success) {
            return {
                type: 'LOG_IN',
                data: { ...resp.data.user }
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: {
                    registerText: 'That user name or mail already exists.',
                    registerColor: { color: 'red' }
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: {
                text: `The server didn't respond.`,
                color: { color: 'red' }
            }
        };
    }
};

export const newVCode = async alias => {
    try {
        const resp = await axios.post('/api/new_v_code', { alias });
        if (resp.data.success) {
            return {
                type: 'SET_MESSAGE',
                message: {
                    verifyText: 'We sent you a new confirmation code to your e mail address.',
                    verifyColor: {}
                }
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: {
                    verifyText: 'Sorry, something went wrong.',
                    verifyColor: { color: 'red' }
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: {
                text: `The server didn't respond.`,
                color: { color: 'red' }
            }
        };
    }
}

export const verifyAccount = async (alias, vCode) => {
    try {
        const resp = await axios.post('/api/verify_account', { alias, vCode });
        if (resp.data.success) {
            return {
                type: 'VERIFY_ACCOUNT',
                message: {
                    text: 'Your account has been verified.'
                }
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: {
                    verifyText: 'You entered a wrong verification code.',
                    verifyColor: { color: 'red' }
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: {
                text: `The server didn't respond.`,
                color: { color: 'red' }
            }
        };
    }
}

export const updateProfile = async (id, first, last, alias, mail, phone, newPW) => {
    try {
        const resp = await axios.post('/api/update_profile', { id, first, last, alias, mail, phone, newPW });
        if (resp.data.success) {
            return {
                type: 'UPDATE_PROFILE',
                data: { ...resp.data.user },
                message: {
                    updateProfileText: 'Your profile was updated.'
                }
            }
        } else {
            return {
                type: 'SET_MESSAGE',
                message: {
                    updateProfileText: 'Something went wrong.'
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: {
                updateProfileText: `The server didn't respond.`
            }
        };
    }
};

export const updateIconUrl = async url => {
    return {
        type: 'UPDATE_ICON_URL',
        data: url
    }
};

export const getGroups = async () => {
    try {
        const resp = await axios.get('/api/groups');
        if (resp.data.success) {
            const groups = {};
            resp.data.groups.forEach(entry => {
                const soulKey = Object.keys(entry)
                                      .filter(key => (key === 'gul_user_id' || key === 'grun_user_id' || key === 'vermel_user_id' || key === 'bezrechu_user_id' || key === 'sagol_user_id') && entry[key] === entry.user_id)[0]
                                      .replace('_user_id', '');
                if (!groups[entry.group_id]) {
                    const { name, time_period, group_story, group_start, group_update, alias, user_id, soul, soul_story } = entry;
                    groups[entry.group_id] = {
                        name,
                        time_period,
                        group_story,
                        group_start,
                        group_update,
                        [soulKey]: {
                            alias,
                            user_id,
                            soul,
                            soul_story
                        }
                    };
                } else {
                    const { alias, user_id, soul, soul_story } = entry;
                    groups[entry.group_id][soulKey] = {
                        alias,
                        user_id,
                        soul,
                        soul_story
                    };
                }
            });
            return {
                type: 'GET_GROUPS',
                data: groups
            };
        } else {
            return {
                type: 'SET_MESSAGE',
                message: {
                    text: `The server didn't send any group data.`
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: {
                text: `The server didn't respond to show data on groups.`
            }
        };
    }
}

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
                message: {
                    text: `The server didn't send any notes.`
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'SET_MESSAGE',
            message: {
                text: `The server didn't respond.`
            }
        };
    }
}
