# E-Shop Frontend

The repository contains frontend code for eshop / e-commerce application. Backend code can be found [here](https://github.com/JayTailor45/eshop-backend).

![client landing page](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Eshop%20Frontend.jpeg)

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

### Screenshots

#### Admin Dashboard

![admin dashboard](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Screenshot%202024-06-22%20at%205.53.00%E2%80%AFPM.png)

#### Admin product listing

![admin products listing](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Screenshot%202024-06-22%20at%205.53.09%E2%80%AFPM.png)

#### Admin category listing

![admin category listing](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Screenshot%202024-06-22%20at%205.54.44%E2%80%AFPM.png)

#### Admin order listing

![admin order listing](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Screenshot%202024-06-22%20at%205.54.58%E2%80%AFPM.png)

#### Admin order details

![admin order details](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Screenshot%202024-06-22%20at%205.55.06%E2%80%AFPM.png)

---

#### Client landing page

![client landing page](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Eshop%20Frontend.jpeg)

#### Client filter products by category

![client filter products by category page](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Screenshot%202024-06-22%20at%206.01.26%E2%80%AFPM.png)

#### Client shopping cart page

![client shopping cart page](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Screenshot%202024-06-22%20at%206.02.10%E2%80%AFPM.png)

#### Client order Detail page

![client order Detail page](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Screenshot%202024-06-22%20at%206.02.17%E2%80%AFPM.png)

#### Client order payment page

![client order payment page](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Screenshot%202024-06-22%20at%206.03.32%E2%80%AFPM.png)

#### Client order success page

![client order success page](https://raw.githubusercontent.com/JayTailor45/mean-nx-eshop/main/screenshots/Screenshot%202024-06-22%20at%206.03.38%E2%80%AFPM.png)
