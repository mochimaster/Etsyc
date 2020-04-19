export const getDisabledListingsByUserId = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `/api/users/${userId}/home`
    });
};
