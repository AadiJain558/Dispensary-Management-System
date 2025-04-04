import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [atoken, setAtoken] = useState(localStorage.getItem('adminToken') || null)
    const backendurl = import.meta.env.VITE_API_URL
    const value = {
        atoken,
        setAtoken,
        backendurl,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;
