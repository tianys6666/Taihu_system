var mongodb = require('./db');

function GetMoptionX(){

}

module.exports = GetMoptionX;

GetMoptionX.getBylatlng = function(month,option,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection('chemicalData',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			switch(option){
				case "总氮" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"总氮":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "pH" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"pH":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "总磷" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"总磷":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "硅酸盐" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"硅酸盐":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "硝态氮" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"硝态氮":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "CODMn" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"CODMn":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "溶解氧" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"溶解氧":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "BOD5" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"BOD5":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "氨氮" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"氨氮":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "钾离子" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"钾离子":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "钙离子" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"钙离子":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "钠离子" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"钠离子":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "镁离子" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"镁离子":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "叶绿素a" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"叶绿素a":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "脱镁叶绿素" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"脱镁叶绿素":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "亚硝态氮" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"亚硝态氮":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "溶解性总氮" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"溶解性总氮":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "磷酸根" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"磷酸根":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "溶解性总磷" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"溶解性总磷":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "碱度" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"碱度":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "氟离子" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"氟离子":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "氯离子" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"氯离子":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
				case "硫酸根离子" : collection.find({"月":month},{"_id":0,"年":1,"月":1,"站点":1,"名称":1,"硫酸根离子":1}).toArray(function(err,getMoptionX){
							if(err){
								mongodb.close();
								return callback(err);
							}
							return callback(null,getMoptionX);
						});
						break;
			}
			
		});
	});
}