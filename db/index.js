const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost/friends')

const Friend = db.define('friend', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    rating: {
        type: Sequelize.INTEGER,
        defaultValue: 5
    }
})

const syncAndSeed = async() => {
    await db.sync({ force: true });
    const [ moe, lucy, larry ] = await Promise.all([
        Friend.create( { name: 'moe', rating: 10 }),
        Friend.create( { name: 'lucy', rating: 5 }),
        Friend.create( { name: 'larry', rating: 1 })
    ])
}

module.exports = {
    syncAndSeed,
    models: {
        Friend
    }
}