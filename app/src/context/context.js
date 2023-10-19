import { createContext, useState } from "react";


export const context = createContext();


export const ContextProvider = ({
    children
}) => {

    const [products, setProducts] = useState([]);

    const [pageNumber, setPageNumber] = useState(1);
    const [names, setNames] = useState([]);
    const [description, setDescription] = useState([]);


    const [selectedSortOption, setSelectedSortOption] = useState('');


    const sortProducts = (option) => {
        const sortedProducts = [...products];
        const sortedNames = [...names];
        const updatedDescription = [];


        switch (option) {
            case 'ascending':
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                sortedNames.sort((a, b) => a.localeCompare(b));
                sortedProducts.forEach(x => updatedDescription.push(x.short_description));
                break;
            case 'descending':
                sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
                sortedNames.sort((a, b) => b.localeCompare(a));
                sortedProducts.forEach(x => updatedDescription.push(x.short_description));
                break;
        }
        setProducts(sortedProducts);
        setNames(sortedNames);
        setDescription(updatedDescription);
    };


    const onSortChangeHandler = (e) => {
        const selectedOption = e.target.value;
        setSelectedSortOption(selectedOption);
        sortProducts(selectedOption);
    }

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
        closeCategoriesPopup,
        names,
        setNames,
        description,
        setDescription,
        pageNumber,
        setPageNumber,
        selectedSortOption,
        onSortChangeHandler,
        sortProducts
    };


    return (
        <context.Provider value={contextValues}>
            {children}
        </context.Provider>
    )
}