import { useEffect, useState, Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Header from './layouts/Header/Header'
import NoInternet from './layouts/NoInternet/NoInternet'
import Error404 from './pages/404/404'
const initialQuotes = JSON.parse(localStorage.getItem('quotes'))
const retry = (importFn, retriesLeft = 50, interval = 1000) => {
  return new Promise((resolve, reject) => {
    importFn()
      .then(resolve)
      .catch(error => {
        resolve({
          default: NoInternet,
        })

        /* 
          setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error)
            return
          }

          retry(importFn, retriesLeft--, interval).then(resolve, reject)
        }, interval) 
        */
      })
  })
}

const getComponents = () => {
  return {
    AllQuotes: lazy(() => retry(() => import('./pages/AllQuotes/AllQuotes'))),
    NewQuote: lazy(() => retry(() => import('./pages/NewQuote/NewQuote'))),
    OneQuote: lazy(() => retry(() => import('./pages/OneQuote/OneQuote'))),
  }
}

const useComponent = () => {
  const [components, setComponents] = useState(() => getComponents())
  return [components, () => setComponents(getComponents())]
}

const App = () => {
  const [components, resetComponents] = useComponent()
  const [quotes, setQuotes] = useState(initialQuotes || [])

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes))
  }, [quotes])

  return (
    <BrowserRouter>
      <Header></Header>

      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" />} />

          <Route path="/quotes">
            <Route
              index
              element={
                <components.AllQuotes
                  quotes={quotes}
                  loadAgain={resetComponents}
                />
              }
            />
            <Route
              path="new"
              element={
                <components.NewQuote
                  setQuotes={setQuotes}
                  loadAgain={resetComponents}
                />
              }
            />
            <Route
              path=":quoteId"
              element={
                <components.OneQuote
                  quotes={quotes}
                  loadAgain={resetComponents}
                />
              }
            />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
