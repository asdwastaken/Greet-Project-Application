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
        closeCategoriesPopup } = useContext(context);


    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadMoreProducts();
    }, []);

    const loadMoreProducts = () => {
        if (!loading) {
            setLoading(true);
            getAllPerPage(pageNumber)
                .then((result) => {
                    setProducts((state) => [...state, ...result]);
                    setDescription((prevDescription) => [...prevDescription, ...result.map((x) => x.short_description)]);
                    setName((prevName) => [...prevName, ...result.map((x) => x.name)]);
                    setPageNumber(pageNumber + 1);
                    setLoading(false);
                });
        }
    };

    const [lastCardInViewRef, lastCardInView] = useInView({
        triggerOnce: true,
    });

    useEffect(() => {
        if (lastCardInView) {
            loadMoreProducts();
        }
    }, [lastCardInView]);

    const [pageNumber, setPageNumber] = useState(1);
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');




    return (
        <>
            <div className="catalog">
                {products.map((x, i) => {
                    if (i === products.length - 1) {
                        return (
                            <div key={x.id} className="card" ref={lastCardInViewRef}>
                                <div className="image-container">
                                    <img src={x.images[0].src} className="card-image" />
                                    <span dangerouslySetInnerHTML={{ __html: name[i] }}></span>
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
                                    <span dangerouslySetInnerHTML={{ __html: name[i] }}></span>
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