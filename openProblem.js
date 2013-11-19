$(document).ready(function(){
	
	$(document).on( "click","p", function(event){
		
		if (event.target.id == "goal"){
			
		}else{
			
		buttonToggle = false;
		selectedProblem = document.getElementById(event.target.id).textContent;
		document.getElementById("goal").innerHTML= getProblem(selectedProblem);
		removeProbs();

		initialiseTree(getProblem(selectedProblem));
		
		}
		
	});
	
});