import { useId } from 'react'
import css from './NewQuote.module.scss'

const NewQuotes = ({ setQuotes }) => {
  const authorId = useId()
  const textId = useId()

  const handleFormSubmit = e => {
    e.preventDefault()
    const author = e.target.elements[authorId]
    const text = e.target.elements[textId]

    setQuotes(quotes =>
      quotes.concat([
        {
          id: Date.now() + Math.random().toString().replace('.', '-'),
          author: author.value,
          text: text.value,
        },
      ])
    )

    author.value = ''
    text.value = ''
  }

  return (
    <div className={css.new}>
      <form className={css.new__form} onSubmit={handleFormSubmit}>
        <label htmlFor={authorId}>Author</label>
        <input id={authorId} type="text" />

        <label htmlFor={textId}>Text</label>
        <textarea id={textId} cols="30" rows="5"></textarea>

        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default NewQuotes
