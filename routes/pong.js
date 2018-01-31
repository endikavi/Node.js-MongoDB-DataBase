// route for pong //

app.get('/pong', function (req, res) {
    console.log('Pedido el pong')
    res.render('pong')
})