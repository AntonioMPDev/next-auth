export const emailValidator = {
  maxLength: (v: string) =>
    v.length <= 50 || 'The email should have at most 50 characters',
  matchPattern: (v: string) =>
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    'Email address must be a valid address',
};