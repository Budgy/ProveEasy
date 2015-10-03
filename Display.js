function visualiseProofTree(proofTree){

	//check if document contains a proofTree already
	if(document.getElementById("entireProofSoFar")){
		//remove it
  		document.body.removeChild(document.getElementById("entireProofSoFar"));
  	}

	/*
	Node: 	Givens: [],
			Show:value,
			children: [],
			activeBranch:1 or 0,
			id: 1.....
	*/

	//create element to append each element in the proof tree to
	var display= document.createElement("div");
	display.id= "entireProofSoFar";
	document.body.appendChild(display);

	//create header
	var tree= document.createElement("h3");
	var treeNode=document.createTextNode("ProofTree");
	tree.id= "proofTreeTitle";
	tree.appendChild(treeNode);
	document.getElementById("entireProofSoFar").appendChild(tree);


	//walk through tree appending as we go
	proofTree.walk(function (node) {

		var givens = node.model.Givens;
		var show = node.model.Show;
		var id = node.model.id;
		var	j = 1;

		if (givens.length == 0){


			//do nothing

/*			given = "";
			var give = document.createElement("p");
			var givenNode=document.createTextNode(given);
			give.id= "given"+ id +"."+j;
			j++;
			give.appendChild(givenNode);
			document.getElementById("entireProofSoFar").appendChild(give);
*/
		}
		else{

			for (var l = 0; l<givens.length; l++){// for each given

				var give = document.createElement("p");

				if (typeof givens[l] == 'string'){
					     	
     				givens[l] = stringToTree(givens[l]);

   				}

				var givenNode=document.createTextNode("Given "+ displayTree(givens[l]));
				give.id= "given"+ id +"."+j;
				j++;
				give.appendChild(givenNode);

				if (node.model.activeBranch ==1){//if the node is active make it yellow

					give.style.backgroundColor = "yellow";
				}
				document.getElementById("entireProofSoFar").appendChild(give);
			}
		}

		// now display the show
		var sho = document.createElement("p");

	    if (typeof show == 'string'){
						     	
	     	show = stringToTree(show);

	    }

		var showNode=document.createTextNode("Show "+displayTree(show));
		sho.id= "show"+id;
		sho.appendChild(showNode);

		if (node.model.activeBranch ==1){//if the node is active make it yellow

			sho.style.backgroundColor = "yellow";
		}
		document.getElementById("entireProofSoFar").appendChild(sho);
	});
}







function displayRules () {// display the rules/commands


	if(document.getElementById("rules")){
		//remove it
  		document.body.removeChild(document.getElementById("rules"));
  	}

	var display= document.createElement("div");
	display.id= "rules";
	document.body.appendChild(display);

	var rules= document.createElement("h3");
	var RulesNode=document.createTextNode("Commands");
	rules.id= "rulesTitle";
	rules.appendChild(RulesNode);
	document.getElementById("rules").appendChild(rules);

	commandsList = allCommands();

	var i = 0;
	for (key in commandsList){

		var command = document.createElement("p");
		var commandNode=document.createTextNode(key);
		command.id= "rule "+i;
		i++;
		command.appendChild(commandNode);
		document.getElementById("rules").appendChild(command);


	}





}
