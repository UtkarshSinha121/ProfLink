import { useNavigate } from "react-router-dom";

const { useContext } = require("react");
const { useState } = require("react");
const { createContext } = require("react");

//initialize context
 const UserContext = createContext();

 //create a provider
 export const  UserProvider = ({children}) => 
   {
   const navigate = useNavigate();
    // get user data from session and convert to js using 'JSON.parse()'
   // and store in state
     const [currentUser, setcurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
     );
     const [loggedIn, setloggedIn] = useState(currentUser !==null ? true : false);
     
     const logout = () => {
        sessionStorage.removeItem('user');
        setcurrentUser(null);
        setloggedIn(false);
        navigate('/login');
     }

    return <UserContext.Provider value={{ loggedIn, setloggedIn, logout}}>
           {children}
    </UserContext.Provider>
 }

 const useUserContext = () => useContext(UserContext);

 export default useUserContext;