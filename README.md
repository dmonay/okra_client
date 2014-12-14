# Angular App for Okra


* [Installation](#installation)
* [Usage](#usage)
* [Documentation](#documentation)
* [Grunt tasks](#grunt-tasks)
* [Testing](#testing)


## Installation

Clone this repo to your local machine, and navigate to the folder in Terminal, then:

```
npm install
grunt serve
open http://localhost:3333
```

## Usage




## Documentation

Documentation is provided using ngdocs, which is populated by JSDoc style comment blocks in the code.
The documentation can be viewed locally on your machine once cloned. Run:

```
grunt docs
open http://localhost:4444
```

To find out more about documenting with ngdocs, see:

* [Writing AngularJS Documentation](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation)
* [API Docs Syntax](https://github.com/idanush/ngdocs/wiki/API-Docs-Syntax)


## Grunt Tasks

### grunt serve

Runs unit tests, starts a connect server and watches the source files for changes. The watch task in turn rebuilds html templates & css files and runs unit tests when a file changes. It also triggers a live reload (requires [live reload browser extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en))

### grunt test & grunt test:watch

grunt test triggers a single run of the unit tests. grunt test:watch runs the tests continuously watching for changes in the source files.

### grunt jsbeautifier

To ensure consistent code formatting throughout the project ng-store uses [jsbeautifier](https://www.npmjs.org/package/grunt-jsbeautifier). It can be run manually at any time, but it is also automatically run in 'verify-only mode' using a [git-hook](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) before commit. It must be run in verify mode at this point as it can not make changes to files at pre-commit time as that would require them to be staged for commit again.
If you receive a warning during commit that some files are not beautified, just run `grunt jsbeautifier` and then `git add` to stage any changes.

### grunt dist

This task prepares a distribution build of ng-store. It compiles, optimises, concatenates and minifies the javascript, css and html and copies it to the ./dist folder

NB: After running `grunt dist`, you can use `grunt connect:dist` to create a web server on port 3333 that uses the dist folder as its source.

### grunt karma:reports

Used to generate a unit test report and code coverage report. Reports are added to the ./reports folder. The code coverage report is generated in cobertura format for use with jenkins, but also in html format so it can be viewed locally in a browser.

### grunt clean

Cleans out all generated compiled and code, docs, dist, reports and any sass-cache files. If you spot styling issues after getting the latest code, it is worth running `grunt clean`.

## Testing

### Unit Tests

Tests are written with Karma + Jasmine. The config files are located in `/test/config`.

```
grunt test:unit            # run unit tests
grunt test:watch           # run unit tests continuously, watching for changes
```

Test specs sit inside the `/src/app` folder alongside the code they test.
Spec filenames should mirror the file they are testing, but with the extension `.spec.js`.

```
app/feature/feature-controller.js
app/feature/feature-controller.spec.js
app/feature/service-name.js
app/feature/service-name.spec.js
```

To run tests, open a new Terminal instance and run `npm test`.

### E2E Tests

End to end tests are written in jasmine and run with protractor, they are stored in the test/e2e/ folder and suffixed
 with .spec.js.


The following test commands are available:

```
grunt e2e       # run e2e tests using localhost against a local browser

This list can also be seen by running `grunt test`.
