
//simple extend object
exports.extend =function(source,target){

    for(var key in source){
        target[key] = source[key]
    }
    return target;
}

var clone=exports.clone = function (myObj){
	if(typeof(myObj) != 'object' || myObj == null) return myObj;
	var newObj = {};
	for(var i in myObj){
		newObj[i] = clone(myObj[i]);
	}
	return newObj;
}