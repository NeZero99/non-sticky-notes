const noteWidth = {
    width: '20em'
}

function LoadingNote() {
  return (
    <div className="card is-inline-block m-2" style={noteWidth}>
        <div className="card-content is-flex is-justify-content-center">
            <button className="button is-loading is-large">Loading</button>
        </div>
    </div>
  )
}

export default LoadingNote;