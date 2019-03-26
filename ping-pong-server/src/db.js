const users = Array.from({length:10}).map((x, id) => ({
    id,
    nema: `User ${id}`
}));



module.exports = {

    users: {
        findAll: () => users,
        findById: id => users.find(user => user.id === id)
    }

};