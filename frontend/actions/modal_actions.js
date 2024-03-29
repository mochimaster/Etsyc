export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const openModal = (modal, images, currentIndex) => {
  return {
    type: OPEN_MODAL,
    modal,
    images,
    currentIndex
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}
