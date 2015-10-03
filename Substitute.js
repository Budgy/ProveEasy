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




    for (var i =0; i<commandSubNode.length;i++){// for each node in the sub pattern

        currentNode = commandSubNode[i];

        for (var j =0; j<currentNode.Givens.length;j++){// for each given in each node


            if (typeof currentNode.Givens[j] == 'object'){

                currentNode.Givens[j].walk(function(node){

                    if(matches.hasOwnProperty(node.model.value)){


                        node.model.value = matches[node.model.value];


                    }

                });

            }else{

                if(currentNode.Givens[j].indexOf("var ") > -1){//if it has var at the start in the sub node then a new variable needs to be created and changed throughout the rest of the matches

                    //remove it but set the flag
                    currentNode.Givens[j] = currentNode.Givens[j].replace("var ","");
                    newVarNeeded=true;


                }

                if(matches.hasOwnProperty(currentNode.Givens[j])){// if matches has a key of the same name

                    if (newVarNeeded){

                        //go through the matches creating a new variable
                        matches = replaceVariableInTree(matches, matches[currentNode.Givens[j]]);
                        newVarNeeded=false;

                    }


                    // change the value of the given to the value stored in matches which corosponds to the key
                    currentNode.Givens[j] = matches[currentNode.Givens[j]];

                }

            }


        }

        if (typeof currentNode.Show == 'object'){


             currentNode.Show.walk(function(node){

                    if(matches.hasOwnProperty(node.model.value)){


                        node.model.value = matches[node.model.value];


                    }

                });

        }else {

            if (matches.hasOwnProperty(currentNode.Show)){//do the same with show

                currentNode.Show = matches[currentNode.Show];

                if (typeof currentNode.Show == "string"){

                    currentNode.Show = stringToTree(currentNode.Show);

                }


            }

        }





    }
    return commandSubNode;
}


function replaceVariableInTree(matches, variable){

    newVar = variable+"_";

    //need to separate the link between matches and the original proofTree
    newMatches= cloneControlFunction(matches);


    Object.keys(newMatches).forEach(function(key) {


        if (typeof newMatches[key]== "string"){//if it is not a node or tree segment

            if (newMatches[key]==variable){

                newMatches[key]=newVar;
            }

        }else{ //else it is a tree so walk through, replacing as you go

            tree = new TreeModel();
            
            newMatches[key] = tree.parse(newMatches[key]);

            newMatches[key].walk({strategy: 'breadth'}, function (thisNode) {

                if (thisNode.model.value==variable){

                    thisNode.model.value=newVar;

                }

            });

        }


    });


    return newMatches;


}


function givenAllControlFunctionPart1(matches, commandSubNode, commandName, commandTracker){//special function for given all rule



    if (jQuery.isEmptyObject(matches)){

        console.log("givenMatches is empty");
        return;
    }

    if (jQuery.isEmptyObject(commandSubNode)){

        console.log("commandSubNode is empty");
        return;
    }

    for (var i =0; i<commandSubNode.length;i++){// for each node in the sub pattern

        currentNode = commandSubNode[i];

        for (var j =0; j<currentNode.Givens.length;j++){// for each given in each node

            if(currentNode.Givens[j].indexOf("with") > -1){//if it contains "with" then it is given all and needs a term, 


                givenAllFunction(matches, currentNode.Givens[j], commandSubNode, commandName, commandTracker);

            
            }
        }
    }




}



function givenAllControlFunctionPart2(matches, commandSubNode, commandTracker, term){



    commandTracker = commandTracker + " "+term;
    var newMatches= cloneControlFunction(matches);

    for (var i =0; i<commandSubNode.length;i++){// for each node in the sub pattern

        currentNode = commandSubNode[i];

        for (var j =0; j<currentNode.Givens.length;j++){// for each given in each node

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


    insertIntoTree(commandSubNode, proofTree, commandTracker);
    visualiseProofTree(proofTree);
    commandSubNode= {};
    matches = {};
}





//matches: p:,
//         q:,
//         x:


//givenString: p with term for x

function givenAllFunction(matches, givenString, commandSubNode, commandName, commandTracker){

    newMatches= cloneControlFunction(matches);//deep clone matches to avoid altering the tree
    
    givenStrings = givenString.split(" ");

    var subject= givenStrings[0] //p
    var varToReplace = givenStrings[4]//x

    //now create options for term

    var givensThatCanBeUsed = getGivenVariablesAndCreateList(proofTree);

    if(!jQuery.isEmptyObject(givensThatCanBeUsed)){//if there are choices

        givenAllSelected = 1; //flag for the events handler
        term = "";
        
        displayGivenAllOptions(givensThatCanBeUsed);

            $(document).on( "click","p, pre", function(event){

                if ($(this).is("[id ^= 'givenChoice']") && givenAllSelected ==1){ 

                    var commandSubPart = getCommandSubPart(commandName);
                    term = document.getElementById(event.target.id).textContent;
                    givenAllSelected = 0;
                    newMatches =  givenAllSubPart(subject, varToReplace, term, newMatches);
                    givenAllControlFunctionPart2(newMatches, commandSubPart, commandTracker, term);
                    
                    //when selection of choice is detected

                    //remove element and retoggle rules
                    if(document.getElementById("givenChoices")){
                        //remove it
                        document.body.removeChild(document.getElementById("givenChoices"));
                    }

                    toggleRulesVisibility();

                   
                }
            });
    }
       
       //if not alert that there are no variables to choose from
    else{

        alert("no applicable givens");

    }

}


//subject with term for varToReplace

function givenAllSubPart(subject, varToReplace, term, newMatches){



    //need to separate the link between matches and the original proofTree
    newMatches= cloneControlFunction(newMatches);


        if (typeof newMatches[subject]== "string"){//if it is not a node or tree segment

            if (newMatches[subject]==newMatches[varToReplace]){

                newMatches[subject]=term;
            }

        }else{ //else it is a tree so walk through, replacing as you go

            tree = new TreeModel();
            
            newMatches[subject] = tree.parse(newMatches[subject]);

            newMatches[subject].walk({strategy: 'breadth'}, function (thisNode) {

                if (thisNode.model.value==newMatches[varToReplace]){

                    thisNode.model.value=term;

                }

            });

        }



    return newMatches;

}