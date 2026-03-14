/**
 * Web stub for @react-native-google-signin/google-signin
 * On web, Google Sign-In is handled via Google Identity Services (GSI)
 * loaded in index.html — not via this native SDK.
 * This stub prevents webpack from warning about the unresolved native package.
 */
const GoogleSignin = {
  configure: () => {},
  hasPlayServices: async () => true,
  signIn: async () => { throw new Error('Use web Google Sign-In flow'); },
  signOut: async () => {},
  isSignedIn: async () => false,
  getCurrentUser: () => null,
};

const statusCodes = {
  SIGN_IN_CANCELLED: 'SIGN_IN_CANCELLED',
  IN_PROGRESS: 'IN_PROGRESS',
  PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE',
  SIGN_IN_REQUIRED: 'SIGN_IN_REQUIRED',
};

module.exports = { GoogleSignin, statusCodes };
