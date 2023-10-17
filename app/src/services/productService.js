const url = 'https://greet.bg/wp-json/wc/store/products';




export const getAllPerPage = (pageNumber) => {
    return fetch(`${url}?page=${pageNumber}`)
        .then(res => res.json())
        .then(products => {
            return products;
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        })
}
