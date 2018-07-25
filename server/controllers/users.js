var mongoose = require('mongoose')
var User = mongoose.model('User')
var Quote = mongoose.model('Quote')

module.exports = {
    login:function(req, res){
        User.find({name: req.body.name}, function(err, users){
            if(users.length < 1){
                User.create({name: req.body.name}, function(err, user){
                    req.session.user = user
                    req.session.save()
                    res.json({user: user})
                })
            }
            else{
                req.session.user = users[0];
                req.session.save()
                res.json({user: users[0]})
            }
        })
    },

    checksess:function(req, res){
        if(req.session.user == undefined){
            res.json({user: null})
        }
        else{
            res.json({user: req.session.user})
        }
    },

    createquote:function(req, res){
        Quote.create({quote: req.body.quote, person: req.session.user.name}, function(err, quote){
            Quote.find({}).sort('-createdAt').exec(function(err, quotes){
                res.json(quotes)
            })
        })
    },

    showingquotes:function(req, res){
        Quote.find({}).sort('-createdAt').exec(function(err, quotes){
            res.json(quotes)
        })
    },

    likes:function(req, res){
        
        Quote.findOne({_id: req.params.id}, function (err, quote){
            console.log(quote._id)
            quote.likes +=1;
            quote.save()
            res.redirect('/quotes')
            })
            
    },

    delete:function(req, res){
        
        Quote.findOne({_id: req.params.id}, function (err, quote){
            console.log(quote._id)
            quote.remove()
            res.redirect('/quotes')
            })
        },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    }
    
}