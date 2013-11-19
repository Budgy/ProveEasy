var Problems = {}; // create array to hold probs

Problems["andComm"] = "{a & b} -> {b & a}";
Problems["impImp"] = "p -> { q -> p }";
Problems["impAnd1"] = "p -> { q -> { p & q } }";
Problems["andAndAnd"] = "{ { p  & q } & r } -> { p & { q & r } }";
Problems["andMonotone"] = "{ p -> q } -> { { p & r } -> { q & r } }";
Problems["impAnd2"] = "{ p & q } -> { p & { p -> q } }";
Problems["Shunting1"] = "{ {p & q} -> r} -> { p -> { q -> r } }";
Problems["Shunting2"] = "{ p -> { q -> r } } -> { {p & q} -> r}";
Problems["allComm"] = "{all x {all y { x R y}}} -> {all y1 {all x1 { x1 R y1}}}";
Problems["impAll1"] = "{all x {{Q x} -> {P x}}} -> { {all x {Q x}} -> {all x {P x}} }";

		
function getProblem(Title){// get the goal for a specific problem
	
	return Problems[Title];
}

names = Object.keys(Problems);
length = names.length;

function removeProbs(){
	
	for (i = 0; i<length; i++){
	
		var prob = document.getElementById("sequent"+i);
		document.body.removeChild(prob);
	}
	
	
}
function getListOfProbs(){// get all problem titles
	
	for (i = 0; i<length; i++){
		
		var prob = document.createElement("p");
		var node=document.createTextNode(names[i]);
		prob.id= "sequent"+i;
		prob.appendChild(node);
		document.body.appendChild(prob);
	}
}

/*
proc impAnd1 {} {   
    clearProof
    proofGoal   { { p & { p -> q } } -> { p & q } }
    }
*/