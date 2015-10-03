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

        if (matches.hasOwnProperty(currentNode.Show)){//do the same with show

            currentNode.Show = matches[currentNode.Show];

            if (typeof currentNode.Show == "string"){

                currentNode.Show = stringToTree(currentNode.Show);

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