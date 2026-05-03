# InnerLight Spiritual Digital Store

Production-ready full-stack starter to sell spiritual PDFs, audio chanting packs, and courses.

## Stack
- Frontend: React + TypeScript + Tailwind + React Router (Vite)
- Backend: Node.js + Express + MongoDB
- Auth: Firebase Google login
- Payments: Razorpay (order creation + signature verification + webhook)
- Storage: Firebase Storage (configure signed/private URLs)

## Features Implemented
- Google auth flow on frontend
- Product catalog and individual product page
- One-page Razorpay checkout UX with guest checkout support
- Coupon code support (`WELCOME10`)
- Secure backend signature verification + captured status enforcement
- Razorpay webhook handling for captured/failed payments
- Purchase tracking in MongoDB
- Product models for PDF, AUDIO, COURSE (including lessons)
- Access-lock UX for non-purchasers
- Audio player with play/pause/seek/loop/playlist switching
- Admin panel scaffold
- SEO basics (meta description + slug fields), mobile-first layout, lazy-loaded routes ready

## Environment Variables
### server/.env
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/innerlight
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=xxx
RAZORPAY_WEBHOOK_SECRET=xxx
FIREBASE_SERVICE_ACCOUNT_JSON={...}
```

### client/.env
```
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=rzp_test_xxx
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Run Locally
```bash
npm install
npm install -w client
npm install -w server
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

## Razorpay Flow
1. Frontend calls `POST /api/create-order` with `productId`
2. Backend creates Razorpay order and logs a `Purchase(status=created)`
3. Frontend opens Razorpay checkout and receives payment response
4. Frontend posts to `POST /api/verify-payment`
5. Backend verifies HMAC signature and checks payment status is `captured`
6. Webhook `POST /api/webhook/razorpay` keeps final status synchronized

## Secure File Access Best Practice
- Store files in Firebase Storage private buckets.
- On authorized request, generate short-lived signed URLs from backend.
- Never expose permanent public file URLs for premium content.

## Scaling to Mobile App (Bonus)
- Reuse backend APIs in React Native/Flutter app.
- Replace web Firebase auth with native SDK.
- Use Razorpay native SDK for better conversion and UPI intent handling.
- Cache product metadata with offline-first query client.

## Adding Subscription Later (Bonus)
- Create subscription plans in Razorpay dashboard.
- Add `POST /create-subscription` endpoint.
- Save `subscription_id`, billing cycle dates, and status in MongoDB.
- Process recurring webhooks (`subscription.charged`, `payment.failed`) and gate access by active subscription state.
