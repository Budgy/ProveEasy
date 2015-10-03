$(document).ready(function(){


	var givenCurrentlySelected = [];
	givenAllSelected = 0;
	currentCommandSelected = "";


	xw = new XMLWriter('UTF-8');
	xw.formatting = 'indented';//add indentation and newlines
	xw.indentChar = ' ';//indent with spaces
	xw.indentation = 2;//add 2 spaces per level

	xw.writeStartDocument( );

	xw.writeStartElement('events');

	var eventCounter = 0;




	$('#adviceContainer').delay(1000).fadeOut();

	$(document).on( "click","p, pre, text", function(event){

		eventCounter++;

		xw.writeStartElement('event');
		    xw.writeAttributeString( 'id', 'event-'+eventCounter);
		    xw.writeAttributeString( 'selectedElementID', event.target.id );
		    xw.writeAttributeString( 'selectedElementContent', document.getElementById(event.target.id).textContent);
		    xw.writeAttributeString('timeStamp', Math.floor(Date.now() / 1000));

 	 	xw.writeEndElement();



		if(!$(this).is("[id ^= 'givenChoice']") && givenAllSelected ==1){

				givenAllSelected =0;
			  	toggleRulesVisibility();
			  	//remove element and retoggle rules
				if(document.getElementById("givenChoices")){
					//remove it
			  		document.body.removeChild(document.getElementById("givenChoices"));
			  	}


		}

		if ($(this).is("[id ^= 'rule']")){ //if a rule is selected

			givenRuleSelected = 0;

			ruleSelected = document.getElementById(event.target.id).textContent;


			controlFunction(givenCurrentlySelected, ruleSelected, proofTree);
			givenCurrentlySelected = [];

			if(document.getElementById('graphView')){

				toggleView(proofTree);
				toggleView(proofTree);

			}else{
				visualiseProofTree(proofTree);
			}
			//tell control function

		}

		else if ($(this).is("[id ^= 'show']")&& givenRuleSelected == 0){ // if a show statement is selected before a given rule has been chose

			idForThis = event.target.id;

			showSelected = event.target.id.split("show")[1];
			changeToThisBranchPath(showSelected,proofTree);			
		}



		else if ($(this).is("[id ^= '1given']") && givenRuleSelected == 0){ //if a given is selected when a given rule has been chosen




			if(document.getElementById('graphView')){

				if (document.getElementById(event.target.id).style.fill == "rgb(165, 42, 42)"){

					document.getElementById(event.target.id).style.fill = "yellow";

					//remove given from selection
					var index = givenCurrentlySelected.indexOf(document.getElementById(event.target.id));
					if (index > -1) {
					    givenCurrentlySelected.splice(index, 1);
					}

				}
				else {

					document.getElementById(event.target.id).style.fill = "brown";
					givenCurrentlySelected.push(document.getElementById(event.target.id));
				}




			}else{

				if (document.getElementById(event.target.id).style.backgroundColor == "rgb(165, 42, 42)"){

					document.getElementById(event.target.id).style.backgroundColor = "yellow";

					//remove given from selection
					var index = givenCurrentlySelected.indexOf(document.getElementById(event.target.id));
					if (index > -1) {
					    givenCurrentlySelected.splice(index, 1);
					}

				}
				else {

					document.getElementById(event.target.id).style.backgroundColor = "brown";
					givenCurrentlySelected.push(document.getElementById(event.target.id));
				}


			}


		}




		else if ($(this).is("[id ^= 'given']") && givenAllSelected ==0){ 

			alert("cannot select a given not in the active branch");
		}

		else if ($(this).is("[id ^= 'sequent']")){// if a problem formula is selected
			
			buttonToggle = false;
				
			
			selectedProblem = document.getElementById(event.target.id).textContent;
			//document.getElementById("goal").innerHTML= getProblem(selectedProblem);
			removeProbsFromDoc();

			currentCommandSelected = selectedProblem;
	        proofTree=initialiseProofTree(getProblem(selectedProblem));

	        displayRules();
	        visualiseProofTree(proofTree);

	      //spinner.stop();
	        givenRuleSelected = 0;

		}

		


	});

		

		
    
});
