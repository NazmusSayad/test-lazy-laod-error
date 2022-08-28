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

const AllQuotes = lazy(() => retry(() => import('./pages/AllQuotes/AllQuotes')))
const NewQuote = lazy(() => retry(() => import('./pages/NewQuote/NewQuote')))
const OneQuote = lazy(() => retry(() => import('./pages/OneQuote/OneQuote')))

const App = () => {
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
            <Route index element={<AllQuotes quotes={quotes} />} />
            <Route path="new" element={<NewQuote setQuotes={setQuotes} />} />
            <Route path=":quoteId" element={<OneQuote quotes={quotes} />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
