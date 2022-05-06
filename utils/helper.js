export const addMobileClassName = (string) =>
  isMobile ? `${string} ${string}-mobile` : string
