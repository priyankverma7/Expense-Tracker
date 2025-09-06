import React, {createContext, useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Function to update user Data
    const updateUser = (userData) =>{
        setUser(userData);
    };

    //  Function to clear user data (e.g.., on logout)
    const clearUser = () =>{
        setUser(null);
    };
    return(
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser,
        }}
        >
        {children}
        </UserContext.Provider>
    );
}

export default UserProvider;