import './App.css';
import Prismic from '@prismicio/client'
import { Date, Link, RichText } from 'prismic-reactjs'

const apiEndpoint = 'https://characterscope-engineering-recruitment.cdn.prismic.io/api/v2'
const accessToken = 'MC5ZRzhYTkJNQUFDSUFpa09f.77-9Tg3vv70B77-977-9GSzvv70V77-9GBdB77-977-9HRUS77-9F--_vVfvv73vv706ARDvv73vv73vv70' // This is where you would add your access token for a Private repository

const Client = Prismic.client(apiEndpoint, { accessToken })
const [doc, setDocData] = React.useState(null)

React.useEffect(() => {
  const fetchData = async () => {
    const response = await Client.query(
      Prismic.Predicates.at('document.type', 'page')
    )
    if (response) {
      setDocData(response.results[0])
    }
  }
  fetchData()
}, [])


// Link Resolver
linkResolver(doc) ;{
  // Define the url depending on the document type
  if (doc.type === 'leader-types') {
  return '/leader-types/' + doc.uid;
  }
}

return (
  <React.Fragment>
    {
      doc ? (
        <div>
          <h1>{RichText.asText(doc.data.title)}</h1>
          <img alt='cover' src={doc.data.image.url} />
          <RichText render={doc.data.description} linkResolver={linkResolver} />
        </div>
      ) : <div>No content</div>
    }
  </React.Fragment>
)


export default App;
