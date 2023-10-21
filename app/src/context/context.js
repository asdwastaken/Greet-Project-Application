import { createContext, useState } from "react";
import { getAll } from "../services/productService";


export const context = createContext();


export const ContextProvider = ({
    children
}) => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingTop, setLoadingTop] = useState(false);



    const [pageNumber, setPageNumber] = useState(1);
    const [names, setNames] = useState([]);
    const [description, setDescription] = useState([]);
    const [selectedSortOption, setSelectedSortOption] = useState('');

    const [filterInputValues, setFilterInputValues] = useState({
        influencers: false,
        athletes: false,
        models: false,
        "new-talents": false,
        music: false,
    })

    const onFilterChangeHandler = (e) => {
        setFilterInputValues(state => ({ ...state, [e.target.name]: !state[e.target.name] }))
    }

    const filterProducts = async (e) => {
        e.preventDefault();

            setLoadingTop(true);

            let allProducts = [];
            const updatedProducts = [];
            const filterEntries = Object.entries(filterInputValues);

            const selectedFilterValues = filterEntries.map(x => {
                if (x[1]) {
                    return x[0];
                }
            })

            if (selectedFilterValues.every(x => x === undefined)) {
                setLoadingTop(false);
                return;
            }


            const offset = 0;

            for (let index = 0; index < 10; index++) {
                try {
                    const res = await getAll((index + offset) * 100);

                    if (res.length === 0) {
                        break;
                    }

                    allProducts = [...allProducts, ...res];

                } catch (error) {
                    console.log(`Error:${error}`);
                    break;
                }
            }


            allProducts.map(product => {
                const categories = product.categories.map(category => category.slug);
                categories.map(x => {
                    if (selectedFilterValues.includes(x) && !updatedProducts.includes(product)) {
                        updatedProducts.push(product);
                    }
                })
            })

            setProducts(updatedProducts);
            setNames(updatedProducts.map(x => x.name))
            setDescription(updatedProducts.map(x => x.short_description))
            setLoadingTop(false);

    }

    const resetFilters = () => {
        setFilterInputValues({
            influencers: false,
            athletes: false,
            models: false,
            "new-talents": false,
            music: false,
        })
    }

    const sortProducts = (option) => {
        const sortedProducts = [...products];
        let sortedNames = [...names];
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

            case 'price_ascending':
                sortedNames = [];
                sortedProducts.sort((a, b) => a.prices.price - b.prices.price);
                sortedProducts.forEach(x => sortedNames.push(x.name));
                sortedProducts.forEach(x => updatedDescription.push(x.short_description));
                break;
            case 'price_descending':
                sortedNames = [];
                sortedProducts.sort((a, b) => b.prices.price - a.prices.price);
                sortedProducts.forEach(x => sortedNames.push(x.name));
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
        sortProducts,
        filterInputValues,
        onFilterChangeHandler,
        filterProducts,
        resetFilters,
        loading,
        setLoading,
        loadingTop,
        setLoadingTop
    };


    return (
        <context.Provider value={contextValues}>
            {children}
        </context.Provider>
    )
}