	function givenAnd(tree, indexInTree){
		
		sequents = find(tree,indexInTreeOfGiven);
		
		showSequent = sequents[sequents.length][2];
		index = showSequent.indexOf("&");
		
			addShow();
			addGiven();
			addGiven();
			
			return tree;
	}
	function showImp(tree, nodeOfTree){
		
		showsAndGivens= find(tree, nodeOfTree);
		
		
		
	}
	// Rule showImp {} {
	// Show P -> Q
	// #####
	// Given P; Show Q
	// }
	
	
	
	
	
// Rule givenAnd {g} {
// Path $g
// Given P & Q; Show R
// #####
// Given P; Given Q; Show R
// }
//
// Rule givenImp {g} {
// Path $g
// Given P -> Q; Show R
// #####
// Show P
// Given Q; Show R
// }
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
	
	
	
	
	
	
