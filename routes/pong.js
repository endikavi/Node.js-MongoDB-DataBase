// route for pong //

app.get('/', function (req, res) {
    console.log('Pedido el pong')
    res.render('pong')
})