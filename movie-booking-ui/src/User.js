
export const getUserName = () => {
    return window.localStorage.getItem('user_name')
}

export const setUserName = (name) => {
    return window.localStorage.setItem('user_name', name);
}

export const getUserRole = () => {
    return window.localStorage.getItem('user_role');
}

export const setUserRole = (role) => {
    return window.localStorage.setItem('user_role', role);
}

