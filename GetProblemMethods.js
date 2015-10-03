function getProblemTree(problem) {
    
    ProblemParser= PEG.buildParser("start = sep* AND:AND sep* {return AND} AND= left:implication sep* operator:\"&\" sep* right:AND {return {type:\"operator\", value:operator, children:[left,right]}} /implication implication = left:primary sep* operator:\"->\" sep* right:implication{return {type:\"operator\", value:operator, children:[left,right]}}/primary primary  = letter:letter{return {type:\"variable\", value:letter}}/ \"{\" sep* AND:AND sep* \"}\" {return AND}/\"(\" sep* AND:AND sep* \")\" {return AND} sep = spaces:[' ',\\t,\\r,\\n] letter  = letters:[a,b,p,q,r]");
    
    Result = ProblemParser.parse(problem);
    tree = new TreeModel();
    root = tree.parse(Result);    
    return root;

}


function getProblem(Title){// get the goal for a specific problem
	
	return Problems[Title];
}

names = Object.keys(Problems);
length = names.length;

function removeProbsFromDoc(){
	
	for (i = 0; i<length; i++){
	
		var prob = document.getElementById("sequent"+i);
		document.body.removeChild(prob);
	}
	
}

function getListOfProbs(){// get and display all problem titles

	//check if document contains a proofTree already
	if(document.getElementById("entireProofSoFar")){
		//remove it
  		document.body.removeChild(document.getElementById("entireProofSoFar"));
  	}
  	if(document.getElementById("graphView")){
		//remove it
  		document.body.removeChild(document.getElementById("graphView"));
  	}


  	if(document.getElementById("rules")){
		//remove it
  		document.body.removeChild(document.getElementById("rules"));
  	}
	
	for (i = 0; i<length; i++){
		
		var prob = document.createElement("p");
		var node=document.createTextNode(names[i]);
		prob.id= "sequent"+i;
		prob.appendChild(node);
		document.body.appendChild(prob);
	}
}
