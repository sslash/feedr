var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var FeedSchema = new Schema({
    url : {type: String, required : true},
    tags: [],
    title: {type: String, required : true},
    selectors : [],
    articleContainer : {type : String, required : true},
    createdAt : { type: Date, default: Date.now },
    creator : { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Feed', FeedSchema);
