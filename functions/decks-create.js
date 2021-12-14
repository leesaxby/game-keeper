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
            player: q.Ref(q.Collection('players'), data.player)
        }
    }

    try {
        const res = await client.query(q.Create(q.Collection("decks"), deck));

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