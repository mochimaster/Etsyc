export const getListingsByCategory = (
  category,
  page = 1,
  sort_option,
  filters
) => {
  return $.ajax({
    method: 'GET',
    url: `/api/categories/${category}/?page=${page}`,
    data: { sort: sort_option, filters }
  })
}
