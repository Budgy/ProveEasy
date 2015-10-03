function allProofs(problemName, liveShowID){

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





function proofAssistant(proofTree, currentProblemTitle){


    var liveID = "";

    //get id of current live show

    proofTree.walk(function(node){


        if (node.model.children.length ==0 && node.model.activeBranch == 1){

            liveID = node.model.id;
            return false;

        }

    });

    var advice = allProofs(currentProblemTitle, liveID);


    $( "#bitNextToAdvice" ).text("Advice: "+advice);

    //display loading element
    // var display= document.createElement("div");


    // display.id= "adviceContainer";

    // document.getElementById("buttonsId").appendChild(display);
    

    // var advice1= document.createElement("h3");
    // var adviceNode=document.createTextNode(advice);
    // advice1.id= "loadingID";
    // advice1.appendChild(adviceNode);
    // document.getElementById("adviceContainer").appendChild(advice1);
 

    setTimeout(function() {$("#bitNextToAdvice").text("Advice: "); }, 5000);




}

















/*


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getCommandPatterns(commandName){

    if (commandName=="showImp"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("p -> q"),
            },
            Sub:[{
                Givens:["p"],
                Show: "q",
                children: [],
                activeBranch: 1,
                id: 0,
                completeBranch:0,
                ruleUsed:"?"
            }]
        };

        return pats;
    }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenImp"){

        var pats={

            type: "given",

            Pattern:{
                Givens: [stringToTree("p -> q")],
                Show: stringToTree("r"),
            },
            Sub:[

                {
                    Givens:[],
                    Show: "p",
                    children: [],
                    activeBranch: 1,
                    id:0,
                    completeBranch:0,
                    ruleUsed:"?"
                },
                {
                    Givens:["q"],
                    Show: "r",
                    children: [],
                    activeBranch: 0,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenAnd"){

        var pats={

            type: "given",

            Pattern:{
                Givens: [stringToTree("p & q")],
                Show: stringToTree("r"),
            },
            Sub:[
                {
                    Givens:["p","q"],
                    Show: "r",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showAnd"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("p & q"),
            },
            Sub:[

                {
                    Givens:[],
                    Show: "p",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                },
                {
                    Givens:[],
                    Show: "q",
                    children: [],
                    activeBranch: 0,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="given"){

        var pats={

            type:"complete"

        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="givenFalse"){

        var pats={

            type:"complete"


        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="givenOr"){

        var pats={

            type: "given",

            Pattern:{
                Givens: [stringToTree("p | q")],
                Show: stringToTree("r"),
            },
            Sub:[
                {
                    Givens:["p"],
                    Show: "r",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                },
                {
                    Givens:["q"],
                    Show: "r",
                    children: [],
                    activeBranch: 0,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="showOr1"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("p | q"),
            },
            Sub:[

                {
                    Givens:[],
                    Show: "p",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="showOr2"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("p | q"),
            },
            Sub:[

                {
                    Givens:[],
                    Show: "q",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="showAll"){

        var pats={

            type: "show",

            Pattern:{
                Givens: "",
                Show: stringToTree("All x p"),
            },
            Sub:[

                {
                    Givens:["var x"],
                    Show: "p",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showAll2"){

        var pats={

            type: "show",

            Pattern:{
                Givens: "",
                Show: stringToTree("All x (All y p)"),
            },
            Sub:[

                {
                    Givens:["var x", "var y"],
                    Show: "p",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="givenImpFwd"){

        var pats={

            type: "given",

            Pattern:{
                Givens: [stringToTree("p -> q"),stringToTree("p")],
                Show: stringToTree("r"),
            },
            Sub:[
                {
                    Givens:["q"],
                    Show: "r",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="showImpBack"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [stringToTree("p -> r")],
                Show: stringToTree("r"),
            },
            Sub:[
                {
                    Givens:[],
                    Show: "p",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenImpFwd2"){

        var pats={

            type: "given",

            Pattern:{
                Givens: [stringToTree("(p&d)-> q"),stringToTree("p"),stringToTree("d")],
                Show: stringToTree("r"),
            },
            Sub:[
                {
                    Givens:["q"],
                    Show: "r",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showImpBack2"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [stringToTree("(p&d) -> r")],
                Show: stringToTree("r"),
            },
            Sub:[
                {
                    Givens:[],
                    Show: "p",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                },
                {
                    Givens:[],
                    Show: "d",
                    children: [],
                    activeBranch: 0,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenAll"){

       var pats={

            type: "givenAll",

            Pattern:{
                Givens: [stringToTree("All x p")],
                Show: stringToTree("q"),
            },
            Sub:[
                {
                    Givens:["p with term for x"],
                    Show: "q",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        };

        return pats;
    }


                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenNot"){

        var pats={

            type: "given",

            Pattern:{
                Givens: [stringToTree("not q")],
                Show: stringToTree("r"),
            },
            Sub:[
                {
                    Givens:[stringToTree("q->false")],
                    Show: "r",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        }

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showNot"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("not p"),
            },
            Sub:[
                {
                    Givens:["p"],
                    Show: "false",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        }

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="contradiction"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("p"),
            },
            Sub:[
                {
                    Givens:[stringToTree("not p")],
                    Show: "false",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        }

        return pats;
    }

                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showLeqSuc"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("(suc x)<= (suc y)"),
            },
            Sub:[
                {
                    Givens:[],
                    Show: stringToTree("x<=y"),
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
                                
        }

        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showGeqSuc"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("(suc x) >= (suc y)"),
            },
            Sub:[
                {
                    Givens:[],
                    Show: stringToTree("x>=y"),
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        }

        return pats;
    }
                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="natShowSuc"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("(suc x)= (suc y)"),
            },
            Sub:[
                {
                    Givens:[],
                    Show: stringToTree("x=y"),
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        }

        return pats;
    }
                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showEqSwap"){

        var pats={

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("x = y"),
            },
            Sub:[
                {
                    Givens:[],
                    Show: stringToTree("y=x"),
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0,
                    ruleUsed:"?"
                }]
        }

        return pats;
    }

    else{// command doesn't exist :S
        console.log("command does not exits");
        return;
    }

}


function given(){ //not finished yet

    proofTree.walk(function (node) {
        // Halt the traversal by returning false
        if (node.model.children.length == 0 && node.model.activeBranch ==1){

            selectedLeafNode = node.model.Show;
            return false;
        }
    });


    if (selectedLeafNode.type == "variable"){

        previousGivens = getAllGivens(proofTree);

        if ($.inArray(selectedLeafNode, previousGivens)){

            thisIsTrue= 1;
            asda =2;

        }
    }

    else{

        alert("not given");
    }
}





function getAllGivens(proofTree) {// gets all givens in the active path of the tree, untested

    allActiveGivens = [];

    proofTree.walk(function (node) {
        // Halt the traversal by returning false
        if (node.model.activeBranch === 1){

            for (var i = 0; i< node.model.Givens.length; i++){

                allActiveGivens.push(node.model.Givens[i])
            }
        }
    });

    return allActiveGivens;
};

// #### derived rules ####

//
// Rule givenAll2 {g tm1 tm2} { # g1: givenpath tm : term to instantiate
// Path $g
// Given all X {all Y P}; Show Q
// ######
// Given [list P WITH $tm1 FOR X] WITH $tm2 FOR Y ; Show Q
// ## Should be {P WITH $tm1 FOR X} but $ doesn't work inside { }
// ## Bug to be fixed - use [list ] instead of { } until fixed
// }
//





function getCommandSubPart(commandName){

    pats = getCommandPatterns(commandName);


    subPart = pats.Sub;



    return subPart;

}

















































////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////TOOLTIPS!!!!!!!!!!!!!!!!///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












































function getToolTipInfo(commandName){

    info= ""


    if (commandName=="showImp"){

        info = "{Show p -> q} #### {Given p; Show q}";

        return info
    }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenImp"){

        info = "{Given p -> q; Show r} #### {Show p;} {Given q; Show r}";

        return info

    }

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenAnd"){

        info = "{Given p & q; Show r} #### {Given p; Given q; Show r}";

        return info

    }

                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showAnd"){

        info = "{Show p & q} #### {Show p} {Show q}";

        return info

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="given"){

        info = "Current show is given";

        return info;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="givenFalse"){

        info = "Current show false is given";

        return info;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="givenOr"){



        info = "{Given p | q; Show r} #### {Given p; Show r} {Given q; Show r}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="showOr1"){


        info = "{Show p | q} #### {Show p}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="showOr2"){

        info = "{Show p | q} #### {Show q}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="showAll"){

        info = "{Show All x p} #### {Given var x; Show p}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showAll2"){

        info = "{Show All x (All y p)} #### {Given var x; Given var y; Show p}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="givenImpFwd"){

        info = "{Given p -> q; Given p; Show r} #### {Given q; Show r}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    else if (commandName=="showImpBack"){

        info = "{Given p -> r; Show r} #### {Show p}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenImpFwd2"){

        info = "{Given (p&d)-> q; Given p; Given d; Show r} #### {Given q; Show r}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showImpBack2"){

        info = "{Given (p&d) -> r; Show r} #### {Given p; Show r} {Given d; Show r}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenAll"){

        info = "{Given All x p; Show q} #### {Given p WITH term FOR x; Show q}";

        return info;

    }


                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenNot"){

        info = "{Given not q; Show r} #### {Given q->false; Show r}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showNot"){

        info = "{Show not p} #### {Given p; Show false}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="contradiction"){

        info = "{Show p} #### {Given not p; Show false}";

        return info;

    }

                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showLeqSuc"){

        info = "{Show (suc x) <= (suc y)} #### {Show x <= y}";

        return info;

    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showGeqSuc"){

        info = "{Show (suc x) >= (suc y)} #### {Show x >= y}";

        return info;

    }
                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="natShowSuc"){

        info = "{Show (suc x) = (suc y)} #### {Show x = y}";

        return info;

    }

}
*/