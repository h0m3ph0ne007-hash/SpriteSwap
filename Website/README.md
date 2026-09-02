# SpriteSwap V13

Deploy the `Website` folder.

## V13 fixes
- Fixed Sprite image URLs using the current Sprite Trading asset versions.
- Added a stronger cyan/violet/lime neon logo and favicon.
- Added glowing active/hover navigation tabs.
- Fixed notification layering so the notification panel stays above profile/collection cards.
- Fixed **Mark all as read**.
- Added **Enable alerts** browser-notification control in the notification panel.
- Added service-worker notification handling so the PWA is ready for push notifications when a push backend is connected.
- Improved local online presence across tabs/windows with heartbeat cleanup.
- Profile now stays a profile; **Create account** routes to the account/signup screen.
- Successful local account creation/sign-in routes back to the profile.
- Added `?mode=login` / `?mode=signup` support on account page.
- Updated the logo/favicon to match the current site colors.

### Important
Browser notifications can alert while SpriteSwap is open or running in the background. True notifications after the site/browser is fully closed require a push service/backend (VAPID + server endpoint). The service worker is prepared for that later connection.

## V14
Added real local trade offers (send/accept/decline), clickable Sprite detail views, daily challenges, collector badges, a cleaner less-AI visual treatment, and a Trade Offers button on the Trades page. Data remains local-browser until a shared backend is connected.

## V17 backend setup
The site now includes a Supabase backend bridge. It stays in local mode until real Supabase values are placed in `Website/supabase-config.js` (and `App/supabase-config.js`). Run `supabase-schema.sql` once in the Supabase SQL Editor, then paste the project's URL and publishable key into the config. The bridge syncs open trades and signed-in notifications/offers while keeping local fallback if the backend is not configured.
