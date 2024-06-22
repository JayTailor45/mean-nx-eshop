# E-Shop Frontend

The repository contains frontend code for eshop / e-commerce application. Backend code can be found [here](https://github.com/JayTailor45/eshop-backend).

### Features:

- Admin
  - View data such as orders, products, total sales etc... on the dashboard
  - `list` / `add` / `update` / `delete` products
  - `list` / `add` / `update` / `delete` categories
  - `list` orders and `update` order status
- User
  - Login into application
  - View products
  - View categories
  - Filter products by category
  - Add products to cart
  - Update product quantity of cart
  - Place order
  - Do online payment using stripe

### Technology used:

- Angular (UI framework)
- Typescript (Language)
- Stripe (Payment Gateway)
- PrimeNG (UI Library)
- NX Workspace (Mono Repo)
- JWT (Authentication and Authorization)
- Quill Editor (Rich Text)

### Code structure

- apps
  - eshop-admin - admin site
  - eshop-frontend - client site
- libs
  - orders - contains all the components and services of orders
  - products - contains all the components and services of products
  - users - contains all the components and services of users
  - ui - contains shared code
- styles
  - all the css styles

### Steps to run the project

1. Install **Node**
2. Clone project
3. Run `npm install`
4. Run ```npx nx serve eshop-frontend``` to start client app
5. Run ```npx nx serve eshop-admin``` to start admin app
6. Visit http://localhost:4200 to access client app
7. Visit http://localhost:4300 to access admin app
