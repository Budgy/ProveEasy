function visualiseProofTree(proofTree){//takes the proofTree and draws it out for the user to see, this is the textual based view

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

	//indentation variable
	indent = "";

	//walk through tree appending as we go
	proofTree.walk(function (node) {

		//get all required information form the current node
		var givens = node.model.Givens;
		var show = node.model.Show;
		var ruleUsed = node.model.ruleUsed;
		var id = node.model.id;
		var	j = 1;

		for ( var i=1; i<=id.length-1;i++){//for each character in the id, add a space to the indent

			indent = indent+"  ";

		}

		if (givens.length == 0){//if there are no givens

			//do nothing

		}
		else{

			for (var l = 0; l<givens.length; l++){// for each given

				var give = document.createElement("pre");

				if (typeof givens[l] == 'string'){//if the type of current given is a string, change it to a tree. This helps consistance with brackets
					     	
     				givens[l] = stringToTree(givens[l]);

   				}

   				//create the string for this given: ID.j GIVEN terms
   				givenText = id+"."+j+"    Given "+ displayTree(givens[l]);

   				//apply indentation to the string
				var givenNode=document.createTextNode(indent+givenText);

				//set the id of the given, id differs between active and inactive branches
				if (node.model.activeBranch ==1){

					give.id= "1given"+ id +"."+j;
					j++;

				}else{

					give.id= "given"+ id +"."+j;
					j++;
				}

				//append the given text node to a larger element
				give.appendChild(givenNode);

				if (node.model.activeBranch ==1&& node.model.completeBranch == 0){//if the node is active and not complete, make it orange 

					give.style.backgroundColor = "orange";
				}
				if (node.model.completeBranch == 1){//if the node is complete, make it grey

					give.style.backgroundColor = "grey";

				}

				//append the given to the proof
				document.getElementById("entireProofSoFar").appendChild(give);
			}
		}

		// now handle the show
		var sho = document.createElement("pre");

	    if (typeof show == 'string'){//again,, if it is a string, make it a tree. This helps consistance with brackets
						     	
	     	show = stringToTree(show);

	    }
	    //create the string 
	    showText = id+"    Show "+displayTree(show)+" "+"by"+ " "+ ruleUsed;

	 	//add indentation
		var showNode=document.createTextNode(indent+showText);

		//set the id
		sho.id= "show"+id;

		//append to larger node
		sho.appendChild(showNode);

		if (node.model.activeBranch ==1 && node.model.completeBranch == 0){//if the node is active and not complete make it yellow

			sho.style.backgroundColor = "yellow";
		}

		if (node.model.completeBranch == 1){//if the node is complete make it grey

			sho.style.backgroundColor = "grey";

		}
		//append the node to the proof
		document.getElementById("entireProofSoFar").appendChild(sho);

		//reset the indent
		indent = "";

	});
}







function displayRules () {// display the rules/commands

	//show previously hidden buttons
	$("[id^='button']").show();
	$("[id^='bitNextToAdvice']").show();

	//if rules already exists then remove it
	if(document.getElementById("rules")){
		//remove it
  		document.body.removeChild(document.getElementById("rules"));
  	}

  	//create a div for all rule elements to be appended into
	var display= document.createElement("div");
	display.id= "rules";
	document.body.appendChild(display);

	//give it a title
	var rules= document.createElement("h3");
	var RulesNode=document.createTextNode("Commands");
	rules.id= "rulesTitle";
	rules.appendChild(RulesNode);
	document.getElementById("rules").appendChild(rules);

	commandsList = allCommands();

	var i = 0;
	//for rule create a new element and append
	for (key in commandsList){

		var command = document.createElement("p");
		var commandNode=document.createTextNode(key);
		command.id= "rule "+i;
		command.class="rule";
		command.title = getToolTipInfo(key);
		command.rel = "tooltip";
		i++;
		command.appendChild(commandNode);
		document.getElementById("rules").appendChild(command);

	}
}







String.prototype.endsWith = function(suffix) {//if string end with something
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};









toggleRules = false;

function toggleRulesVisibility(){//handles the collapsing and exanding of the rules menu

	if(toggleRules == false){

		$("#rules").animate({
	     	left:'10',
		}, 100, 'linear');

		$("#rules").animate({
	     	left:'-150',
		}, 200, 'linear');

		$("#rules").hide({});

		toggleRules=true;

	}else{

		$("#rules").show({});

		$("#rules").animate({
	     	left:'10',
		}, 200, 'linear');

		$("#rules").animate({
	     	left:'0',
		}, 100, 'linear');

		toggleRules = false;
	}
}




function displayGivenAllOptions(givensThatCanBeUsed) {//create the menu for the user to choose terms used in givenAll

	var choice = "";

	//move rules out the way and create object for 
	toggleRulesVisibility();

	//create div to append into
	var display= document.createElement("div");
	display.id= "givenChoices";
	
	//add it to the body	
	document.body.appendChild(display);

	//make sure it is inserted before the proof, otherwise it messes up the layout
	if (document.getElementById("entireProofSoFar")){

		$("#givenChoices").insertBefore("#entireProofSoFar");

	}else{

		$("#givenChoices").insertBefore("#graphView");
	}
	
	//give it a title
	var givenChoices= document.createElement("h3");
	var choicesNode=document.createTextNode("Choices");
	givenChoices.id= "choicesTitle";
	givenChoices.appendChild(choicesNode);
	document.getElementById("givenChoices").appendChild(givenChoices);

	//for each term append a new element
    for (var key in givensThatCanBeUsed){

    	var variableChoice = document.createElement("p");
		var VariableNode=document.createTextNode(givensThatCanBeUsed[key]);
		variableChoice.id= "givenChoice "+key;
		variableChoice.appendChild(VariableNode);
		document.getElementById("givenChoices").appendChild(variableChoice);

    }
}
