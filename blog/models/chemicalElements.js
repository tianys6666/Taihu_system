var mongodb = require('./db');

function Chemicalelements(point,name,lng,lat,pH,totalNitrogen,totalPhosphorus,chlorophyla,pheophytin,CODMn,dissolvedOxygen,BOD5,ammoniaNitrogen,NitriteNitrogen,nitricNitrogen,TotaldissolvedNitrogen,PhosphateRadical,dtp,alkalinity,K,Na,Ca,Mg,F,Cl,SO4,SiO4){
	this.point = point;
	this.name = name;
	this.lat = lat;
	this.lng = lng;
	this.pH = pH;
	this.totalNitrogen = totalNitrogen;
	this.totalPhosphorus = totalPhosphorus;
	this.chlorophyla = chlorophyla;
	this.pheophytin = pheophytin;
	this.CODMn = CODMn;
	this.dissolvedOxygen = dissolvedOxygen;
	this.BOD5 = BOD5;
	this.ammoniaNitrogen = ammoniaNitrogen;
	this.NitriteNitrogen = NitriteNitrogen;
	this.nitricNitrogen = nitricNitrogen;
	this.TotaldissolvedNitrogen = TotaldissolvedNitrogen;
	this.PhosphateRadical = PhosphateRadical;
	this.dtp = dtp;
	this.alkalinity = alkalinity;
	this.K = K;
	this.Na = Na;
	this.Ca = Ca;
	this.Mg = Mg;
	this.F = F;
	this.Cl = Cl;
	this.SO4 = SO4;
	this.SiO4 = SiO4;
}	

module.exports = Chemicalelements;

Chemicalelements.getBylatlng = function(lat,lng,callback){
	mongodb.open(function(err,db){
		if(err){
			return callback(err)
		}
		db.collection('chemicalElements',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			collection.findOne({lng:lng,lat:lat},function(err,chemicalelements){
				if(err){
					mongodb.close();
					return callback(err);
				}
				return callback(null,chemicalelements);
			});
		});
	});
}
