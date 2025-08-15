const pagenotfound = (req, res) => {
    res.status(404).send('Route page not found')
}

module.exports = pagenotfound