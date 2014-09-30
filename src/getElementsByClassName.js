// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
	//need a inner function to pass child nodes
	var parseNodes = function(childNodes){
		var result=[];
		for(var i=0; i<childNodes.length; i++){			
			if(childNodes[i].nodeType === 1){//element node
				//list all classes the node has
				var classList = childNodes[i].classList; 		
				//search for className from the list
				for(var j=0; j<classList.length; j++){
					//add the node to result if className is found
					if(classList[j] === className)
						result.push(childNodes[i]);
				}			
			}
			//parse child nodes with recursive call
			//.concat() returns a new array
			result = result.concat(parseNodes(childNodes[i].childNodes));
		}
		return result;
	};
	//start from document body
	return parseNodes([document.body]);

};
