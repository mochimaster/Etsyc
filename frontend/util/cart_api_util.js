export const createCart = cart => {
  // debugger
  return $.ajax({
    method: 'POST',
    url: `/api/users/${cart.user_id}/carts`,
    data: {cart:cart}
  });
};

export const updateCart = cart => {
  // debugger
  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${cart.user_id}/carts/${cart.id}`,
    data: {cart:cart}
  });
};

// MIGHT NOT NEED
export const getCart = cart => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${cart.user_id}/carts/${cart.id}`
  });
};

export const getCarts = (user_id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${user_id}/carts`
  });
};

export const deleteCart = (cart) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/users/${cart.user_id}/carts/${cart.id}`,
    data: {cart: cart}
  });
};
