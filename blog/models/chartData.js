var mongodb = require('./db');

function Chartdata(){

}

module.exports = Chartdata;

Chartdata.getBylatlng = function(lat,lng,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection('chartData',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({lng:lng,lat:lat},function(err,chartdata){
				if(err){
					mongodb.close();
					return callback(err);
				}
				return callback(null,chartdata);
			});
		});
	});
}