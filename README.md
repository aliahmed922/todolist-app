# TodoList App

This is a simple TODO list app. The backend/Views are generated from Rails and Frontend is managed through Stimulas JS. The Front end uses Rails APIs to mutate the content.

### Prerequisites

- Rails 5.2.2
- Ruby 2.5.1
- PG

### Installation

- Clone the repo `git clone git@github.com:aliahmed922/todolist-app.git`
- `cd todolist-app`
- Run `bundle`
- Run `yarn install`
- Copy `database.yml.example` from `/config` and paste in the same folder with `database.yml`
- Run `rails db:create db:migrate db:seed`
- Run `foreman start -f Procfile.dev`

There you go! Cheers.
