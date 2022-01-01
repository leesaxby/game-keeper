const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = async (event) => {
    if (event.httpMethod !== 'GET'){
        return { statusCode: 500, body: 'GET OUTTA HERE!' };
    }

    try {
        const req = await client.query(
            q.Map(
                q.Paginate(q.Match(q.Index("all_decks"))),
                q.Lambda("deckRef",
                    q.Let({
                        deckDoc: q.Get(q.Var("deckRef")),
                    },
                    {
                        id: q.Select(["ref", "id"], q.Var("deckDoc")),
                        name: q.Select(["data", "name"], q.Var("deckDoc")),
                        commander: q.Select(["data", "commander"], q.Var("deckDoc")),
                        player: q.Get(q.Select(['data', 'player'], q.Var('deckDoc'))),
                        level: q.Select(["data", "level"], q.Var("deckDoc")),
                        imageURL: q.Select(["data", "imageURL"], q.Var("deckDoc")),
                    }
                  )
                )
            )
        );

        return { statusCode: 200, body: JSON.stringify(req.data) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message}) };
    }
};
