# Nx CLI 

> Desktop app built to improve developer's productivity while working with [Nx Workspaces](https://nx.dev/)

Manage your Nx projects like a boss. Don't spend too much time on the CLI, and focus on implemenation with the Nx-cli. App is intended to work on Linux, Mac and Windows.

<br>

> :construction: USE WITH CAUTION :construction: 
 
App is usable, but its not production ready. 

<br>

### 🧪 Working app screenshots taken on [Manjaro](https://manjaro.org/) 🧪

![plot](./resources/1.png)
![plot](./resources/2.png)
![plot](./resources/3.png)
![plot](./resources/4.png)


<br>

### 🤖 Technologies 🤖

- [Angular](https://angular.io/)
- [Electron](https://www.electronjs.org/)
- [Nx Workspaces](https://nx.dev/)
- [Ngrx](https://ngrx.io/)

<br>

### 👨‍💻 Who is it for 👨‍💻

While working at my current job with Nx monorepos I have noticed that I spend a lot of time in CLI manually typing various commands to generate stuff and to manouver around the nx monorepo. The core idea of this app is to minimize the time spent in the CLI, and automate the process of creating, deletion etc. of libs, projects and their artifacts.

<br>

### :office: Architecture & Patterns :office:

- SCAM -> Single component angular modules
- UI components -> Everthing that is under UI folder should recieve the data only via @Input(), and emit it via @Output(). These components can only inject services regarding the view, E.g. MaterialDialog service 
- Feature components -> Can be routed to, can access data from any source 
- Shell -> Entry point for some domain. Shell should always have feature in which we store routes, and layout which should be the layout for the current domain. Layout can access any data even though it is in UI folder.
- ViewModel -> Ngrx Store is used as a global store while ngrx/@component-store is used as a [viewmodel](https://developer.android.com/topic/libraries/architecture/viewmodel). Viewmodel should grab the data from the global store and prepare it for the view injection via async pipe, also, majority of the business logic is located in the viewmodels which helps to keep our components clean and extremely easy to test and maintain.

> :construction: Some of the patterns are not 100% enforced because I am still exploring and trying stuff out

<br>

### :construction: Status of Features / Use cases :construction:

| Implemented      | Feature / Use case    | Description |
| ----------- | ----------- | ----------- |
| :white_check_mark: | User can add workspace | Once user starts the app he will be able to add new Nx Workspace via absolute path. Path is properly validated.       |
| :white_check_mark: | User can see all libs & apps  | Once use has added workspace he can preview his installed apps & libs |
| :white_check_mark: | User can select app or lib  | On the left side of the app, user can see list of apps & libs which are selectable |
| :white_check_mark: | User can see detail view of a lib or app | Once lib or app is selected, user can see details (List of angular components, modules) etc. |
| :white_check_mark: | User can generate a component  | In detail view, there is an option which enables user to create new component with a couple of flags (--flat, --buildable, --publishable) |
| :white_check_mark: | User can generate a service  | In detail view, there is option to create new Angular service with couple of flags |
| :white_check_mark: | User can delete apps & libs  | In detail view, user has an option to delete selected app or project |
| :white_check_mark: | User can move libs & apps  | In detail view, user is able to move libs and apps to different dirs |
| :white_check_mark: | User can rename libs & apps  | In detail view, user is able to rename libs and apps |
| :white_check_mark: | User can see all tags of selectd libs & apps  | Once the user selects app or lib, he will be able to see all the tags from nx.json |
| :white_check_mark: | User can create new lib | If workspace is added, user will be able to create new lib |
| :white_check_mark: | User can create new app | If workspace is added, user will be able to create new app |
| :white_check_mark: | User can remove workspace from app | Workspaces can only be added ATM |
| :white_check_mark: | Add additional flags for lib generation | ATM it is not possible to add flags for a lib generation (Only via single input) |
| :white_check_mark: | Add additional flags for app generation | ATM it is not possible to add flags for a app generation (Only via single input) |
| :x: | User can see outputs of commands | Add console to the app so user can see and interact with the console logs |
| :x: | User can see if Nx is not installed on his machine | Add notification if user doesn't have Nx installed on his machine |
| :x: | User can open components & modules in new window | User can select and open files in new window (Custom text editor) |
| :x: | User can add/delete tags | Ability to add tags for a selected app or lib |
| :x: | User can start dep graph | User can run nx dep graph from the app |
| :x: | User can see lib or app tree | Once app or lib is selected, user can see folder tree in the detail view |
| :x: | User can create dependencies between tags | Ability to add tags dependencies between tags |


<br>

### ⏩ What happens next ⏩

| Status | Deadline | Topic |
| ----------- | ----------- | ----------- |
| :white_check_mark: | 1.9.2021 | Polish and bugfix |
| :white_check_mark: | 5.9.2021 | User can remove workspace from app |
| :white_check_mark: | 10.9.2021 | Add additional flags for lib generation |
| :white_check_mark: | 15.9.2021 | Add additional flags for app generation |
| :x: | 1.11.2021 | Add console to the app so user can see and interact with the console logs |
| :x: | 1.1.2022 | Add notification if user doesn't have Nx installed on his machine |
| :x: | 15.1.2022 | User can select and open files in new window (Custom text editor) |
| :x: | 1.2.2022 | Ability to add tags for a selected app or lib |
| :x: | 12.2.2022 | User can run nx dep graph from the app |
| :x: | 1.3.2022 | Once app or lib is selected, user can see folder tree in the detail view |
| :x: | 15.3.2022 | Ability to add tags dependencies between tags |

<br>


### 🇭🇷 Author 🇭🇷

> Adding new features and maintaining old ones will be a bit slower due to the time constraints I have because of the uni (last semester :relieved:) and work

If you wish to contact me, you can find info on [website](https://www.fcurkovicdev.eu/).

<br>

### References

- More about shell lib https://indepth.dev/posts/1117/the-shell-library-patterns-with-nx-and-monorepo-architectures
- More about viewmodel https://medium.com/androiddevelopers/viewmodels-a-simple-example-ed5ac416317e

<br>

