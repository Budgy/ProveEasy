function allCommands(){

	 var commandsList={

		showImp:{

			type: "show",

			Pattern:{
				Givens: "",
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
		},

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		givenImp:{

			type: "given",

			Pattern:{
				Givens: stringToTree("p -> q"),
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
		},

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		givenAnd:{

			type: "given",

			Pattern:{
				Givens: stringToTree("p & q"),
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
		},

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		showAnd:{

			type: "show",

			Pattern:{
				Givens: "",
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
		},

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		given:{

			type:"complete"


		}


	};
	return commandsList
}





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function getCommandPatterns(commandName){

	commandsList = allCommands(); // get list of commands

	if (commandsList.hasOwnProperty(commandName)){// if the selected command is in the list then return the patterns

		return commandsList[commandName];

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

			thisIsTrue= 1
			asda =2

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
		
	
	
	
// Rule givenAnd {g} {
// Path $g
// Given P & Q; Show R
// #####
// Given P; Given Q; Show R
// }
//

//
// Rule givenAll {g tm} { # g1: givenpath tm : term to instantiate
// Path $g
// Given all X P; Show Q
// ######
// Given P WITH $tm FOR X; Show Q
// }
//
// Rule showAnd {} {
// Show P & Q
// #####
// Show P
// Show Q
// }
//
// Rule showImp {} {
// Show P -> Q
// #####
// Given P; Show Q
// }
//		
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
//
// Rule showImpBack {g} {
// Path $g
// Given PP -> RR
// Show RR
// ######
// Show PP
// }
// Rule showImpBack2 {g} {
// Path $g
// Given {PP & QQ} -> RR
// Show RR
// ######
// Show PP
// Show QQ
// }
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
	
	
	
	
	
	
