function initialiseTree(sequent) {

	var tree = new Array();
	tree[0] = new Array();
	tree[0][0] = new Array();
	tree[0][0][0] = 1;
	tree[0][0][1] = "Show ";
	tree[0][0][2] = sequent;

	addGiven(tree, "maithu");
	addGiven(tree, "enToAdd");
	addGiven(tree, "jamie");
	thing = givenAnd(tree, 1);

	// tree is a list of list of lists, each containing [[*[node number, given,
	// sequent], [node number, show, sequent]]]
	return tree;

}

function addGiven(tree, givenToAdd) {

	var lastElement = new Array();
	lastElement[0] = tree[tree.length - 1];

	newNodeNumber = parseFloat(lastElement[0][0]) + parseFloat(0.1);

	// #floatinaccuracy
	tree.splice(tree.length, 0, [ newNodeNumber.toFixed(2), "Given ",
			givenToAdd ]);
	return tree;
}

function addShow(tree, showToAdd) {

	var lastElement = new Array();
	lastElement[0] = tree[tree.length - 1];

	if (lastElement[0][1] == "Given ") {

		newNodeNumber = parseInt(lastElement[0][0], 10) + "1";
		tree.splice(tree.length, 0, [ newNodeNumber, "Show ", showToAdd ]);

	} else if (lastElement[0][1] == "Show ") {

		newNodeNumber = parseInt(lastElement[0][0] + "1");
		tree.splice(tree.length, 0, [ newNodeNumber, "Show ", showToAdd ]);
	}
	return tree;
}

function getGivens(tree) {

	listOfGivens = new Array();

	for ( var i = 0; i < tree.length; i++) {

		if (tree[i][1] == "Given ") {

			listOfGivens.push(tree[i][2]);

		}
		return listOfGivens;
	}
}

// traversal
function find(tree, nodeNumber) {

	for ( var i = 0; i < tree.length; i++) {
		for ( var j = 0; j < tree[i].length; j++) {
			if (tree[i][j][0] == nodeNumber) {
				sequents[0] = new Array();
					sequents = tree[i][j];
			}

		}

	}

	return sequent;
}

function goBackwards() {

	treesapient = new TreeModel();

	root = treesapient.parse({
	    id: 1,
	    children: [
	        {
	            id: 11,
	            children: [{id: 111}],
	            Givens: [{formulas:'a'},{formulas:'b'}],
	            Show: [{formulas:'c'}]
	           
	        },
	        {
	            id: 12,
	            children: [{id: 121}, {id: 122}]
	        },
	        {
	            id: 13
	        }
	    ]
	});
	
	
	
	
	
	
	
}
