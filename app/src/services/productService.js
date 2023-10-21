const url = 'https://greet.bg/wp-json/wc/store/products';




export const getAllPerPage = (pageNumber) => {
    return fetch(`${url}?page=${pageNumber}`)
        .then(res => res.json())
        .then(products => {
            if (products.length !== 0) {
                return products;
            }
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        })
}


export const getAll = (offset) => {
    return fetch(`${url}?per_page=100&offset=${offset}`)
        .then(res => res.json())
        .then(products => {
            return products;
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        })
}
