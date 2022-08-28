import { useEffect, useState, Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Header from './layouts/Header/Header'

function retry(fn, retriesLeft = 50, interval = 1000) {
  return new Promise((resolve, reject) => {
    fn()
      .then(data => {
        console.log({ data })

        resolve(data)
      })
      .catch(error => {
        resolve({
          default: Header,
        })

        /* 
          setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error)
            return
          }

          retry(fn, retriesLeft--, interval).then(resolve, reject)
        }, interval) 
        */
      })
  })
}

const AllQuotes = lazy(() => retry(() => import('./pages/AllQuotes/AllQuotes')))
const NewQuote = lazy(() => retry(() => import('./pages/NewQuote/NewQuote')))
const OneQuote = lazy(() => retry(() => import('./pages/OneQuote/OneQuote')))

import Error404 from './pages/404/404'
const initialQuotes = JSON.parse(localStorage.getItem('quotes'))

const App = () => {
  const [quotes, setQuotes] = useState(initialQuotes || [])

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes))
  }, [quotes])

  console.log(AllQuotes._payload._status)

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
