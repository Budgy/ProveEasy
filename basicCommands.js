function allCommands(){

    var commandsList={

        showImp:"",

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        givenImp:"",

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        givenAnd:"",

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        showAnd:"",

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        given:"",
        
        givenFalse:"",

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        givenOr:"",

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        showOr1:"",

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        showOr2:"",

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        showAll:"",


        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        givenImpFwd:"",
        givenAll:"",


        // Rule givenImpFwd {g1 g2} {
        // Path $g1 $g2
        // Given PP -> QQ
        // Given PP
        // Show RR
        // ######
        // Given QQ
        // Show RR
        // }
        // 
        // 
        // Rule showImpBack {g} {
        // Path $g
        // Given PP -> RR
        // Show RR
        // ######
        // Show PP
        // }   

        showImpBack:"",



        // Rule givenImpFwd2 {g1 g2 g3} {
        // Path $g1 $g2 g3
        // Given {PP1 & PP2} -> QQ
        // Given PP1
        // Given PP2
        // Show RR
        // ######
        // Given QQ
        // Show RR
        // }


        givenImpFwd2:"",

        // Rule showImpBack2 {g} {
        // Path $g
        // Given {PP & QQ} -> RR
        // Show RR
        // ######
        // Show PP
        // Show QQ
        // }

        showImpBack2:""

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
        givenNot:{

            type: "given",

            Pattern:{
                Givens: [stringToTree("¬p")],
                Show: stringToTree("r"),
            },
            Sub:[
                {
                    Givens:["p->false"],
                    Show: "r",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0
                }]
        },
        
        
         showNot:{

            type: "show",
/*
            Pattern:{
                Givens: [],
                Show: stringToTree("¬p"),
            },
            Sub:[
                {
                    Givens:["p"],
                    Show: "false",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0
                }]
        },

        
        contradiction:{

            type: "show",
/*
            Pattern:{
                Givens: [],
                Show: stringToTree("p"),
            },
            Sub:[
                {
                    Givens:["¬p"],
                    Show: "false",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0
                }]
        },
        
        
        showLeqSuc:{

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("(suc x)<= (suc y)"),
            },
            Sub:[
                {
                    Givens:[],
                    Show: "x<=y",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0
                }]
                
                
        },
        
        showGeqSuc:{

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("(suc x) >= (suc y)"),
            },
            Sub:[
                {
                    Givens:[],
                    Show: "x>=y",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0
                }]
        },
        
        natShowSuc:{

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("(suc x)= (suc y)"),
            },
            Sub:[
                {
                    Givens:[],
                    Show: "x=y",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0
                }]
        },

        showEqSwap:{

            type: "show",

            Pattern:{
                Givens: [],
                Show: stringToTree("x = y"),
            },
            Sub:[
                {
                    Givens:[],
                    Show: "y=x",
                    children: [],
                    activeBranch: 1,
                    id: 0,
                    completeBranch:0
                }]
        }

        */
        




    };
    return commandsList;
}























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
                completeBranch:0
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
                    completeBranch:0
                },
                {
                    Givens:["q"],
                    Show: "r",
                    children: [],
                    activeBranch: 0,
                    id: 0,
                    completeBranch:0
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
                    completeBranch:0
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
                    completeBranch:0
                },
                {
                    Givens:[],
                    Show: "q",
                    children: [],
                    activeBranch: 0,
                    id: 0,
                    completeBranch:0
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
                    completeBranch:0
                },
                {
                    Givens:["q"],
                    Show: "r",
                    children: [],
                    activeBranch: 0,
                    id: 0,
                    completeBranch:0
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
                    completeBranch:0
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
                    completeBranch:0
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
                    completeBranch:0
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
                    completeBranch:0
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
                    completeBranch:0
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
                    completeBranch:0
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
                    completeBranch:0
                },
                {
                    Givens:[],
                    Show: "q",
                    children: [],
                    activeBranch: 0,
                    id: 0,
                    completeBranch:0
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
                    completeBranch:0
                }]
        };

        return pats;
    }

// Rule givenAll {g tm} { # g1: givenpath tm : term to instantiate
//         Path $g
//     Given all X P; Show Q
//     ######
//     Given P WITH $tm FOR X; Show Q
//     }


   /*                 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showImp"){

        var pats=







        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showImp"){

        var pats=







        return pats;
    }

                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    else if (commandName=="showImp"){

        var pats=







        return pats;
    }
*/
                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////






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

// Rule showImp {} {
// Show P -> Q
// #####
// Given P; Show Q
// }

// Rule givenImp {g} {
// Path $g
// Given P -> Q; Show R
// #####
// Show P
// Given Q; Show R
// }
//
// Rule showAll {} {
// Show all X P
// ######
// Given var X; Show P
// # makes a fresh x at proof time
// }
//
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
// Rule showAll2 {} {
// Show all X {all Y P}
// ######
// Given var X; Given var Y; Show P
// }
//	





function getCommandSubPart(commandName){

    pats = getCommandPatterns(commandName);


    subPart = pats.Sub;



    return subPart;

}
