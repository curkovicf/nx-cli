# Nx CLI 

> Desktop app built to improve developer's productivity while working with [Nx Workspaces](https://nx.dev/)

<br>

> :construction: USE WITH CAUTION :construction: App is usable, but its not production ready. 

<br>

### Working app screenshots taken on [Manjaro](https://manjaro.org/)

<br>

### Technologies

- [Angular](https://angular.io/)
- [Electron](https://www.electronjs.org/)
- [Nx Workspaces](https://nx.dev/)
- [Ngrx](https://ngrx.io/)

<br>

### Who is it for 

While working at my current job with Nx monorepos I have noticed that I spend a lot of time in CLI manually typing various commands to generate stuff and to manouver around the nx monorepo. The core idea of this app is to minimize the time spent in the CLI, and automate the process of creating, deletion etc. of libs, projects and their artifacts.

<br>

### :office: Architecture & Patterns :office:

<br>

### Features

<br>

### Features

| Status      | Description |
| ----------- | ----------- |
| :white_check_mark: User can add workspace | Once user starts the app he will be able to add new Nx Workspace via absolute path. Path is properly validated.       |
| :white_check_mark: User can see all libs & apps  | Once use has added workspace he can preview his installed apps & libs |
| :white_check_mark: User can select app or lib  | On the left side of the app, user can see list of apps & libs which are selectable |
| :white_check_mark: User can see detail view of a lib or app | Once lib or app is selected, user can see details (List of angular components, modules) etc. |
| :white_check_mark: User can generate a component  | In detail view, there is an option which enables user to create new component with a couple of flags (--flat, --buildable, --publishable) |
| :white_check_mark: User can generate a service  | In detail view, there is option to create new Angular service with couple of flags |
| :white_check_mark: User can delete apps & libs  | In detail view, user has an option to delete selected app or project |
| :white_check_mark: User can move libs & apps  | In detail view, user is able to move libs and apps to different dirs |
| :white_check_mark: User can rename libs & apps  | In detail view, user is able to rename libs and apps |
| :white_check_mark: User can see all tags of selectd libs & apps  | Once the user selects app or lib, he will be able to see all the tags from nx.json |
| :white_check_mark: User can create new lib | If workspace is added, user will be able to create new lib |
| :white_check_mark: User can create new app | If workspace is added, user will be able to create new app |
| :construction: User can remove workspace from app | Workspaces can only be added ATM |
| :construction: Improve visual design | Some parts of app could be visually improved |
| :construction: Add additional flags for lib generation | ATM it is not possible to add flags for a lib generation (Only via single input) |
| :construction: Add additional flags for app generation | ATM it is not possible to add flags for a app generation (Only via single input) |
| :construction: Improve dialog behavior | Some dialogs are behaving a bit jerky |
| :construction: User can remove workspace from app | Workspaces can only be added ATM |



<br>
