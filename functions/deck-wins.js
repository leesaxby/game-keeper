const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
});

exports.handler = async (event) => {
    const deckId = event.queryStringParameters.deckId;

    if (event.httpMethod !== 'GET'){
        return { statusCode: 500, body: 'GET OUTTA HERE!' };
    }

    try {
        const req = await client.query(
            q.Map(
                q.Paginate(q.Match(q.Index("wins-by-deck"), q.Ref(q.Collection("decks"), deckId))),
                q.Lambda("ref", q.Get(q.Var("ref"))),
            ),
        );

        return { statusCode: 200, body: JSON.stringify(req.data) };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: err.message}) };
    }
};
