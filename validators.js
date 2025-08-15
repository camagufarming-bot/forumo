export function isStrongPassword(pw) {
  // minimum 8 characters, one upper, one lower, one number, one special
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(pw);
}
