<!-- WEB APP-->

Quick Comments:
- The UI is not 100% ready. I tried to do as much as possible but not enough time. Creating new board button, default board, logging out styling. 
- I used Angular Material for my Dialogs. Im not sure if its allowed since Angular Material library (as a base). If I could use the library I would have used it for more components like buttons, inputs, select etc. It would have made the UI look much better and more consistent.
- In general with more time I could produce something much better but since I had to do both frontend and backend from zero without knowing the technologies I had to use I'm pretty happy with the result.


### Total Time Spent on the project:
[![wakatime](https://wakatime.com/badge/user/9c6d3438-07a5-4cbc-b6eb-3407ab50b4a8/project/83cbc258-b146-4dd5-8628-8e3b0f54e807.svg)](https://wakatime.com/badge/user/9c6d3438-07a5-4cbc-b6eb-3407ab50b4a8/project/83cbc258-b146-4dd5-8628-8e3b0f54e807)

# How to Run the Web APP

## Create ENV FILE
Go to the root folder and create a file called .env and add the following content:

```js
NODE_ENV=development

DB_USERNAME="postgres"
DB_PASSWORD="postgres"
DB_NAME="mydb"
DB_HOST="localhost"
DB_PORT=5432
DB_SEEDER="false"
DB_SYNCRONIZE="true"
```



## To install nx globally

https://nx.dev/docs/getting-started/installation

```
- npm add --global nx
- MacOS: brew install nx
```

## Docker

To run docker go to the root folder called monorepo and run the following command:

```js
 $ docker-compose up -d
```

## To run the frontend and backend

To run both frontend and backend, go to the root folder called monorepo and run the following command:

```js
 $ npm run dev
```

## To populate the database with seed data
```
npm run seed:run populate-db.ts
```


# Database
 ## Tables
- User
  - id (primary key) -> uuid
  - email -> string
  - password -> string
  - created_at -> Date
  
- Board
    - id (primary key) -> number
    - name -> string
    - description -> string
    - user_id (foreign key to User)
    - isDefault -> boolean

- Task
    - id (primary key) -> number
    - name -> string
    - description -> string
    - icon -> string
    - status (ToDo, InProgress, Completed, WontDo) -> enum
    - board_id (foreign key to Board)

- User_Board -> **If a board can have multiple users (Many-To-Many relation)**
    - user_id (foreign key to User)
    - board_id (foreign key to Board)



# References
- https://nx.dev/ - For monorepo structure and best practices
- https://angular.dev/ - For Angular documentation and resources
- https://docs.nestjs.com/ - For NestJS documentation and resources
- [Organizing nestjs folder structure](https://medium.com/@handi7.co/organizing-your-nestjs-code-the-ultimate-guide-to-scalable-folder-structures-%EF%B8%8F-7fcb54fb1863)
- typeorm.io - For TypeORM documentation and resources
- [Nestjs-typeorm-Postgress](https://dev.to/refifauzan/nestjs-with-typeorm-and-postgresql-3466)
- [Nest-js encrypting password](https://medium.com/@awaisshaikh94/encrypting-passwords-in-nestjs-with-the-robust-hashing-mechanism-of-bcrypt-e052c7a499a3)
- [Connect PostgreSQL to NestJS using TypeORM and View Data in PgAdmin](https://www.youtube.com/watch?v=PP6SfHZE1uE)
- [Building a Login and Registration System Using NestJS with TypeORM and PostgreSQL](https://dev.to/buildwithgagan/building-a-login-and-registration-system-using-nestjs-with-typeorm-and-postgresql-19hh)
- [Cookie refresh token](https://stackoverflow.com/questions/79405724/refresh-token-coming-from-nest-js-as-cookie-does-not-get-persisted-after-refresh)
- [nestjs-jwt-authentication-refresh-token](https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token)
- [Helpful Github for token authentication](https://github.com/elvisduru/token-auth-app)
- [Frontend angular-auth](https://blog.lunatech.com/posts/2025-05-06-part-3%3A-frontend-setup-with-angular)
- [Select for board](https://angular.dev/guide/aria/select#basic-select)
- [CRUD example with NestJs](https://bhargavacharyb.medium.com/nestjs-6-crud-operations-in-nestjs-using-typeorm-an-e-commerce-example-fcbd287ad97f)
- [Angular Icons](https://ng-icons.github.io/ng-icons/#/getting-started)
- [Angular Dialog](https://material.angular.dev/components/dialog/examples)
- [Event Emits](https://angular.dev/guide/components/outputs)

# Roadmap
- [x] Create DB tables and relations
- [x] Auth must be JWT token based. Use symetric signing (HS256) and produce Access Token + Refresh Token pair. 
- [x] Use bcrypt to hash user passwords before saving the to the database.
- [x] Sign-up/sign-in page
- [x] New sign-up a new `default` board is created and saved to the database for the user.
- [x] Default board includes 4 default tasks (similar to the design).
- [x] Users are always presented with the default board but can create new boards or switch to existing ones. Each board can be accessed by a unique id, e.g: /board/:board-id, also allowing the user to switch to a different board by using the address bar directly.
- [x] Users can change their default board.
- [x] Users can edit board name and optionally, board description as well.
- [x] Users can edit task name, description, icon, and status.
- [x] When users select `Add new task` option, a new task is added with a default name (no form dialog).
- [x] A Readme.md with detailed instructions on how to run the project or any information that the reviewer will need to know.
- [x] A docker-compose.yml file that will allow us to bootrstap the entire solution (including Database) easily with Docker.
- [x] Your API endpoints must follow the REST architectural style.
- [x] API must include migrations and/or seeders to allow populating the Database. 
- [x] Users can delete tasks by clicking a `Delete` button (confirmation dialog must appear).
- [ ] **Bonus**: When a board is selected, instead of showing a flat list of tasks, organize the tasks in columns (ToDo, InProgress, Completed, WontDo) and allow users to drag-and-drop tasks to a different column to easily change their status.


# Improvements
-  Pass refresh token using cookies to be more secure and prevent XSS attacks (Cross-Site-Scripting).
-  Incase a board doesnt exists redirect user to the default board instead of showing home page without a board
-  Delete board. If the deleted board was default make the next one default.
- Toast notifications when we create new board, updating tasks etc.
  
# How to Run a migration / seeding

```js
npm run migration:generate backend/src/database/migrations/CreateUserTable
```

- It generate this file timestamp-CreateUserTable.ts
- After you generate the file migration now you can run the migration by this command:

```js
npm run migration:run
```
- If you want to create seeder you can use this command:

```js
npm run seed:create -n backend/src/database/seeds/users
```
- It will generate this file timestamp-users.ts
```js
npm run seed:run <timestamp>-users.js
```

# Backend Structure
Breaking Down the Structure
Let’s look at the role of each top-level directory:

## 1. modules/
This is the heart of your application. Each sub-directory represents a self-contained feature or business domain.

*.module.ts: Defines the module for the feature, importing the controller and registering providers (services).
*.controller.ts: Handles routing, receives requests, and calls the service.
*.service.ts: Contains all the complex business logic.
entities/: (If using an ORM like TypeORM) Contains the data model definitions or database schemas.
dto/ (Data Transfer Object): Contains classes that define the "shape" of data sent between the client 33 and server. This is crucial for validation.

## 2. common/
This folder is your project’s “toolbox.” All reusable components, functions, or classes that can be used across multiple features are placed here. Examples include a custom decorator to get user data from a request, or an exception filter to handle errors consistently across the entire application.

## 3. config/
Never hardcode database credentials or API keys. NestJS has an excellent @nestjs/config module for managing environment variables. This folder is the place to house all that configuration logic.

## 4. database/
If your project uses database migrations or seeding, this folder is the perfect place to keep them organized and separate from your application logic.


# Example of getting all the boards for a user

- Tips: Use Angular's resource to manage the state of your data fetching. This allows you to easily handle loading states, errors, and caching.
- For logging use effect inside a constructor


```js
export class Home {
	private auth = inject(Auth);
	private router = inject(Router);
	private boardService = inject(Board);

	userId = JSON.parse(localStorage.getItem("user") || "null");
	boardsResource = resource({
		params: () => ({ id: this.userId }),
		loader: (params) => this.boardService.getAllBoards(params.params.id),
		defaultValue: [],
	});

	boards = computed(() => this.boardsResource.value());

	onLogout() {
		this.auth.logout().subscribe(() => {
			this.router.navigate(["/login"]);
		});
	}

	constructor() {
		effect(() => {
			console.log("Boards loaded:", this.boards());
		});
	}
}
```

