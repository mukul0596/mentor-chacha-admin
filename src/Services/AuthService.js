const AuthService = {
    login: (admin) => {
        return fetch('http://localhost:5000/api/admin/login', {
            method: "post",
            body: JSON.stringify(admin),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated: false, user: {}, message: {msgBody: 'Invalid credentials!'} };
        });
    },

    logout: () => {
        return fetch('http://localhost:5000/api/admin/logout', {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        }).then(res => res.json())
        .then(data => data);
    },
    
    isAuthenticated: () => {
        return fetch('http://localhost:5000/api/admin/authenticated', {
            credentials: 'include',
            headers:{
                "accepts":"application/json"
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated: false };
        });
    }
}

export default AuthService;