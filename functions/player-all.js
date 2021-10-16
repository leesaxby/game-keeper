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
        const req = await client.query(q.Map(q.Paginate(q.Match(q.Index("all_players"))), q.Lambda("attr", q.Get(q.Var("attr")))))
        return { statusCode: 200, body: JSON.stringify(req.data, null, 3) }
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message}) }
    }
}
