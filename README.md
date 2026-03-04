## My Task Board

The goal of this exercise is to develop a simple task management application, and demonstrate your proficiency (and adaptability) in full-stack development using the following stack:
- [Angular for the Front-end](https://angular.dev/)
- [NestJS for the Back-end](https://nestjs.com/)
- MongoDB, MySQL or PostgreSQL for the DB

### Requirements

You should create a web app that includes the following elements:

- Create a simple task management application as shown in the provided design (note that the given design is provided only as a reference - feel free to adjust or change entirely your design if you feel there is a better or more user friendly approach).
- Users must first sign-up/sign-in, to be able to enter the app. On successfull registration, a new `default` board is created and saved to the database for the user.
- By default, a new board must include 4 default tasks (similar to the design).
- Users are always presented with the default board but can create new boards or switch to existing ones. Each board can be accessed by a unique id, e.g: /board/:board-id, also allowing the user to switch to a different board by using the address bar directly.
- Users can change their default board. 
- Users can edit board name and optionally, board description as well.
- Users can edit task name, description, icon, and status.
- Users can delete tasks by clicking a `Delete` button (confirmation dialog must appear).
- When users select `Add new task` option, a new task is added with a default name (no form dialog).
- **Bonus**: When a board is selected, instead of showing a flat list of tasks, organize the tasks in columns (ToDo, InProgress, Completed, WontDo) and allow users to drag-and-drop tasks to a different column to easily change their status.

### How to deliver

You can share the results with us by either:
1. Sharing a github repository you uploaded the solution.
2. Sending a zip file containing the project files directly.

The final solution must be a monorepo and properly separate/structure code for both front-end and backend. It is very important that the final solution contains:
1. A Readme.md with detailed instructions on how to run the project or any information that the reviewer will need to know.
2. A docker-compose.yml file that will allow us to bootrstap the entire solution (including Database) easily with Docker.


### Technical Details

#### Front-end Development

**Framework**: Use Angular Framework for implementing the user interface. Any version >= 16

**Styling**: Use SCSS and/or Angular Material library (as a base) for theming and/or styling your components. 

**Guidelines**: The app must be responsive and follow best practises on all UI/UX concepts (Layout, Spacing & Sizing, Interactive Design, Component Design, Accessibility etc).


#### Back-end Development

**Framework**: Use NestJS Framework for implementing the backend API.

**Database**: Use a database of your choice from the following list (MongoDB, MySQL or PostgreSQL) for storing users, tasks, boards or anything else needed. 

**Guidelines**: 
- Your API endpoints must follow the `REST` architectural style.
- API must include migrations and/or seeders to allow populating the Database.
- Auth must be JWT token based. Use symetric signing (HS256) and produce Access Token + Refresh Token pair.



