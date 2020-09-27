export const trackEvent = ({ eventName, eventProperties }) => {
  if (mixpanel) {
    mixpanel.track(eventName, eventProperties)
  }
}

export const identifyUser = ({ userEmail, merchant_name, phone_number }) => {
  if (mixpanel) {
    mixpanel.identify(userEmail)

    mixpanel.people.set({
      $email: userEmail, // only reserved properties need the $
      USER_ID: userEmail,
      merchant_name,
      phone_number
    })
  }
}

export const EVENTS = {
  SEARCH_PRODUCT: 'Search Product',
  SET_PAGINATION: 'Set Pagination',
  ENLARGE_IMAGE: 'Enlarge Image',
  ADD_TO_CART: 'Add to Cart',
  SELL_ON_HERE: 'Sell on Here',
  SET_FILTER_BY_CONDITION: 'Set Filter By Condition',
  SET_SORT: 'Set Sort',
  SET_CATEGORY: 'Set Category'
}
