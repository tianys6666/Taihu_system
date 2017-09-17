var mongodb = require('./db');

function Physicalelements(point,name,lng,lat,waterDepth,transparency,temperature,suspensoid,conductivity){
	this.point = point;
	this.name = name;
	this.lat = lat;
	this.lng = lng;
	this.waterDepth = waterDepth;
	this.transparency = transparency;
	this.temperature = temperature;
	this.suspensoid = suspensoid;
	this.conductivity = conductivity;
}	

module.exports = Physicalelements;

Physicalelements.getBylatlng = function(lat,lng,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection('physicalElements',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({lng:lng,lat:lat},function(err,physicalelements){
				if(err){
					mongodb.close();
					return callback(err);
				}
				return callback(null,physicalelements);
			});
		});
	});
}
