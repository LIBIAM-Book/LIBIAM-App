import { useContext, useDebugValue } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
    const { cred } = useContext(AuthContext);
    useDebugValue(cred, cred => cred?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;