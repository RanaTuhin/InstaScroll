# InstaClone (learning project)        

An Instagram-style UI clone built with **React Native + Expo + Expo Router**.    
    
This project is intentionally **backend-free**: it uses mock data + an in-memory store so you can focus on learning UI, navigation, and state.

## Run it 
 
```bash 
npm install
npx expo start
```
 
## What’s included   

- Home feed: stories row + post cards (like/comment UI)
- Post detail: view + add comments
- Search: explore grid + basic search filtering
- Reels: vertical “pager” using images (no video)
- Activity: notifications list
- Profile: stats + post grid
- Create post: modal that adds a local post

## Where to look in code (start here)

- Navigation: `app/_layout.tsx`, `app/(tabs)/_layout.tsx`
- Screens: `app/(tabs)/*`, `app/post/[id].tsx`, `app/create-post.tsx`
- UI components: `components/ig/*`
- Data types + mock data: `data/instagram-mock.ts`
- State/store (Context + reducer): `state/ig-store.tsx`
- Theme tokens: `constants/theme.ts`

## Learning path (docs)

Read these in order (each one is short and points to real files):

1. `docs/01-overview.md`
2. `docs/02-routing-and-navigation.md`
3. `docs/03-state-and-data.md`
4. `docs/04-ui-patterns.md`
5. `docs/05-exercises.md`
