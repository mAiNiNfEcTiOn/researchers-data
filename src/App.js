import axios from 'axios';
import React, { useEffect, useState, Suspense } from 'react';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import ResearcherData from './components/ResearcherData/ResearcherData';

import styles from './App.module.css';
import researchersDataNormalizer from './helpers/researchersDataNormalizer';

const history = createBrowserHistory();

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    if (process.env.REACT_APP_API_URL) {
      const source = axios.CancelToken.source();

      axios(process.env.REACT_APP_API_URL, { cancelToken: source.token })
        .then((response) => {
          setData(researchersDataNormalizer(response.data));
          setLoading(false);
        })
        .catch((e) => {
          if (!axios.isCancel(e)) {
            setError(e);
            setLoading(false);
          }
        });

      return () => {
        source.cancel('Operation canceled by the user.');
      };
    }

    import('./mockedData.json')
      .then((response) => {
        setData(researchersDataNormalizer(response.default));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null; // TODO: Show a loading placeholder
  }

  if (error) {
    return <div>An error has occurred!</div>; // TODO: Handle errors;
  }

  return (
    <Suspense fallback={null}>
      <Router history={history}>
        <header className={styles.header}>
          <h1>Prominent Researchers</h1>
        </header>
        <main className={styles.main}>
          <Switch>
            <Route exact path="/" render={() => <Navigation researchers={data} />} />
            <Route
              exact
              path="/researcher/:id"
              render={({ match }) => {
                const researcherId = parseInt(match.params.id, 10);
                return (
                  <>
                    <Navigation researchers={data} selectedResearcherId={researcherId} />
                    <ResearcherData researcher={data.find((researcher) => researcher.id === researcherId)} />
                  </>
                );
              }}
            />
          </Switch>
        </main>
      </Router>
    </Suspense>
  );
}

export default App;
