var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    _quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}]
    },
    {timestamps: true})

var QuoteSchema = new Schema({
    quote: String,
    person: {type: String},
    likes: {type: Number, default:0},
    _user: [{type: Schema.Types.ObjectId, ref: 'User'}]
    },
    {timestamps: true})

mongoose.model('User', UserSchema);
mongoose.model('Quote', QuoteSchema);