import axios from './axios';

export const noError = () => ({ type: 'NO_ERROR' });

export const logout = async () => {
    try {
        const resp = await axios.get('/api/logout');
        if (resp.data.success) {
            return {
                type: 'LOG_OUT',
                success: true
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'LOG_OUT',
            success: false,
            error: {
                message: `The server didn't respond.`
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
                success: true,
                data: { ...resp.data.user }
            };
        } else {
            return {};
        }
    } catch (err) {
        console.log(err);
        return {};
    }
}

export const login = async (alias, pw) => {
    try {
        const resp = await axios.post('/api/login', { alias, pw });
        if (resp.data.success) {
            return {
                type: 'LOG_IN',
                success: true,
                data: { ...resp.data.user }
            };
        } else {
            return {
                type: 'LOG_IN',
                success: false,
                error: {
                    message: 'Wrong mail or password. Please try again.',
                    messageRed: { color: 'red' }
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'LOG_IN',
            success: false,
            error: {
                message: `The server didn't respond.`,
                messageRed: { color: 'red' }
            }
        };
    }
}

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
                success: true,
                data: groups
            };
        } else {
            return {
                type: 'GET_GROUPS',
                success: false,
                error: {
                    message: `The server didn't send any group data.`
                }
            };
        }
    } catch (err) {
        console.log(err);
        return {
            type: 'GET_GROUPS',
            success: false,
            error: {
                message: `The server didn't respond.`
            }
        };
    }
}
