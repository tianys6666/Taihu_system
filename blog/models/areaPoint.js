var mongodb = require('./db');
function AreaPoint(name,ID,lat,lng){
	this.name = name;
	this.ID = ID;
	this.lat = lat;
	this.lng = lng;
}
module.exports = AreaPoint;
AreaPoint.byLatlng = function(lat,lng,callback){

	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		db.collection('areaPoint',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({lat:lat,lng:lng},function(err,pointdataName){
				if(err){
					mongodb.close();
					return callback(err);
				}
				return callback(null,pointdataName);
			});
		});
	});
}