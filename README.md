## Connect Sign in component with PostgreSQL

A user can sign in and JWT is generated.

---

## Setup

1. Clone the repo: `git clone https://github.com/cervus-camelopardalis/angular-pg-signin.git`
2. Create PostgreSQL database (see `database.sql` file)
3. Insert your database user and password (edit `db.js` file)
4. Install Express modules: `C:\Users\xxxxx\xxxxx\xxxxx\express-server>npm i`
5. Install Angular modules: `C:\Users\xxxxx\xxxxx\xxxxx\angular-client>npm i`
6. Start Express server: `C:\Users\xxxxx\xxxxx\xxxxx\express-server>nodemon server`
7. Run Angular app: `C:\Users\xxxxx\xxxxx\xxxxx\angular-client>ng serve -o`

---

## Screenshots

1. Sign up:

![Sign up](https://github.com/cervus-camelopardalis/angular-pg-signin/blob/main/01-screenshot-sign-up.gif)

2. Data inserted successfully:

![Success](https://github.com/cervus-camelopardalis/angular-pg-signin/blob/main/02-screenshot-postgres.png?raw=true)

3. Sign in (test API via Thunder Client):

![Sign in](https://github.com/cervus-camelopardalis/angular-pg-signin/blob/main/03-screenshot-thunder-client.gif)