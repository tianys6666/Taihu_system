var mongodb = require('./db.js');

function Areadata(point,border,region){
    this.point = point;
    this.border = border;
    this.region = region;
}

module.exports = Areadata;

Areadata.get = function(callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err)
        }
        db.collection('areaData',function(err,collection){
            collection.find().toArray(function(err,areaDatas){
                if(err){
                    return callback(err);
                }
                callback(null,areaDatas);
            });
        });
    })
};