const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async(event, context, callback) => {
    const data = JSON.parse(event.body)
    const deck = {
        data: {
            ...data,
            winner: q.Ref(q.Collection('decks'), data.winner),
            losers: data.losers.map(loser => q.Ref(q.Collection('decks'), loser))
        }
    }

    try {
        const res = await client.query(q.Create(q.Collection("games"), deck));

        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(res)
        })
    } catch (err) {
        return callback(null, {
          statusCode: 400,
          body: JSON.stringify(err)
        })
    }
}
