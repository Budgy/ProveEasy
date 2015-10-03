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

                        if (GivenVariables[i].model.value == node.model.Show.model.value){// if there is a match then that branch is complete

                            var lengthCheck = displayTree(GivenVariables[i]);
                            lengthCheck = lengthCheck.replace('(', '');
                            lengthCheck = lengthCheck.replace(')', '');

                            if (lengthCheck != "false"){
                                
                                if(lengthCheck.length>1){

                                alert("not given");
                                return false;

                            }      
                                
                                
                            }
                            

                            node.model.completeBranch = 1;

                            var hasBeenMatch =0;


                            proofTree.walk(function (node) {
                                // Halt the traversal by returning false
                                if (node.model.children.length == 0 &&node.model.completeBranch==0){//find active leaf

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

                       }
                

                    }
                    //there is no match
                    alert("not given");
                    return false;       

                }
            });
    }

  /*  if (patterns.type == "showAll"){ //if a show rule is selected
        
        
        
         proofTree.walk(function (node) {
            // Halt the traversal by returning false
            if (node.model.children.length == 0 && node.model.activeBranch ==1){//find active leaf


                thisApplicableShow = node.model.Show; //get the show from it

                 if (typeof thisApplicableShow == 'string'){// if the show is a string, make it a tree

                    thisApplicableShow = stringToTree(thisApplicableShow);

                 }
                
                
                var tree = new TreeModel();

                        newShowNode = tree.parse({// parse the new node into a tree

                            Show: thisApplicableShow, //show must be in tree form, maybe create seperate element for it?
                            Givens: node.model.Givens

                        });

                        //match node to the pattern
                        matches = nodeMatching(pattern, newShowNode, patterns.type);
                        return false;
                
            }
         });
        
        
        //get varibales that need to have new ones made
        
        var givenVariablesToChange= [];
        
        for (var given in sub.Givens){
            
            givenVariableToChange.push(given);
            
            
        }
        
        for (var match in matches){//create the new variable and assign it to the match
            
            if($.inArray(match, givenVariablesToChange)){
                
                matches.match = matches.match+"_";
                
            }
            
        }
        
        
        
        // substitute and then insert the new node into the proof tree
        subNodes = substitute(matches, sub);
        
        insertIntoTree(subNodes, proofTree);
        
    }
    
*/
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
        });

        if(matches == ""){

            alert("no match");
            return;

        }

        // substitute and then insert the new node into the proof tree
        subNodes = substitute(matches, sub);
        insertIntoTree(subNodes, proofTree);
    }

    else if (patterns.type == "given"){// if a given rule is chosen


        if  (selectedGivens.length<1){
            alert("no given selected");
            return


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
    
    
    
    for (var i =0; i<givenIDs.length;i++){
        
            //get given selected
        var givenSplit= givenIDs[i].id.split("1given");
        var givenSelected= givenSplit[1];
        var nodeIDTemp = givenSelected.split(".");
        
        nodeID = nodeIDTemp[0];
        
    }
    
    var matches = "";

     //get the command patterns
     var patterns = getCommandPatterns(command);

    //seperate the parts into the pattern which is used for matching and the sub which is used in substitution
    pattern = patterns.Pattern;
    sub = patterns.Sub;


     proofTree.walk(function (node) {

        applicableGivens = [];
        
        if (node.model.id== nodeID&& node.model.activeBranch ===1){
            
            for (var i=0;i<node.model.Givens.length;i++){
                
                applicableGivens[i] =node.model.Givens[nodeID[i]-1]
                
            }
            
            
            
            
            

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
                return false;

        }

        else if (node.model.id== nodeID&& node.model.activeBranch ===0){//if givens match but is not an active branch

            alert("given selected is not in the currently selected branch");
            return false;
    
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