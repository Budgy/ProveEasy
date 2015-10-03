$(document).ready(function(){

	$(document).on( "click","p", function(event){
		
		if ($(this).is("[id ^= 'rule']")){ //if a rule is selected

			givenRuleSelected = 0;

			ruleSelected = document.getElementById(event.target.id).textContent;


			controlFunction(ruleSelected, proofTree);


			visualiseProofTree(proofTree);

			//tell control function

		}



		else if ($(this).is("[id ^= 'show']")&& givenRuleSelected == 1){// if a show statement is selected after a given rule has been chosen

			alert("cannot apply rule to a show");
			
		}



		else if ($(this).is("[id ^= 'show']")&& givenRuleSelected == 0){ // if a show statement is selected before a given rule has been chose

			showSelected = event.target.id.split("show")[1];
			changeToThisBranchPath(showSelected,proofTree);			
		}




		else if ($(this).is("[id ^= 'given']") && givenRuleSelected == 1){ //if a given is selected when a given rule has been chosen


			givenSelected = document.getElementById(event.target.id).textContent;

			continueControl(givenSelected,proofTree, ruleSelected);
			
			visualiseProofTree(proofTree);


		}




		else if ($(this).is("[id ^= 'sequent']")){// if a problem formula is selected
			
			buttonToggle = false;
			selectedProblem = document.getElementById(event.target.id).textContent;
			//document.getElementById("goal").innerHTML= getProblem(selectedProblem);
			removeProbsFromDoc();
	                       
	        proofTree=initialiseProofTree(getProblem(selectedProblem));

	        displayRules();
	        visualiseProofTree(proofTree);
	        givenRuleSelected = 0;

		}
	});
});

