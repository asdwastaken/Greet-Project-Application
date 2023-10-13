import './catalog.css';
import { useContext, useEffect, useState } from 'react';
import { getAllPerPage } from '../../services/productService';
import { context } from '../../context/context';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';


export default function Catalog() {

    const { products,
        setProducts } = useContext(context);


    const [description, setDescription] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        getAllPerPage()
            .then((result) => {
                setProducts(result);
                setDescription(result.map(x => x.short_description));
                setName(result.map(x => x.name));
            })
    }, [])

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



    return (
        <div className="catalog">
            {products.map((x, i) => {
                return (
                    <div key={x.id} className="card">
                        <div className="image-container">
                            <img src={x.images[0].src} className="card-image" />
                            <span dangerouslySetInnerHTML={{ __html: name[i] }}></span>
                        </div>
                        <div className="description-container" onMouseLeave={() => closeDescriptionModal(x.id)}>
                            <span onMouseOver={() => toggleDescriptionModal(x.id)} >Description</span>
                            <div dangerouslySetInnerHTML={{ __html: description[i] }} className={x.toggledDescription ? "description-modal" : "description-modal hidden"}  ></div>
                        </div>
                        <div className="categories-container" onMouseLeave={() => closeCategoriesModal(x.id)}>
                            <span onMouseOver={() => toggleCategoriesModal(x.id)} >Categories</span>
                            <div className={x.toggledCategories ? "categories-modal" : "categories-modal hidden"} style={x.toggledCategories ? { display: "flex" } : {}}>
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
            })}

        </div >
    )
}