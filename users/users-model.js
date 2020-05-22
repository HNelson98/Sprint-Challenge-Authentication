const db = require('../database/dbConfig')

module.exports = {
    add,
    findBy
}

function findBy(filter) {
    return db("users").where(filter)
}

async function add(user) {
    try {
        const [id] = await db("users").insert(user, "id");

        return findBy(id);
    } catch (error) {
        throw error;
        
    }
    
}