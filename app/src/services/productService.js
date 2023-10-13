const url = 'https://greet.bg/wp-json/wc/store/products';




export const getAllPerPage = () => {
    return fetch(url)
        .then(res => res.json())
        .then(products => {
            console.log(products);
            return products;
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        })
}
