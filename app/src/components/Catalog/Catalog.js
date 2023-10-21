import './catalog.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { getAllPerPage } from '../../services/productService';
import { context } from '../../context/context';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useInView } from 'react-intersection-observer';
import { RotatingLines } from 'react-loader-spinner';

export default function Catalog() {

    const { products,
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
         } = useContext(context);



    const [lastCardInViewRef, lastCardInView] = useInView({
        triggerOnce: true,
    });



    useEffect(() => {
        loadMoreProducts();
    }, []);

    useEffect(() => {
        if (lastCardInView) {
            loadMoreProducts();
        }
    }, [lastCardInView]);


    const loadMoreProducts = () => {
        if (!loading) {
            setLoading(true);
            getAllPerPage(pageNumber)
                .then((result) => {
                    setProducts((state) => [...state, ...result]);
                    setDescription((prevDescription) => [...prevDescription, ...result.map((x) => x.short_description)]);
                    setNames((prevNames) => [...prevNames, ...result.map((x) => x.name)]);
                    setPageNumber(pageNumber + 1);
                    setLoading(false);
                });
        }
    };







    return (
        <>
            <div className="sort-filter-container">
                <div className="dropdown-sort">
                    <form onSubmit={sortProducts}>
                        <select className="form-select" value={selectedSortOption} onChange={onSortChangeHandler}>
                            <option value="" selected disabled>Sort</option>
                            <option value="ascending">Name Ascending</option>
                            <option value="descending">Name Descending</option>
                            <option value="price_ascending">Price Ascending</option>
                            <option value="price_descending">Price Descending</option>
                        </select>
                    </form>
                </div>

                <div className="dropdown-filter">
                    <div className="filter-container">
                        <form onSubmit={filterProducts}>
                            <div className="dropdown">
                                <button className="filter-btn form-select" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Filter
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="influencers"
                                            value={filterInputValues.influencers}
                                            onChange={onFilterChangeHandler}
                                            checked={filterInputValues.influencers} />
                                        <label className="form-check-label" htmlFor="influencers">
                                            Influencers
                                        </label>
                                    </li>

                                    <li>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="athletes"
                                            value={filterInputValues.athletes}
                                            onChange={onFilterChangeHandler}
                                            checked={filterInputValues.athletes} />
                                        <label className="form-check-label" htmlFor="athletes">
                                            Athletes
                                        </label>
                                    </li>

                                    <li>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="models"
                                            value={filterInputValues.models}
                                            onChange={onFilterChangeHandler}
                                            checked={filterInputValues.models} />
                                        <label className="form-check-label" htmlFor="models">
                                            Models
                                        </label>
                                    </li>

                                    <li>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="new-talents"
                                            value={filterInputValues["new-talents"]}
                                            onChange={onFilterChangeHandler}
                                            checked={filterInputValues["new-talents"]} />
                                        <label className="form-check-label" htmlFor="new-talents">
                                            New Talents
                                        </label>
                                    </li>

                                    <li>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            name="music"
                                            value={filterInputValues.music}
                                            onChange={onFilterChangeHandler}
                                            checked={filterInputValues.music} />
                                        <label className="form-check-label" htmlFor="music">
                                            Music
                                        </label>
                                    </li>
                                    <li>
                                        <input type="submit" value="Apply Filters" className="filters-action-btn" />
                                        <input type="button" value="Reset Filters" className="filters-action-btn" id="filter-reset-btn" onClick={resetFilters} />
                                    </li>

                                </ul>

                            </div>

                        </form>

                    </div>
                </div>
            </div>


            {loadingTop &&
                <div className="loading-container-top">
                    <RotatingLines
                        strokeColor="#7d86c8"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </div>
            }
            
            <div className="catalog">
                {products.map((x, i) => {
                    if (i === products.length - 1 && Object.values(filterInputValues).every(x => x === false)) {
                        return (
                            <div key={x.id} className="card" ref={lastCardInViewRef}>
                                <div className="image-container">
                                    <img src={x.images[0].src} className="card-image" />
                                    <span dangerouslySetInnerHTML={{ __html: names[i] }}></span>
                                </div>
                                <div className="description-container" onMouseLeave={() => closeDescriptionPopup(x.id)}>
                                    <span onMouseOver={() => toggleDescriptionPopup(x.id)} onClick={() => toggleDescriptionPopup(x.id)}>Description</span>
                                    <div dangerouslySetInnerHTML={{ __html: description[i] }} className={x.toggledDescription ? "description-popup" : "description-popup hidden"}  ></div>
                                </div>
                                <div className="categories-container" onMouseLeave={() => closeCategoriesPopup(x.id)}>
                                    <span onMouseOver={() => toggleCategoriesPopup(x.id)} onClick={() => toggleCategoriesPopup(x.id)}>Categories</span>
                                    <div className={x.toggledCategories ? "categories-popup" : "categories-popup hidden"} style={x.toggledCategories ? { display: "flex" } : {}}>
                                        {x.categories.map(category => {
                                            return (
                                                <Link key={category.id} to={category.link}>{category.name} </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='button-container'>
                                    <Button path='https://greet.bg/?add-to-cart=5589' value='Add To Cart' />
                                </div>
                            </div>

                        )
                    } else {
                        return (

                            <div key={x.id} className="card">
                                <div className="image-container">
                                    <img src={x.images[0].src} className="card-image" />
                                    <span dangerouslySetInnerHTML={{ __html: names[i] }}></span>
                                </div>
                                <div className="description-container" onMouseLeave={() => closeDescriptionPopup(x.id)} >
                                    <span onMouseOver={() => toggleDescriptionPopup(x.id)} onClick={() => toggleDescriptionPopup(x.id)}>Description</span>
                                    <div dangerouslySetInnerHTML={{ __html: description[i] }} className={x.toggledDescription ? "description-popup" : "description-popup hidden"}  ></div>
                                </div>
                                <div className="categories-container" onMouseLeave={() => closeCategoriesPopup(x.id)}>
                                    <span onMouseOver={() => toggleCategoriesPopup(x.id)} onClick={() => toggleCategoriesPopup(x.id)}>Categories</span>
                                    <div className={x.toggledCategories ? "categories-popup" : "categories-popup hidden"} style={x.toggledCategories ? { display: "flex" } : {}}>
                                        {x.categories.map(category => {
                                            return (
                                                <Link key={category.id} to={category.link}>{category.name} </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className='button-container'>
                                    <Button path='https://greet.bg/?add-to-cart=5589' value='Add To Cart' />
                                </div>
                            </div>
                        )
                    }
                })}
            </div >

            {loading &&
                <div className="loading-container">
                    <RotatingLines
                        strokeColor="#7d86c8"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </div>
            }

        </>
    )
}