import { Link } from 'react-router-dom'

const QuoteItem = ({ quote }) => {
  return (
    <div>
      <Link to={quote.id}>{quote.text}</Link>
    </div>
  )
}

const AllQuotes = ({ quotes }) => {
  return (
    <div>
      {quotes.map(quote => (
        <QuoteItem key={quote.id} quote={quote} />
      ))}
    </div>
  )
}

export default AllQuotes
