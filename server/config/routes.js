var users = require('./../controllers/users');
var path = require('path')

module.exports = function(app){
    app.post('/login', function(req, res){
        users.login(req, res)
    })
    app.get('/sess', function(req, res){
        users.checksess(req, res);
    })
    app.get('/logout', function(req, res){
        users.logout(req, res);
    })
    app.post('/create', function(req, res){
        users.createquote(req, res)
    })

    app.get('/show', function(req, res){
        users.showingquotes(req, res)
    })

    app.get('/likes/:id', function(req, res){
        users.likes(req, res)
    })

    app.get('/delete/:id', function(req, res){
        users.delete(req, res)
    })



app.all('**', (req, res) => {res.sendFile(path.resolve('./client/dist/index.html'))})
}

// User.findOne({_id: req.params.id})
        // .populate('quotes')
        // .exec(function(err, user) {
        //     res.render('user', {user: user})
        // })