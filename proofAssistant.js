function allProofs(problemName, liveShowID){ //function that returns advice for any proof given the name of the problem and current possition (id)

    var advice = "";
    if(problemName == "andComm"){
        
        wholeProof={

            1:"showImp",
            11:"givenAnd 11.1",
            111:"showAnd",
            1111:"given",
            1112:"given"

        }


        advice = wholeProof[liveShowID];

    }
    else if(problemName == "Example2"){
        
        wholeProof={

            1:"givenAnd 1.1",
            11:"showAnd",
            111:"given",
            112:"given"

        }

        advice = wholeProof[liveShowID];

    }
    else if(problemName == "My First Proof"){
        
        wholeProof={

            1:"givenAnd 1.1",
            11:"showAnd",
            111:"showAnd",
            1111:"given",
            1112:"given",
            112:"showAnd",
            1121:"given",
            1122:"given"


        }


        advice = wholeProof[liveShowID];

    }
	else if(problemName == "allComm"){
        
        wholeProof={

            1:"showImp",
            11:"showAll",
            111:"showAll",
            1111:"givenAll 11.1 x1_",
            11111:"givenAll 11111.1 y1_ ",
			111111:"given"

        }


        advice = wholeProof[liveShowID];

    }
		else if(problemName == "andAndAnd"){
        
        wholeProof={

            1:"showImp",
            11:"givenAnd 11.1",
            111:"givenAnd 111.1 ",
            1111:"given",
			1112:"showAnd ",
            11121:"given",
			11122:"given"

        }


        advice = wholeProof[liveShowID];

    }

		else if(problemName == "impImp"){
        
        wholeProof={

            1:"showImp",
            11:"showImp",
            111:"given",

        }


        advice = wholeProof[liveShowID];

    }
		
		else if(problemName == "impAnd1"){
        
        wholeProof={

            1:"showImp",
            11:"showAll",
            111:"showAnd",
            1111:"given",
            1112:"given",

        }


        advice = wholeProof[liveShowID];

    }
		else if(problemName == "andMonotone"){
        
        wholeProof={

            1:"showImp",
            11:"showImp",
            111:"givenAnd 111.1",
            1111:"showAnd",
            11111:"givenImp 11.1",
			111111:"given",
			111112:"given",
			11112:"given"

        }


        advice = wholeProof[liveShowID];

    }
	
	else if(problemName == "impAnd2"){
        
        wholeProof={

            1:"showImp",
            11:"givenAnd 11.1",
            111:"showAnd",
            1111:"given",
            1112:"showImp",
			11121:"given"			

        }


        advice = wholeProof[liveShowID];

    }
	
	else if(problemName == "Shunting1"){
        
        wholeProof={

            1:"showImp",
            11:"showImp",
            111:"showImp",
            1111:"givenImp 11.1",
            11111:"showAnd",
			111111:"given",
			111112:"given",
			11112:"given"

        }


        advice = wholeProof[liveShowID];

    }
	
	
	else if(problemName == "Shunting2"){
        
        wholeProof={

            1:"showImp",
            11:"showImp",
            111:"givenImp 11.1",
            1111:"givenAnd 111.1",
            11111:"given",
			1112:"givenImp 1112.1",
			11121:"givenAnd 111.1",
			111211:"given",
			11122:"given"

        }


        advice = wholeProof[liveShowID];

    }
	
	else if(problemName == "impAll1"){
        
        wholeProof={

            1:"showImp",
            11:"showImp",
            111:"showAll",
            1111:"givenAll 11.1 x_",
            11111:"showImpBack 11111.1",
			111111:"givenAll 111.1 x_",
			111112:"given"

        }


        advice = wholeProof[liveShowID];

    }
	
	
	else if(problemName == "orComm"){
        
        wholeProof={

            1:"showImp",
            11:"givenOr 11.1",
            111:"showOr2",
            1111:"given",
            112:"showOr1",
			1121:"given"

        }


        advice = wholeProof[liveShowID];

    }
	
	else if(problemName == "orImp"){
        
        wholeProof={

            1:"showImp",
            11:"givenAnd 11.1",
            111:"givenOr 111.1",
            1111:"givenAnd 111.2",
            11111:"givenImp 11111.1",
			111111:"given",
			111112:"given",
			1112:"givenAnd 111.2",
			11121:"givenImp 11121.2",
			111211:"given",
			111212:"given"

        }


        advice = wholeProof[liveShowID];

    }
	
	else if(problemName == "orMonotone"){
        
        wholeProof={

            1:"showImp",
            11:"showImp",
            111:"givenOr 111.1",
            1111:"givenImp 11.1",
            11111:"given",
			11112:"showOr1",
			111121:"given",
			1112:"showOr2",
			11121:"given"

        }


        advice = wholeProof[liveShowID];

    }
	//////////////////////////////////////////////////////////////////
	else if(problemName == "andOr1"){
        
        wholeProof={

            1:"showImp",
            11:"givenAnd 11.1",
            111:"showOr1",
            1111:"given"

        }


        advice = wholeProof[liveShowID];

    }
	else if(problemName == "andOr2"){
        
        wholeProof={

            1:"showImp",
            11:"givenOr 11.1",
            111:"showOr1",
            1111:"given",
            112:"givenAnd 112.1",
			1121:"showOr2",
			11211:"given"

        }


        advice = wholeProof[liveShowID];

    }
	else if(problemName == "andOr3"){
        
        wholeProof={

            1:"showImp",
            11:"givenAnd 11.1",
            111:"givenImp 111.2",
            1111:"given",
            1112:"showAnd",
			11121:"given",
			11122:"given"

        }


        advice = wholeProof[liveShowID];

    }
	else if(problemName == "Absorption1"){
        
        wholeProof={

            1:"showImp",
            11:"givenOr 11.1",
            111:"given",
            112:"givenAnd 112.1",
            1121:"given"

        }


        advice = wholeProof[liveShowID];

    }
	else if(problemName == "Absorption2"){
        
        wholeProof={

            1:"showImp",
            11:"showAnd",
            111:"given",
            112:"showOr1",
            1121:"given"

        }


        advice = wholeProof[liveShowID];

    }
    else if(problemName == "notNot1"){
        
        wholeProof={

            1:"showNot",
            11:"givenNot 11.1",
            111:"givenImp 111.1",
            1111:"given",
            1112:"given"

        }


        advice = wholeProof[liveShowID];

    }
    else if(problemName == "notNot2"){
        
        wholeProof={

            1:"contradiction",
            11:"givenNot 1.1",
            111:"givenImp 111.1",
            1111:"given",
            1112:"given"

        }


        advice = wholeProof[liveShowID];

    }
    else if(problemName == "CourseOfValues"){
        
        wholeProof={

            1:"showImp",
            11:"showAll",
            111:"givenAll 11.1 n_",
            1111:"showImpBack 1111.1",
            11111:"givenImpFwd 11.1 1.1",
            111111:"givenAll 111111.1 n_",
            1111111:"given"

        }


        advice = wholeProof[liveShowID];

    }

    return advice;
}







function proofAssistant(proofTree, currentProblemTitle){ //the real proof assistant, takes the current problem and the current proof tree

    //variable for the id of the active node
    var liveID = "";

    //get id of current live show
    proofTree.walk(function(node){//walk through the proof tree


        if (node.model.children.length ==0 && node.model.activeBranch == 1){//if node has no children and is active (it is a leaf)

            //set the id
            liveID = node.model.id;
            //end walk
            return false;

        }

    });

    //get the advice for that problem at that id in the proof
    var advice = allProofs(currentProblemTitle, liveID);

    //display it to the user
    $( "#bitNextToAdvice" ).text("Advice: "+advice);

    //after a set time, remove the advice
    setTimeout(function() {$("#bitNextToAdvice").text("Advice: "); }, 5000);




}
