const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET'){
        return { statusCode: 500, body: 'GET OUTTA HERE!' }
    }

    try {
        const req = await client.query(
            q.Map(
                q.Paginate(q.Match(q.Index("all_decks"))),
                q.Lambda("deckRef", q.Get(q.Var("deckRef")))
            )
        )
        return { statusCode: 200, body: JSON.stringify(req.data) }
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message}) }
    }
}
