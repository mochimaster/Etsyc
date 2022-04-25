import { CONDITION } from '../../utils/constants'

export const getDisabledListingsByUserId = (
  userId,
  page = 1,
  sortOption = 'newest',
  filters = { condition: CONDITION.ALL },
  search = ''
) => {
  console.log('getDisabledListings search :', search)
  return $.ajax({
    method: 'GET',
    url: `/api/users/${userId}/home?page=${page}`,
    data: { sort: sortOption, filters, search }
  })
}

export const resetPassword = (credential) =>
  $.ajax({
    method: 'POST',
    url: `/api/users/${credential.userId}/reset`,
    data: { ...credential },
    success: (response, _, { status }) => ({
      response,
      status
    }),
    error: (error) => error
  })
