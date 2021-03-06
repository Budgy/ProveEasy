function allCommands(){

    var commandsList={

        given:"",

        givenFalse:"",

        givenAnd:"",

        showAnd:"",

        showImp:"",

        givenImp:"",

        givenOr:"",

        showOr1:"",

        showOr2:"",

        showAll:"",

        showAll2:"",

        givenAll:"",

        givenImpFwd:"",
   
        showImpBack:"",

        //givenImpFwd2:"",

        //showImpBack2:"",

        givenNot:"",
        
        showNot:"",
        
        contradiction:"",
        
        //showLeqSuc:"",
        
        //showGeqSuc:"",
        
        //natShowSuc:"",

        //showEqSwap:"",

        //givenEx:""


    };
    return commandsList;
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getCommandPatterns(commandName){//returns the pattern for a given rule

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
                            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="givenEx"){

        var pats={

            type: "given",

            Pattern:{
                Givens: [stringToTree("Ex x p")],
                Show: stringToTree("r"),
            },
            Sub:[
                {
                    Givens:["var x",stringToTree("p")],
                    Show: stringToTree("r"),
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





function getCommandSubPart(commandName){//returns only the sub pattern for a given rule

    pats = getCommandPatterns(commandName);

    subPart = pats.Sub;

    return subPart;

}









////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////TOOLTIPS!!!!!!!!!!!!!!!!///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function getToolTipInfo(commandName){//description of all rules for tooltips

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