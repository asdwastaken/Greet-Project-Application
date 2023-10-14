import { createContext, useState } from "react";


export const context = createContext();


export const ContextProvider = ({
    children
}) => {

    const [products, setProducts] = useState([]);

    const toggleDescriptionModal = (id) => {
        setProducts(state => state.map(x => {
            if (x.id == id) {
                const updatedProduct = { ...x, toggledDescription: !x.toggledDescription };
                return updatedProduct;
            }
            return x;
        }))
    }


    const closeDescriptionModal = (id) => {
        setProducts(state => state.map(x => {
            if (x.id == id) {
                const updatedProduct = { ...x, toggledDescription: false };
                return updatedProduct;
            }
            return x;
        }))
    }


    const toggleCategoriesModal = (id) => {
        setProducts(state => state.map(x => {
            if (x.id == id) {
                const updatedProduct = { ...x, toggledCategories: !x.toggledCategories };
                return updatedProduct;
            }
            return x;
        }))
    }


    const closeCategoriesModal = (id) => {
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
        toggleDescriptionModal,
        closeDescriptionModal,
        toggleCategoriesModal,
        closeCategoriesModal
    };


    return (
        <context.Provider value={contextValues}>
            {children}
        </context.Provider>
    )
}