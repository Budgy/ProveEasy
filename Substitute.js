/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function substitute (matches, commandSubNode){


    var newVarNeeded=false;

    //check if any are empty

    if (jQuery.isEmptyObject(matches)){

        console.log("givenMatches is empty");
        return;
    }

    if (jQuery.isEmptyObject(commandSubNode)){

        console.log("commandSubNode is empty");
        return;
    }


    for (var i =0; i<commandSubNode.length;i++){//for each node in the sub pattern

        currentNode = commandSubNode[i];

        for (var j =0; j<currentNode.Givens.length;j++){//for each given in each node


            if (typeof currentNode.Givens[j] == 'object'){//if the current given is a tree then walk through it

                currentNode.Givens[j].walk(function(node){ //walk through given

                    if(matches.hasOwnProperty(node.model.value)){//if the value of the given is in matches

                        if(typeof matches[node.model.value] == 'object'){//if the value for that match in matches is an object(tree)

                            //manually set the children
                           node.children = matches[node.model.value].children;

                           if(node.hasOwnProperty('parent')){//if it has a parent field then also set the parents for each child that was just added

                               for (var i = 0; i<node.parent.model.children.length;i++){

                                    if (node.parent.model.children[i].value == node.model.value){

                                        node.parent.model.children[i] = matches[node.model.value].model;

                                    }
                               }
                           }

                            node.model = matches[node.model.value].model;

                        }else{

                            node.model.value = matches[node.model.value];

                        }
                    }
                });

            }else{

                if(currentNode.Givens[j].indexOf("var ") > -1){//if it has var at the start in the sub node then a new variable needs to be created and changed throughout the rest of the matches

                    //remove it but set the flag
                    currentNode.Givens[j] = currentNode.Givens[j].replace("var ","");
                    newVarNeeded=true;

                }

                if(matches.hasOwnProperty(currentNode.Givens[j])){//if matches has a key of the same name

                    if (newVarNeeded){

                        //go through the matches creating a new variable
                        matches = replaceVariableInTree(matches, matches[currentNode.Givens[j]]);
                        newVarNeeded=false;

                    }

                    //change the value of the given to the value stored in matches which corosponds to the key
                    currentNode.Givens[j] = matches[currentNode.Givens[j]];

                }
            }
        }

        //handle differently depending if the show is in tree form or a string

        if (typeof currentNode.Show == 'object'){//if it is an object (tree)

             currentNode.Show.walk(function(node){

                    if(matches.hasOwnProperty(node.model.value)){//if the value in the sub is in matches then substitute the match value

                        node.model.value = matches[node.model.value];

                    }

                });

        }else {//it should be a string

            if (matches.hasOwnProperty(currentNode.Show)){//if matches contains the show

                //sub the value in
                currentNode.Show = matches[currentNode.Show];

                if (typeof currentNode.Show == "string"){//if this is a string convert it to tree form

                    currentNode.Show = stringToTree(currentNode.Show);

                }
            }
        }
    }
    return commandSubNode;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function replaceVariableInTree(matches, variable){//handles creation of a new variable during showAll, takes a variable, appends _ and then replaces it in the matches

    //append new ending
    newVar = variable+"_";

    //need to separate the link between matches and the original proofTree
    newMatches= cloneControlFunction(matches);


    Object.keys(newMatches).forEach(function(key) {//for each key in the matches


        if (typeof newMatches[key]== "string"){//if it is not a node or tree segment

            if (newMatches[key]==variable){//if it matches, replace

                newMatches[key]=newVar;
            }

        }else{ //else it is a tree so walk through, replacing as you go

            tree = new TreeModel();
            
            newMatches[key] = tree.parse(newMatches[key]);

            newMatches[key].walk({strategy: 'breadth'}, function (thisNode) {

                if (thisNode.model.value==variable){//if the value in the node matches, then replace

                    thisNode.model.value=newVar;

                }

            });

        }


    });

    //return the new matches
    return newMatches;
}




//////////////////////////////////////////////////////////////Start of given all control////////////////////////////////////////////////////////////////////////////


function givenAllControlFunctionPart1(matches, commandSubNode, commandName, commandTracker){//special function for given all rule

    //confirm no empty variables
    if (jQuery.isEmptyObject(matches)){

        console.log("givenMatches is empty");
        return;
    }

    if (jQuery.isEmptyObject(commandSubNode)){

        console.log("commandSubNode is empty");
        return;
    }

    //for each node in the sub pattern
    for (var i =0; i<commandSubNode.length;i++){

        currentNode = commandSubNode[i];

        for (var j =0; j<currentNode.Givens.length;j++){//for each given in each node

            if(currentNode.Givens[j].indexOf("with") > -1){//if it contains "with" then it needs a term, 

                givenAllFunction(matches, currentNode.Givens[j], commandSubNode, commandName, commandTracker);
       
            }
        }
    }
}





//matches: p:,
//         q:,
//         x:


//givenString: p with term for x

function givenAllFunction(matches, givenString, commandSubNode, commandName, commandTracker){//gets terms and displays them to user/creates listener on those elements

    //deep clone matches to avoid altering the tree
    newMatches= cloneControlFunction(matches);
    commandTrackerClone = commandTracker;

    //retrieve values for term and what that is being subbed into
    givenStrings = givenString.split(" ");
    var subject= givenStrings[0] //p
    var varToReplace = givenStrings[4]//x

    //now create list of terms for user to choose from
    var givensThatCanBeUsed = getGivenVariablesAndCreateList(proofTree);

    if(!jQuery.isEmptyObject(givensThatCanBeUsed)){//if there are choices

        //flag for the events handler
        givenAllSelected = 1; 
        //initialise term
        term = "";
        
        //display the list of options
        displayGivenAllOptions(givensThatCanBeUsed);

        $(document).on( "click","p, pre", function(event){ //create active listener on those elements

            if ($(this).is("[id ^= 'givenChoice']") && givenAllSelected ==1){ //if any of the elements in the list are selected

                //get the substitution part for the rule applied
                var commandSubPart = getCommandSubPart(commandName);
                //get the term that was selected
                term = document.getElementById(event.target.id).textContent;
                //reset flag
                givenAllSelected = 0;
                //call the substitution function
                newMatches =  givenAllSubPart(subject, varToReplace, term, newMatches);
                //hand over to the next funnction
                givenAllControlFunctionPart2(newMatches, commandSubPart, commandTrackerClone, term);
                
                //when selection of choice is detected
                //remove element and retoggle rules
                if(document.getElementById("givenChoices")){
                    //remove it
                    document.body.removeChild(document.getElementById("givenChoices"));
                }

                //makes rules appear once again
                toggleRulesVisibility();
            }
        });
    }
       
       //if there are no choices 
    else{

        alert("no givens present that may be used as term");

    }
}


//subject with term for varToReplace

function givenAllSubPart(subject, varToReplace, term, newMatches){//substitutes value for givenAll

    //need to separate the link between matches and the original proofTree
    newMatches= cloneControlFunction(newMatches);

    if (typeof newMatches[subject]== "string"){//if it is not a node or tree segment

        if (newMatches[subject]==newMatches[varToReplace]){//if the values match then sub in the term

            newMatches[subject]=term;
        }

    }else{ //else it is a tree so walk through, replacing as you go

        tree = new TreeModel();
        
        //make 100% sure it is a tree
        newMatches[subject] = tree.parse(newMatches[subject]);

        newMatches[subject].walk({strategy: 'breadth'}, function (thisNode) {//walk

            if (thisNode.model.value==newMatches[varToReplace]){//if values match then replace with term

                thisNode.model.value=term;

            }
        });
    }

    ///return the subbed matches
    return newMatches;

}




function givenAllControlFunctionPart2(matches, commandSubNode, commandTracker, term){//final givenAll control function

    //update the command tracker so that it knows what to write next to the "by" in the display
    commandTracker = commandTracker + " "+term;
    //clone matches again
    var newMatches= cloneControlFunction(matches);

    for (var i =0; i<commandSubNode.length;i++){// for each node in the sub pattern

        currentNode = commandSubNode[i];

        for (var j =0; j<currentNode.Givens.length;j++){// for each given in each node

            //remove the excess spacing and place the correct given in the subnode
            currentNode.Givens[j] = currentNode.Givens[j].split(" ")[0];
            currentNode.Givens[j] = matches[currentNode.Givens[j]];

        }
    }

    if (matches.hasOwnProperty(currentNode.Show)){//do the same with show

        currentNode.Show = matches[currentNode.Show];

        if (typeof currentNode.Show == "string"){

            currentNode.Show = stringToTree(currentNode.Show);

        }else{

            tree = new TreeModel();
            
            currentNode.Show = tree.parse(currentNode.Show);

        }
    }

    //insert this node into the proof tree
    insertIntoTree(commandSubNode, proofTree, commandTracker);


    //display the correct view mode
    if (document.getElementById("entireProofSoFar")){

        visualiseProofTree(proofTree);

    }
    else if (document.getElementById("graphView")){

        makeGraph(proofTree,1.5);
        
    }

    //empty variables
    commandSubNode= {};
    matches = {};
}



////////////////////////////////////////////////////////////////////////END OF GIVENALL/////////////////////////////////////////////////////