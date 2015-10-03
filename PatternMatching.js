


function match (pattern, instance){
	var matches = {};

	//first make sure neither are empty (check depth)
	//using jquery
	if (jQuery.isEmptyObject(pattern)){

		console.log("pattern is empty");
		matches = {};
		return;
	}

	if (jQuery.isEmptyObject(instance)){

		console.log("instance is empty");
		matches = {};
		return;
	}
	
	//get required testing information from trees 
	patternOperatorFlag = 0;
	instanceOperatorFlag = 0;

	pattern.first(function (node) {
	
	    if(node.model.type == "operator"){

	    	patternNode = node;
	    	patternValue = node.model.value;
	    	patternChildrenNum = node.children.length;
	    	patternOperatorFlag = 1;
	    	return node.model.type == "operator";
	    }
	});

	instance.first(function (node) {
	
	    if(node.model.type == "operator"){

	    	instanceNode = node;
	    	instanceValue = node.model.value;
	    	instanceChildrenNum = node.children.length;
	    	instanceOperatorFlag = 1;
	    	return node.model.type == "operator";
	    }  	
	});

	//check operators
	if (patternOperatorFlag === 0){

		//no operator in pattern, match value to entire instance
		matches[pattern.model.value] = instance;
		return matches;
	}

	if (instanceOperatorFlag === 0){

		//no operator in instance
		if (getDepth(instance)!= getDepth(pattern)){

			console.log("incorrect depths");
			matches = {};
			return;

		}else{

			matches[pattern.model.value] = instance;
			return matches;
		}
	}

	if ((instanceValue != patternValue)){

		console.log("operators are not the same");
		matches = {};
		return;
	}

	if (getDepth(pattern)>getDepth(instance)){

		console.log("pattern depth longer than instance");
		matches = {};
		return;
	}

	//check numbers of children at the operator found
	if (patternChildrenNum != instanceChildrenNum){

		if (patternChildrenNum === 0){

			//map the one pattern variable to the entire instance
			matches[pattern.model.value] = instance;
			return matches;
			
		}else{

			console.log("number of children incorrect for match");
			matches = {};
			return;
		}
	}





	//if it makes it through the above checks then it must be a match

	for (var i=0;i<pattern.children.length;i++) { 

		if (isInArray(pattern.model.children[i].value, probVars)){// make sure no problem values are ever assigned to more than one instance value

			console.log("the same problem variable can't be assigned to multple instance components");
			matches = {};
			return;
			
		}else{

				tree = new TreeModel();
				miniPatternTree = tree.parse(pattern.model.children[i]);
				miniInstanceTree = tree.parse(instance.model.children[i]);

			var bool = false;

			miniPatternTree.walk(function (node) {
	
			    if(miniPatternTree.model.type == "operator"){

			    	bool=true;
			    	return false;
			    	
			    }
			});

			if (bool == true){

				newMatches =match(miniPatternTree,miniInstanceTree);

				if ($.isEmptyObject(newMatches)){

					    matches = {};
					    console.log("subtree does not match");
					    return;

				}else{

					matches=merge_options(newMatches,matches);
					bool = false;
				}

			}else{

				instanceBool = false;

				miniInstanceTree.walk(function (node) {
		
				    if(miniInstanceTree.model.type == "operator"){

				    	instanceBool = true;
				    	return false;    	
					    }
				});
				
				if (instanceBool == true){

					bool = false;
					instanceBool = false;
					probVars.push(miniPatternTree.model.value);
					matches[miniPatternTree.model.value] = miniInstanceTree;

				}else{
					
					bool = false;
					probVars.push(miniPatternTree.model.value);
					matches[miniPatternTree.model.value] = miniInstanceTree.model.value;
				}
			}
		}
	}

	return matches;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function isInArray(value, array) {// checks if a value is in the array

  return array.indexOf(value) > -1;
}

function merge_options(obj1,obj2){//merge to objects
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function nodeMatching(patternSeq, instanceSeq, type){


	probVars = [];

	if (type == "show"){ //check if the instance has givens to match

		showMatch = match(patternSeq.Show, instanceSeq.model.Show);
		return showMatch;
	}
	else if (type == "given"){

		//get show matches
		showMatch = match(patternSeq.Show, instanceSeq.model.Show);

		if (objToString(showMatch) == ""){

			//no match
			return "";
		}

		//get givens matches 
		givenMatches = match(patternSeq.Givens, instanceSeq.model.Givens);

		if (jQuery.isEmptyObject(givenMatches)){

			//no match for this formula
			return "";
		}

		//combine
		combinedMatches = merge_options(showMatch, givenMatches)

		return combinedMatches;
		
	}
}
