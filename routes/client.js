// route for client //

app.get('/', function (req, res) {
    console.log('Pedido el cliente');
    res.render('panel')
});