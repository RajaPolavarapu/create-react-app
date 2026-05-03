import admin from 'firebase-admin';

if (!admin.apps.length && process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)) });
}

export const optionalAuth = async (req, _res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (token) {
    try { req.user = await admin.auth().verifyIdToken(token); } catch { req.user = null; }
  }
  next();
};
