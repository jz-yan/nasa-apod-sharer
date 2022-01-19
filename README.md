# NASA Views

NASA Views is an image-sharing interface designed to allow users to browse through, like/unlike, share, and learn more about APODs captured by NASA photographers. It can be found [here](https://jzyan1999.github.io/nasa-apod-sharer/).

This project was created by Jason Yan of University of Waterloo's Software Engineering for Shopify's Summer 2022 Frontend Challenge. It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.2.

## Features

- Two seperate feeds, **For You** and **Liked Posts**, showing APODs retrieved from NASA's APOD API and liked APOD posts respectively
- Infinite scrolling to allow for APODs to be continuously retrieved and added to **For You** feed
- Liked posts saved when users leave or reload page
- Skeleton loading state in **For You** feed when retrieving APODs
- Posts able to be liked/unliked in both feeds, in which changes will be propagated to both
- Shareable links for each post
- YouTube URLs played via embedded media player
- Post explanation appears when image hovered on
- Responsive design works in mobile view

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
