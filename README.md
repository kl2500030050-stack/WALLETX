# Moneta — Digital Wallet

A responsive digital-wallet frontend built with React, Vite, Tailwind CSS, React Router and Context API. All app data is stored in browser LocalStorage. No backend or database is used.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create a production build:

```bash
npm run build
npm run preview
```

## Demo behaviour

- Register with a name, email and password, or sign in with an account created in this browser.
- The app persists the demo account, session, wallet balance, transactions and theme in LocalStorage.
- Add money, withdraw, send/receive simulated transfers, make QR demo payments and pay sample bills.
- Transaction records are searchable, filterable and sortable. Receipt download creates a local text receipt.

## Important security note

This is a frontend-only demonstration, not a real financial product. LocalStorage is editable by the user and passwords are stored locally for demo convenience. Do not use real credentials, card details, bank information or real money. A production wallet requires a secure backend, password hashing, authentication/session controls, payment-provider integration, audit logging and regulatory/security review.
