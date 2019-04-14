export const getListingsByCategory = (category) => {
    return $.ajax({
        method: 'GET',
        url: `/api/categories/${category}`
    })
}