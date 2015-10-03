/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function insertIntoTree(subNodes, proofTree, commandTracker){

    proofTree.walk(function (node) {

        if (node.model.children.length == 0 && node.model.activeBranch ==1){// look for active leaf in tree

            nodeId = node.model.id;
            newNumberForID= 0;

            tree = new TreeModel();

            for (var i = 0; i<subNodes.length;i++){// for each new node at it to the node just found

                newNumberForID += 1;
                var currentNode = tree.parse(subNodes[i]);
                currentNode.model.id = "" + nodeId + newNumberForID;

                    node.model.ruleUsed = commandTracker;

                node.addChild(currentNode);

            }   
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

    if (patterns.type == "complete"){// if the complete rule is selected


            var GivenVariables= getGivenVariables(proofTree);

            proofTree.walk(function (node) {

                if (node.model.children.length == 0 && node.model.activeBranch ==1){//find active leaf

                    
                    for (var i =0; i<GivenVariables.length;i++){//compare the show to each given in path

                      //  if (GivenVariables[i].model.value == node.model.Show.model.value){// if there is a match then that branch is complete

                            var stringCheckGiven = displayTree(GivenVariables[i]);
                            var stringCheckShow = displayTree(node.model.Show);
                            

                            if (stringCheckShow != stringCheckGiven &&i ==GivenVariables.length-1){

                                alert("not given");
                                return false;

                            }
                            

                            node.model.completeBranch = 1;
                            node.model.ruleUsed = command;

                            var hasBeenMatch =0;


                            proofTree.walk(function (node) {
                                // Halt the traversal by returning false
                                if (node.model.children.length == 0 &&node.model.completeBranch==0){//find incomplete branch and switch to it

                                    hasBeenMatch =1;
                                    changeToThisBranchPath(node.model.id,proofTree);
                                    return false;

                                }
                            });

                            if (hasBeenMatch ==0){

                                alert("proofComplete");
                                return false;

                            }
                            if (hasBeenMatch == 1){

                            hasBeenMatch= 0;
                            return false;

                            }

                      // }
                

                    }
                    //there is no match
                    alert("not given");
                    return false;       

                }
            });
    }

    else if (patterns.type == "show"){ //if a show rule is selected

        
        proofTree.walk(function (node) {
            // Halt the traversal by returning false
            if (node.model.children.length == 0 && node.model.activeBranch ==1){//find active leaf


                thisApplicableShow = node.model.Show; //get the show from it

                 if (typeof thisApplicableShow == 'string'){// if the show is a string, make it a tree

                    thisApplicableShow = stringToTree(thisApplicableShow);
                    

                 }
                
                //now get the required givens matches

                if (!selectedGivens.length==0){//if givens are selected
                    
                    
                    
                    var nodeID = [];
    
    
    
                    for (var i =0; i<selectedGivens.length;i++){

                        //get given selected
                        var givenSplit= selectedGivens[i].id.split("1given");
                        var givenSelected= givenSplit[1];
                        var nodeIDTemp = givenSelected.split(".");

                        nodeID = nodeIDTemp[0];

                    }

                    
                    proofTree.walk(function (node) {

                        for (var given in nodeID){


                            applicableGivens = [];

                            if (node.model.id== nodeID&& node.model.activeBranch ===1) {


                                for (var i=0;i<node.model.Givens.length;i++){

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
                    
                    
                    }else{



                        if (pattern.Givens.length>0){

                            var tree = new TreeModel();

                            newShowNode = tree.parse({// parse the new node into a tree

                                Show: thisApplicableShow, //show must be in tree form, maybe create seperate element for it?
                                Givens: node.model.Givens

                            });
                            

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

        if(matches == ""){

            alert("no match");
            return;

        }

        // substitute and then insert the new node into the proof tree
        subNodes = substitute(matches, sub);


        var commandTracker = command; //variable to keep track of what command was used on what so that it can then be displayed to the user
  
        for (var i =0; i<selectedGivens.length;i++){
            
                //get given selected
            var givenSplit= selectedGivens[i].id.split("1given");
            var givenSelected= givenSplit[1];
            commandTracker = commandTracker +" "+givenSelected;
            
        }


        insertIntoTree(subNodes, proofTree, commandTracker);
    }

    else if (patterns.type.startsWith("given")){// if a given rule is chosen


        if  (selectedGivens.length<1){
            alert("no given selected");
            return;


        }
        else if (selectedGivens.length>patterns.Pattern.Givens.length){

            alert("too many givens for selected rule");
            return;


        }else if(selectedGivens.length<patterns.Pattern.Givens.length) {
            alert("too few givens selected");
            return;
        
        
        }else{

            givenControl(selectedGivens,proofTree, command);

        }


    }
}


function givenControl (givenIDs, proofTree, command){


    var nodeID = [];
    var givenMiniID = [];
    var commandTracker = command; //variable to keep track of what command was used on what so that it can then be displayed to the user
  
    for (var i =0; i<givenIDs.length;i++){
        
            //get given selected
        var givenSplit= givenIDs[i].id.split("1given");
        var givenSelected= givenSplit[1];
        var commandTracker = commandTracker +" "+givenSelected;
        var nodeIDTemp = givenSelected.split(".");
        
        nodeID.push(nodeIDTemp[0]);
        givenMiniID.push(nodeIDTemp[1]);
        
    }
    
    var matches = "";

     //get the command patterns
     var patterns = getCommandPatterns(command);

    //seperate the parts into the pattern which is used for matching and the sub which is used in substitution
    pattern = patterns.Pattern;
    sub = patterns.Sub;

    var applicableGivens = [];

    proofTree.walk(function (node) {

        for (var i = 0; i<nodeID.length;i++){// for each given

            if (node.model.id== nodeID[i]&& node.model.activeBranch ===1){// check if id matches, and if it is active
                
                for (var i=0;i<node.model.Givens.length;i++){
                    
                    applicableGivens.push(node.model.Givens[givenMiniID[i]-1]);
                    
                }

            }else if (node.model.id== nodeID && node.model.activeBranch ===0){//if given matches but is not an active branch

                alert("given selected is not in the currently selected branch");
                return false;
        
            }


        }

    });


    proofTree.walk(function (node2) {
        // Halt the traversal by returning false
        if (node2.model.children.length === 0 && node2.model.activeBranch ===1){// if it is a leaf and is active

             applicableShow = node2.model.Show; //get the show from it

            if (typeof applicableShow == 'string'){// if the show is a string, make it a tree

                applicableShow = stringToTree(applicableShow);

            }

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
    
    if (matches==""){

        alert("no match with selected given");

    }else{


        if (patterns.type == "givenAll"){


            givenAllControlFunctionPart1(matches, sub, command, commandTracker);


        }else{

            //sub the matches into the subNode
            subNodes = substitute(matches, sub);
            //insert this into the proofTree
            insertIntoTree(subNodes, proofTree, commandTracker);
        }
    }   




}