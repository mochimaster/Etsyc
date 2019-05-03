export const getListingsByCategory = (category, page=1) => {
    return $.ajax({
        method: 'GET',
        url: `/api/categories/${category}/?page=${page}`
    })
}