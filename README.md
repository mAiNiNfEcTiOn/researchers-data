# _Researchers' Data_ project

## Usage

After you install the dependencies, just run `yarn start` and you'll have the development server running.

In case you want to have the built package, use the `yarn build` command.

In order to use your API instead of the given mocked data, please edit the `.env`'s `REACT_APP_API_URL` with a _truthy_ value and it'll enable the _axios_ part of the code.

## Technologies used

* React (including create-react-app to scaffold the application with most of the necessary tooling)
* React Router DOM and the _history_ package
* ChartJS (and the React components to use with it)
* React Testing Library

## If I had more time, I would've...

* ... handled errors properly (including adding an ErrorBoundary to the application)
* ... handled the loading state properly
* ... made at least the ResearcherData component loaded lazily (React.lazy()) in order to benefit from the `Suspense` component added
* ... added things like `React Intl` for internationalization and regional formatting of numbers (like the totals)
* ... implemented some functional testing (probably with NightwatchJS)
* ... specially improved the mobile experience...

## Pitfall I fell into...

* ... Trying to convert the data structure into a Key/Value store (based on the IDs) and then realize that you'd lose any type of order.
* ... Then later realize that I still needed to sort it because the list wasn't _sorted_, but required _sorting_.
