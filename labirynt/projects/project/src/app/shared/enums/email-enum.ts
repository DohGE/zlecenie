export enum EmailEnum {
  emailNotFound = 'EMAIL_NOT_FOUND',
  invalidPassword = 'INVALID_PASSWORD',
  tooManyAttemptsTryLater = 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.',
  emailExists = 'EMAIL_EXISTS',
  fail = 'Request had invalid authentication credentials. Expected OAuth 2 access token, login cookie or other valid authentication credential. See https://developers.google.com/identity/sign-in/web/devconsole-project.',
}
