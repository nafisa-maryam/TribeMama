# CLAUDE.md

This file guides Claude Code (claude.ai/code) when working in this repository. See also [AGENTS.md](AGENTS.md) (Expo's own agent guidance: always check versioned Expo docs, use `npx expo install` for packages).

## What TribeMama is

A community app for motherhood: "Motherhood takes a village. Here's yours." It serves new moms, women considering motherhood, and motherhood service providers.

Planned features:
- **Community boards** by life stage (considering motherhood → life with a newborn).
- **Book trusted help**, searchable by zip code: babysitters/nannies, doulas, nutritionists, meal prep, physical trainers, therapists/coaches. All providers are verified.
- **One profile**: sign up once as a consumer or a service provider, with basic info, address and interests.
- Business model: first 2 bookings free, then a small fee per booking.
- **Not in MVP:** a shop for baby and mom products.

Design goals: simple, easy and fast ("for mom brains"). The MVP is the phone app only.

## Stack

- **Expo SDK 58** (React Native 0.88, React 19.3), **JavaScript**.
- **Expo Router** for navigation. Routes live in `src/app/`, and every file there is a screen.
- **Supabase** for auth (and later data). The client lives in `src/lib/supabase.js` and stores sessions in AsyncStorage. Config comes from `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local` (gitignored; template in `.env.example`). Only use the publishable key in the app, never a secret/service-role key.
- Sign-up calls `supabase.auth.signUp`, storing the full name in user metadata as `full_name`. Email confirmation is on in the Supabase project, so sign-up returns no session until the user confirms by email.

## Commands

```bash
npm install                 # install dependencies
npx expo start              # dev server; scan the QR code with Expo Go on a phone
npx expo install <package>  # add a package (picks SDK-compatible versions; never use plain npm install <pkg>)
npx expo-doctor             # check dependency/config problems
```

There is no test or lint setup yet.

## Architecture

```
src/
  app/            # Expo Router routes (screens only)
    _layout.js    # root Stack navigator + shared header styling
    index.js      # landing page (welcome, intro, "Get Started")
    sign-up.js    # sign-up form (full name, email, password)
  components/     # reusable UI (PrimaryButton, TextField)
  lib/supabase.js # Supabase client (import { supabase } from here)
  theme/colors.js # color palette + spacing scale; use these, don't hardcode colors
```

Planned screens: login (consumer vs. provider), community boards, and services list filtered by location.

## Design system

The palette in `src/theme/colors.js` comes from Figma's color combinations #2 Mossy Hollow, #9 Golden Taupe and #13 Desert Dusk: cream background `#FDFBD4`, olive primary `#636B2F`, dark moss text `#3D4127`, sage borders `#BAC095`, cognac accent `#A2574F`, dusty rose `#BF7587`. The tagline comes from the flyer; the flyer's visual design is deliberately not used.

## Gotchas

- **Don't keep the project in OneDrive.** OneDrive turns files in `node_modules` into cloud placeholders (reparse points). Metro can't resolve them and fails with `Unable to resolve module ./node_modules/expo-router/entry`. The same code bundles fine outside OneDrive.
- `react-dom` is pinned to `19.3.0` to match `react`. Expo Router pulls it in as a peer, and npm otherwise picks 19.3.1, which breaks `npm ci`.
- Dev machine is Windows: iOS builds need EAS (cloud) or a Mac. iOS testing works through Expo Go on a phone.
- GitHub remote: https://github.com/nafisa-maryam/TribeMama.git (branch `main`).
