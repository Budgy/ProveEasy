/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function substitute (matches, commandSubNode){

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

            if(matches.hasOwnProperty(currentNode.Givens[j])){// if matches has a key of the same name

                // change the value of the given to the value stored in matches which corosponds to the key
                currentNode.Givens[j] = matches[currentNode.Givens[j]];

            }
        }

        if (matches.hasOwnProperty(currentNode.Show)){//do the same with show

            currentNode.Show = matches[currentNode.Show];
        }
    }
    return commandSubNode;
}
