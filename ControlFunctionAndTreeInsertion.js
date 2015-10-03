/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function insertIntoTree(subNodes, proofTree){

    proofTree.walk(function (node) {

        if (node.model.children.length == 0 && node.model.activeBranch ==1){// look for active leaf in tree

            nodeId = node.model.id;
            newNumberForID= 0;

            tree = new TreeModel();

            for (var i = 0; i<subNodes.length;i++){// for each new node at it to the node just found

                newNumberForID += 1;
                var currentNode = tree.parse(subNodes[i]);
                currentNode.model.id = "" + nodeId + newNumberForID;
                node.addChild(currentNode);

            }   
            return false;
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function controlFunction(command, proofTree){

    //get patterns
    var patterns = getCommandPatterns(command);

    //seperate patterns
    pattern = patterns.Pattern;
    sub = patterns.Sub;

    if (patterns.type == "show"){ //if a show rule is selected


        proofTree.walk(function (node) {
            // Halt the traversal by returning false
            if (node.model.children.length == 0 && node.model.activeBranch ==1){//fine active leaf

                //match node to the pattern
                matches = nodeMatching(pattern, node, patterns.type);
                
            }
        });

        // substitute and then insert the new node into the proof tree
        subNodes = substitute(matches, sub);
        insertIntoTree(subNodes, proofTree);
    }

    if (patterns.type == "given"){// if a given rule is chosen

        alert("please select a given to apply the rule to");

        // flag to show that the next clicked given should be passed to the continueControl function
        givenRuleSelected = 1;

    }
}


function continueControl (givenLine, proofTree, command){

    //get given selected
    var givenSplit= givenLine.split(" ")
    var givenSelected= givenSplit[1];
    var matches = " ";

    //get the command patterns
    var patterns = getCommandPatterns(command);

    //seperate the parts into the pattern which is used for matching and the sub which is used in substitution
    pattern = patterns.Pattern;
    sub = patterns.Sub;

    // for listening to the givens after a given rule is chosen
    givenRuleSelected =0;

    proofTree.walk(function (node) {

        
        // Halt the traversal by returning false

        for (var i = 0; i < node.model.Givens.length;i++){// for each given in the list of Givens for this node


            if (displayTree(node.model.Givens[i])==givenSelected && node.model.activeBranch ===1){// if givens match and it's an active branch

                proofTree.walk(function (node2) {
                // Halt the traversal by returning false
                    if (node2.model.children.length === 0 && node2.model.activeBranch ===1){// if it is a leaf and is active

                         applicableShow = node2.model.Show; //get the show from it

                         if (typeof applicableShow == 'string'){// if the show is a string, make it a tree

                            applicableShow = stringToTree(applicableShow);

                         }
                    }
                });

                var tree = new TreeModel();

                newNode = tree.parse({// parse the new node into a tree
        
                Show: applicableShow, //show must be in tree form, maybe create seperate element for it?
                Givens: node.model.Givens[i]
                        
                });

                //carry out matching
                matches = nodeMatching(pattern, newNode,patterns.type);
            }

            if (displayTree(node.model.Givens[i])==givenSelected && node.model.activeBranch ===0){//if givens match but is not an active branch

                    alert("given selected is not in the currently selected branch");
                    
            }

        }

    });

    if (matches==""){
        alert("no match with selected given");
    }
    else{

        //sub the matches into the subNode
        subNodes = substitute(matches, sub);
        //insert this into the proofTree
        insertIntoTree(subNodes, proofTree);

    }   
}