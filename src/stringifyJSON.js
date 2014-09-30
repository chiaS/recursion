// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  // identify obj type. It could be object, array, number, string or boolean
	
	if(obj===null) // null => 'null'
		return 'null';
	if(obj===undefined)//undefined => undefined
		return undefined; 
	
	var objType = typeof obj;
	
	if(objType==='number'||objType==='boolean') // 6 => '6' , true => 'true'
		return obj.toString();
	else if(objType==='string') // 'hi' => '"hi"'
		return '"'+obj.toString()+'"';
	else if(objType==='function')//function(){} => undefined
		return undefined;

	/*Now obj is either array or object. We can identify them by length property.
	 * This function will recursively call itself for each elements in the object
	 * or array, and return the corresponding values.
	 */
	var str=''; //store the final JSON string
	var arr=[]; //store the elements to be inserted to an array or an object 
	
	if(obj.length === undefined){// it is an object
		str+='{';
		for(var prop in obj){
			var val = stringifyJSON(obj[prop])
			if(val!==undefined)//do not push to arr if val is undefined
				arr.push('"'+prop.toString()+'"'+':'+val);			
		}
		str+=arr.join(',')+'}';
	}else{//array
		str+='[';
		for(var i=0; i<obj.length; i++){
			var val=stringifyJSON(obj[i]);
			if(val!==undefined)//do not push to arr if val is undefined
				arr.push(val);
		}
		str+=arr.join(',')+']';
	}
	return str;
};
