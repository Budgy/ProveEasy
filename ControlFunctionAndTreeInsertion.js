/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function insertIntoTree(subNodes, proofTree, commandTracker){//insertion into tree

    proofTree.walk(function (node) {//walk the proof

        if (node.model.children.length == 0 && node.model.activeBranch ==1){// look for the active leaf in tree

            //get its id
            nodeId = node.model.id;
            newNumberForID= 0;

            tree = new TreeModel();

            for (var i = 0; i<subNodes.length;i++){// for each new node to be inserted add it to the node just found

                //creates the new id
                newNumberForID += 1;
                var currentNode = tree.parse(subNodes[i]);
                currentNode.model.id = "" + nodeId + newNumberForID;

                //set the rule used
                node.model.ruleUsed = commandTracker;

                //add node to tree
                node.addChild(currentNode);

            }   

            //end walk
            return false;
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function controlFunction(selectedGivens,command, proofTree){

    //get patterns
    var patterns = getCommandPatterns(command);

    //seperate patterns
    pattern = patterns.Pattern;
    sub = patterns.Sub;

    if (patterns.type == "complete"){// if the complete rule is selected, here we are searching the proof for a given that matches the active show

        //get list of all givens in the active path
        var GivenVariables= getGivenVariables(proofTree);

        proofTree.walk(function (node) {//walk the tree

            if (node.model.children.length == 0 && node.model.activeBranch ==1){//find active leaf
                
                for (var i =0; i<GivenVariables.length;i++){//compare the show to each given in path

                    //get string values for comparisons
                    var stringCheckGiven = displayTree(GivenVariables[i]);
                    var stringCheckShow = displayTree(node.model.Show);

                    if (stringCheckShow != stringCheckGiven &&i ==GivenVariables.length-1){

                        alert("not given");
                        return false;

                    }
                    
                    if(stringCheckShow == stringCheckGiven){//if they match

                        //set the node to be complete
                        node.model.completeBranch = 1;
                        //set the rule used
                        node.model.ruleUsed = command;
                        //intialise variable
                        var hasBeenMatch =0;

                        proofTree.walk(function (node) {
                            // Halt the traversal by returning false
                            if (node.model.children.length == 0 &&node.model.completeBranch==0){//find incomplete branch and switch to it

                                hasBeenMatch =1;
                                changeToThisBranchPath(node.model.id,proofTree);
                                return false;

                            }
                        });

                        if (hasBeenMatch ==0){//if no incomplete branch was found to switch to then the prof is complete

                            alert("proofComplete");
                            return false;

                        }
                        if (hasBeenMatch == 1){//otherwise reset the variable

                            hasBeenMatch= 0;
                            return false;

                        }
                    }
                }
                //there is no match
                alert("not given");
                return false;       
            }
        });
    }

    else if (patterns.type == "show"){ //if a show rule is selected

        proofTree.walk(function (node) {//walk the tree

            // Halt the traversal by returning false
            if (node.model.children.length == 0 && node.model.activeBranch ==1){//find active leaf

                thisApplicableShow = node.model.Show; //get the show from it

                 if (typeof thisApplicableShow == 'string'){// if the show is a string, make it a tree

                    thisApplicableShow = stringToTree(thisApplicableShow);
                    
                 }
                
                //now get the required givens matches
                if (!selectedGivens.length==0){//if givens are selected
                    
                    var nodeID = [];
    
                    for (var i =0; i<selectedGivens.length;i++){//for each given that is selected, get the node id for it

                        //get given selected
                        var givenSplit= selectedGivens[i].id.split("1given");
                        var givenSelected= givenSplit[1];
                        var nodeIDTemp = givenSelected.split(".");

                        nodeID = nodeIDTemp[0];

                    }
                    
                    proofTree.walk(function (node) {//walk the tree

                        for (var given in nodeID){//for each given id

                            //initialise storage variablee
                            applicableGivens = [];

                            if (node.model.id== nodeID&& node.model.activeBranch ===1) {//if the ids match and the branch is active

                                for (var i=0;i<node.model.Givens.length;i++){//for each given in the node

                                    //get the applicable given
                                    applicableGivens[i] =node.model.Givens[nodeID[i]-1]

                                }

                                var tree = new TreeModel();

                                newShowNode = tree.parse({// parse the new node into a tree

                                    Show: thisApplicableShow, //show must be in tree form, maybe create seperate element for it?
                                    Givens: applicableGivens

                                });

                                //match node to the pattern
                                matches = nodeMatching(pattern, newShowNode, patterns.type);
                                return false;

                            }
                        }
                    });
                    
                    
                }else{//givens were not selected

                    if (pattern.Givens.length>0){//if the pattern contains givens

                        var tree = new TreeModel();

                        newShowNode = tree.parse({// parse the new node into a tree

                            Show: thisApplicableShow, //show must be in tree form, maybe create seperate element for it?
                            Givens: node.model.Givens

                        });
                        
                        //get matches
                        matches = nodeMatching(pattern, newShowNode, patterns.type);
                        return false;

                    }else{

                        var tree = new TreeModel();

                        newShowNode = tree.parse({// parse the new node into a tree

                            Show: thisApplicableShow, //show must be in tree form, maybe create seperate element for it?
                            Givens: []

                        });

                        //match node to the pattern
                        matches = nodeMatching(pattern, newShowNode, patterns.type);
                        return false;

                    }
                }
            }
        });

        //if matches is empty at this point, then no match
        if(matches == ""){

            alert("no match");
            return;

        }

        // substitute and then insert the new node into the proof tree
        subNodes = substitute(matches, sub);

        var commandTracker = command; //variable to keep track of what command was used on what so that it can then be displayed to the user
  
        for (var i =0; i<selectedGivens.length;i++){//for each selected given, append it to the command tracker
            
            //get given selected
            var givenSplit= selectedGivens[i].id.split("1given");
            var givenSelected= givenSplit[1];
            commandTracker = commandTracker +" "+givenSelected;
            
        }
        //insert the new nodes into tree
        insertIntoTree(subNodes, proofTree, commandTracker);
    }

    else if (patterns.type.startsWith("given")){// if a given rule is chosen

        if  (selectedGivens.length<1){//if no selected givens

            alert("no given selected");
            return;

        }

        else if (selectedGivens.length>patterns.Pattern.Givens.length){//more givens are selected than are in the pattern

            alert("too many givens for selected rule");
            return;

        }else if(selectedGivens.length<patterns.Pattern.Givens.length) {//less givens are selected than are in the pattern
            alert("too few givens selected");
            return;
        
        }else{

            //hand over to the givenControl function
            givenControl(selectedGivens,proofTree, command);

        }
    }
}








function givenControl (givenIDs, proofTree, command){//given control function

    var nodeID = [];
    var givenMiniID = [];
    var commandTracker = command; //variable to keep track of what command was used on what so that it can then be displayed to the user
  
    for (var i =0; i<givenIDs.length;i++){//for each given id
        
        //get given selected
        var givenSplit= givenIDs[i].id.split("1given");
        var givenSelected= givenSplit[1];
        var commandTracker = commandTracker +" "+givenSelected;
        var nodeIDTemp = givenSelected.split(".");
        
        //add the id and then mini id:     1.3 = id is 1 and mini id is 3
        nodeID.push(nodeIDTemp[0]);
        givenMiniID.push(nodeIDTemp[1]);
        
    }
    
    //initialise the matches variable
    var matches = "";

    //get the command patterns
    var patterns = getCommandPatterns(command);

    //seperate the parts into the pattern which is used for matching and the sub which is used in substitution
    pattern = patterns.Pattern;
    sub = patterns.Sub;

    ///initialise variable
    var applicableGivens = [];

    proofTree.walk(function (node) {//walk through the proof tree

        for (var i = 0; i<nodeID.length;i++){// for each given

            if (node.model.id== nodeID[i]&& node.model.activeBranch ===1){// check if id matches, and if it is active
                
                for (var i=0;i<node.model.Givens.length;i++){//get all givens contained in the node with matching id
                    
                    applicableGivens.push(node.model.Givens[givenMiniID[i]-1]);
                    
                }

            }else if (node.model.id== nodeID && node.model.activeBranch ===0){//if given matches but is not an active branch

                alert("given selected is not in the currently selected branch");
                return false;
        
            }
        }
    });

    proofTree.walk(function (node2) {//walk the tree again

        // Halt the traversal by returning false
        if (node2.model.children.length === 0 && node2.model.activeBranch ===1){// if it is a leaf and is active

            applicableShow = node2.model.Show; //get the show from it

            if (typeof applicableShow == 'string'){// if the show is a string, make it a tree

                applicableShow = stringToTree(applicableShow);

            }

            //end walk
            return false;
        }
    });
    

    var tree = new TreeModel();

    newNode = tree.parse({// parse the new node into a tree

    Show: applicableShow, //show must be in tree form, maybe create seperate element for it?
    Givens: applicableGivens
            
    });

    //carry out matching
    matches = nodeMatching(pattern, newNode, patterns.type);
    
    if (matches==""){//if no matches

        alert("no match with selected given");

    }else{


        if (patterns.type == "givenAll"){//if the given rule is given all 


            givenAllControlFunctionPart1(matches, sub, command, commandTracker);


        }else{//otherwise

            //sub the matches into the subNode
            subNodes = substitute(matches, sub);
            //insert this into the proofTree
            insertIntoTree(subNodes, proofTree, commandTracker);
        }
    }
}