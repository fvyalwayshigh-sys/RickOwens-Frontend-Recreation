# Rick Owens — Unofficial Frontend Recreation

An educational frontend recreation inspired by the visual style of the Rick Owens ecommerce experience. Built with React, Vite, React Router, and Tailwind CSS.

> This project is unofficial and is not affiliated with, sponsored by, or endorsed by Rick Owens. Product imagery, branding, and campaign media are included for educational demonstration only.

## Preview

![Homepage preview](image.png)

Additional screenshots: [image-1.png](image-1.png) · [image-2.png](image-2.png)

## Features

- Editorial homepage with campaign video sections
- Product collections for Bags, Shoes, FW26, Dr. Martens, and runway pieces
- Responsive navigation, search drawer, product grids, and filter/sort panel
- Shared cart and wishlist state persisted in browser `localStorage`
- Quantity controls, live bag count, and calculated subtotal/total
- Reusable wishlist notification with a link to the wishlist
- Account and create-account interface examples
- Responsive 404 page and React Router routing

## Routes

| Route         | Page                                  |
| ------------- | ------------------------------------- |
| `/`           | Redirects to `/home`                  |
| `/home`       | Editorial landing page                |
| `/homepage`   | Runway product collection             |
| `/bags`       | Bags product collection               |
| `/shoes`      | Shoes collection                      |
| `/fw26`       | FW26 collection                       |
| `/dr-martin`  | Dr. Martens collaboration collection  |
| `/bag`        | Shopping bag and order summary        |
| `/checkout`   | Shopping bag / checkout summary alias |
| `/wishlist`   | Saved products                        |
| `/account`    | Login interface mockup                |
| `/newaccount` | Account creation interface mockup     |

Unknown routes display the 404 page. `/menu` redirects to `/home`; the menu opens from the navigation bar.

## Run Locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Available scripts:

```sh
npm run lint
npm run build
npm run preview
```

`npm run preview` serves the generated production bundle from `dist/` for local production checks.

## Deploy to Vercel

Import the repository into Vercel and use the Vite defaults:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` rewrites app routes to `index.html`, allowing React Router routes to load directly and survive refreshes.

## Frontend-Only Limitations

Cart and wishlist data are stored in the current browser using `localStorage`; they are not associated with user accounts or synchronized between devices. Login, registration, payment, shipping, and order submission are not connected to a backend. Do not enter real account or payment information.

## Project Structure

```text
src/
  components/   Shared navigation, cards, collection media, and controls
  context/      Shared cart, wishlist, and notification state
  data/         Product records and collection configuration
  pages/        Route-level page components
  assets/       Product images and local media
public/         Static public assets
```

`node_modules/`, `dist/`, local environment files, and logs are excluded by `.gitignore`.
