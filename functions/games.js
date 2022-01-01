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
                q.Paginate(q.Match(q.Index("all_games"))),
                q.Lambda("gameRef",
                    q.Let({
                            gameDoc: q.Get(q.Var("gameRef")),
                        },
                        {
                            id: q.Select(["ref", "id"], q.Var("gameDoc")),
                            winner: q.Get(q.Select(['data', 'winner'], q.Var('gameDoc'))),
                            winMethod: q.Select(['data', 'winMethod'], q.Var('gameDoc')),
                            first: q.Select(["data", "first"], q.Var("gameDoc")),
                            turnOneSolRing: q.Select(["data", "turnOneSolRing"], q.Var("gameDoc")),
                            losers: q.Map(q.Select(['data', 'losers'], q.Var('gameDoc')), q.Lambda(['deckRef'],
                                q.Let({
                                        item: q.Get(q.Var('deckRef')),
                                    },
                                    {
                                        name: q.Select(['data', 'name'], q.Var('item')),
                                        player: q.Select(['data', 'name'],q.Get(q.Select(['data', 'player'], q.Var('item')))),
                                    }
                                ))),
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
