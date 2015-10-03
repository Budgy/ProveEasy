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

	indent = "";


	//walk through tree appending as we go
	proofTree.walk(function (node) {

		var givens = node.model.Givens;
		var show = node.model.Show;
		var id = node.model.id;
		var	j = 1;

		for ( var i=1; i<=id.length-1;i++){

			indent = indent+"  ";

		}


		if (givens.length == 0){


			//do nothing

		}
		else{

			for (var l = 0; l<givens.length; l++){// for each given

				var give = document.createElement("pre");

				if (typeof givens[l] == 'string'){
					     	
     				givens[l] = stringToTree(givens[l]);

   				}

   				givenText = id+"."+j+"    Given "+ displayTree(givens[l]);

				var givenNode=document.createTextNode(indent+givenText);
				if (node.model.activeBranch ==1){

				give.id= "1given"+ id +"."+j;
				j++;

				}else{
				give.id= "given"+ id +"."+j;
				j++;
				}

				give.appendChild(givenNode);
				
				

				if (node.model.activeBranch ==1&& node.model.completeBranch == 0){//if the node is active make it yellow and not complete

					give.style.backgroundColor = "yellow";
				}
				if (node.model.completeBranch == 1){//if the node is active make it yellow and complete


					give.style.backgroundColor = "grey";


				}
				document.getElementById("entireProofSoFar").appendChild(give);
			}
		}

		// now display the show
		var sho = document.createElement("pre");

	    if (typeof show == 'string'){
						     	
	     	show = stringToTree(show);

	    }

	    showText = id+"    Show "+displayTree(show);

	 
		var showNode=document.createTextNode(indent+showText);

		sho.id= "show"+id;


		sho.appendChild(showNode);






		if (node.model.activeBranch ==1 && node.model.completeBranch == 0){//if the node is active make it yellow

			sho.style.backgroundColor = "yellow";
		}

		if (node.model.completeBranch == 1){//if the node is active make it yellow and complete


			sho.style.backgroundColor = "grey";

		}
		document.getElementById("entireProofSoFar").appendChild(sho);


		indent = "";

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


String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};









toggleRules = false;

function toggleRulesVisibility(){


	if(toggleRules == false){

		$("#rules").animate({
	     	left:'10',
		});

		$("#rules").animate({
	     	left:'-150',
		});

		$("#rules").hide({});
		toggleRules=true;

	}else{

		$("#rules").show({});

		$("#rules").animate({
	     	left:'10',
		});

		$("#rules").animate({
	     	left:'0',
		});

		toggleRules = false;
	}

}




function displayGivenAllOptions(givensThatCanBeUsed) {

	var choice = "";

	//move rules out the way and create object for 
	toggleRulesVisibility();

	var display= document.createElement("div");
	display.id= "givenChoices";
	

	document.body.appendChild(display);
	$("#givenChoices").insertBefore("#entireProofSoFar");

	var givenChoices= document.createElement("h3");
	var choicesNode=document.createTextNode("Choices");
	givenChoices.id= "choicesTitle";
	givenChoices.appendChild(choicesNode);
	document.getElementById("givenChoices").appendChild(givenChoices);


    for (var key in givensThatCanBeUsed){

    	var variableChoice = document.createElement("p");
		var VariableNode=document.createTextNode(givensThatCanBeUsed[key]);
		variableChoice.id= "givenChoice "+key;
		variableChoice.appendChild(VariableNode);
		document.getElementById("givenChoices").appendChild(variableChoice);

    }

}
