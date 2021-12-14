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
                q.Paginate(q.Match(q.Index("all_players"))),
                q.Lambda("playerRef",
                    q.Let({
                        playerDoc: q.Get(q.Var("playerRef")),
                    },
                    {
                        id: q.Select(["ref", "id"], q.Var("playerDoc")),
                        name: q.Select(["data", "name"], q.Var("playerDoc")),
                        imageURL: q.Select(["data", "imageURL"], q.Var("playerDoc")),
                    }
                  )
                )
            )
        )

        return { statusCode: 200, body: JSON.stringify(req.data) }
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message}) }
    }
}
