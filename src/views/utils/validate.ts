export const validatePassword = (password: string): string => {
  if (password === '') {
    return 'Password should not be empty'
  }
  if (password.length <= 6) {
    return 'Password should be longer than 6'
  }
  return ''
}

export const validatePasswordAgain = (password: string) => (passwordAgain: string) => {
  if (password === '') {
    return 'Confirm Password should not be empty'
  }
  if (password !== passwordAgain) {
    return 'Password not match'
  }
  return ''
}

export const validateCheckboxRequire = (checked: boolean): string => {
  if (!checked) {
    return 'Please check'
  }
  return ''
}
