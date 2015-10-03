$(document).ready(function(){//listener for application

	//flags
	var givenCurrentlySelected = [];
	givenAllSelected = 0;
	currentCommandSelected = "";

	//initialise xml writer
	xw = new XMLWriter('UTF-8');
	xw.formatting = 'indented';//add indentation and newlines
	xw.indentChar = ' ';//indent with spaces
	xw.indentation = 2;//add 2 spaces per level

	xw.writeStartDocument( );

	xw.writeStartElement('events');

	var eventCounter = 0;

	//delay for fading out advice
	$('#adviceContainer').delay(1000).fadeOut();

	$(document).on( "click","p, pre, text", function(event){//if the user clicks an element

		//incriment event counter
		eventCounter++;

		//log the event
		xw.writeStartElement('event');
		    xw.writeAttributeString( 'id', 'event-'+eventCounter);
		    xw.writeAttributeString( 'selectedElementID', event.target.id );
		    xw.writeAttributeString( 'selectedElementContent', document.getElementById(event.target.id).textContent);
		    xw.writeAttributeString('timeStamp', Math.floor(Date.now() / 1000));

 	 	xw.writeEndElement();

		if(!$(this).is("[id ^= 'givenChoice']") && givenAllSelected ==1){//if th givenall rule is in use, and one of its terms were selected

			//reset flag
			givenAllSelected =0;
			//expand the rules menu
		  	toggleRulesVisibility();
		  	
		  	//remove the choices
			if(document.getElementById("givenChoices")){
				//remove it
		  		document.body.removeChild(document.getElementById("givenChoices"));
		  	}
		}

		if ($(this).is("[id ^= 'rule']")){ //if a rule is selected

			//set flag
			givenRuleSelected = 0;

			//get the name of the rule that was selected
			ruleSelected = document.getElementById(event.target.id).textContent;

			//initialise control function
			controlFunction(givenCurrentlySelected, ruleSelected, proofTree);
			//reset all selected givens
			givenCurrentlySelected = [];

			if(document.getElementById('graphView')){//graph view needs to be reset twice in this case

				toggleView(proofTree);
				toggleView(proofTree);

			}else{//otherwise display textual proof view

				visualiseProofTree(proofTree);
			}
		}

		else if ($(this).is("[id ^= 'show']")&& givenRuleSelected == 0){ // if a show statement is selected before a given rule has been chosen

		if (givenRuleSelected.length != 0){ // if a show statement is selected before a given rule has been chosen

			//reset all selected givens
			givenCurrentlySelected = [];

		}

		//get the id
		idForThis = event.target.id;
		//get the show that was chosen
		showSelected = event.target.id.split("show")[1];
		//change active branch to that show
		changeToThisBranchPath(showSelected,proofTree);			
		}

		else if ($(this).is("[id ^= '1given']") && givenRuleSelected == 0){ //if an active given is selected when a given rule has been chosen

			if(document.getElementById('graphView')){//if currently in graph view

				if (document.getElementById(event.target.id).style.fill == "rgb(165, 42, 42)"){//if it was selected, then unselect it

					document.getElementById(event.target.id).style.fill = "orange";

					//remove given from selection
					var index = givenCurrentlySelected.indexOf(document.getElementById(event.target.id));

					if (index > -1) {
					    givenCurrentlySelected.splice(index, 1);
					}

				}

				else {//it is unselected, so select it

					document.getElementById(event.target.id).style.fill = "brown";
					givenCurrentlySelected.push(document.getElementById(event.target.id));
				}

			}else{//otherwise it is the textual view

				if (document.getElementById(event.target.id).style.backgroundColor == "rgb(165, 42, 42)"){//if selected, unselect it

					document.getElementById(event.target.id).style.backgroundColor = "orange";

					//remove given from selection
					var index = givenCurrentlySelected.indexOf(document.getElementById(event.target.id));

					if (index > -1) {
					    givenCurrentlySelected.splice(index, 1);
					}

				}
				else {//unselected, so select it

					document.getElementById(event.target.id).style.backgroundColor = "brown";
					givenCurrentlySelected.push(document.getElementById(event.target.id));

				}
			}
		}

		else if ($(this).is("[id ^= 'given']") && givenAllSelected ==0){ //given was clicked that is not in the active branch, return error

			alert("cannot select a given not in the active branch");
		}

		else if ($(this).is("[id ^= 'sequent']")){// if a problem formula is selected
			
			buttonToggle = false;
			//get the problem title
			selectedProblem = document.getElementById(event.target.id).textContent;

			//remove the problem elements
			removeProbsFromDoc();
			currentCommandSelected = selectedProblem;
			//initialise the proof tree on this sequent
	        proofTree=initialiseProofTree(getProblem(selectedProblem));
	        //display the rules
	        displayRules();
	        //display the proof tree to the user
	        visualiseProofTree(proofTree);

	        givenRuleSelected = 0;

		}
	});    
});
