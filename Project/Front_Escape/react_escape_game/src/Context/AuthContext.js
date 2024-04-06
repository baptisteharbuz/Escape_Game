// import React, { useState, useEffect } from 'react';

// const AuthContext = React.createContext({
//     isAuthenticated: null,
//     setIsAuthenticated: (value) => { },
//     user: null,
//     setUser: (value) => { },
// });

// export const AuthProvider = ({ children }) => {
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             setIsAuthenticated(true);
//             setUser(JSON.parse(localStorage.getItem('user')));
//         }
//     }, []);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;

import React from 'react';

export default React.createContext({
    isAuthenticated: null,
    setIsAuthenticated: (value) => { },
    user: null,
    setUser: (value) => { },
})