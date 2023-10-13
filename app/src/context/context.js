import { createContext, useState } from "react";


export const context = createContext();


export const ContextProvider = ({
    children
}) => {

    const [products, setProducts] = useState([]);

    const contextValues = {
        products,
        setProducts
    };


    return (
        <context.Provider value={contextValues}>
            {children}
        </context.Provider>
    )
}