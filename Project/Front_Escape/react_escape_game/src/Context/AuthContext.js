import React from 'react';

export default React.createContext({
    isAuthenticated: null,
    setIsAuthenticated: (value) => { },
    user: null,
    setUser: (value) => { },
})