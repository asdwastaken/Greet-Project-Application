import { createContext, useState } from "react";


export const context = createContext();


export const ContextProvider = ({
    children
}) => {

    const [products, setProducts] = useState([]);

    const toggleDescriptionPopup = (id) => {
        setProducts(state => state.map(x => {
            if (x.id == id) {
                const updatedProduct = { ...x, toggledDescription: !x.toggledDescription };
                return updatedProduct;
            }
            return x;
        }))
    }


    const closeDescriptionPopup = (id) => {
        setProducts(state => state.map(x => {
            if (x.id == id) {
                const updatedProduct = { ...x, toggledDescription: false };
                return updatedProduct;
            }
            return x;
        }))
    }


    const toggleCategoriesPopup = (id) => {
        setProducts(state => state.map(x => {
            if (x.id == id) {
                const updatedProduct = { ...x, toggledCategories: !x.toggledCategories };
                return updatedProduct;
            }
            return x;
        }))
    }


    const closeCategoriesPopup = (id) => {
        setProducts(state => state.map(x => {
            if (x.id == id) {
                const updatedProduct = { ...x, toggledCategories: false };
                return updatedProduct;
            }
            return x;
        }))
    }


    const contextValues = {
        products,
        setProducts,
        toggleDescriptionPopup,
        closeDescriptionPopup,
        toggleCategoriesPopup,
        closeCategoriesPopup
    };


    return (
        <context.Provider value={contextValues}>
            {children}
        </context.Provider>
    )
}