import { CONDITION } from '../../utils/constants'

export const getDisabledListingsByUserId = (
  userId,
  page = 1,
  sortOption = 'newest',
  filters = { condition: CONDITION.ALL },
  search = ''
) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/home?page=${page}`,
    data: { sort: sortOption, filters, search }
  })
}
