var mongodb = require('./db');

function GetpointX(){

}

module.exports = GetpointX;

GetpointX.getBylatlng = function(point,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection('chemicalData',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.find({"站点":point},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"总氮":1,"pH":1,"氨氮":1,"氟离子":1,"硅酸盐":1,"碱度":1,"氯离子":1,"总磷":1,"钾离子":1,"磷酸根":1,"溶解氧":1}).toArray(function(err,getPointX){
				if(err){
					mongodb.close();
					return callback(err);
				}
				return callback(null,getPointX);
			});
		});
	});
}