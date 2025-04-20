# SpryTaskManagement

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```


# task-management

Description: Build a simple Task Management Dashboard where users can view, add, edit, and delete tasks.

Requirements:
- Features:
    - Display a list of tasks with properties: title, description, status (Pending, In Progress, Completed), and dueDate.
    - Allow users to:
    - Add new tasks with validation (e.g., title and dueDate are mandatory).
    - Edit task details.
    - Delete tasks.
    - Filter tasks by status.
    - Sort tasks by dueDate.
    - Provide a summary at the top of the dashboard showing the count of tasks in each status.

- Design:
    - Use a responsive layout (grid or list view) with a modern UI.
    - Include a modal or a form component for adding and editing tasks.
- Tech-Specific Requirements:
    - Use state management (e.g., Context API, Redux, or RxJS for Angular).
- Implement reusable components (e.g., a TaskCard and TaskForm).

Additional Challenges:
-   Add client-side routing: Navigate between “All Tasks” and “Completed Tasks” views.
-   Persist tasks using local storage or a mock API.