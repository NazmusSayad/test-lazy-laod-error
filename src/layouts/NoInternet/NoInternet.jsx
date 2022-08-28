const NoInternet = ({ loadAgain }) => {
  return (
    <>
      <h1>No Network!</h1>
      <button onClick={loadAgain}>Load again</button>
    </>
  )
}

export default NoInternet
