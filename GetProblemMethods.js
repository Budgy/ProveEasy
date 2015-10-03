function getProblemTree(problem) {//return the tree when given a string

    Result = parse(problem);
    tree = new TreeModel();
    root = tree.parse(Result);    
    return root;

}


function getProblem(Title){//get the elements for a specific problem

    return Problems[Title];
}

function removeProbsFromDoc(){

    for (i = 0; i<length; i++){//remove all problem title elements

        $( "[id^='sequent']" ).remove();
        $( "#instructionsSequent" ).remove();

    }
}

function getListOfProbs(){//get and display all problem titles

    //hide buttons
    $("[id^='button']").hide();
    $("[id^='bitNextToAdvice']").hide();
    currentCommandSelected = "";

    //check if document contains a proofTree already
    if(document.getElementById("entireProofSoFar")){
        //remove it
        document.body.removeChild(document.getElementById("entireProofSoFar"));
    }
    if(document.getElementById("graphView")){
        //remove it
        document.body.removeChild(document.getElementById("graphView"));
    }
    if(document.getElementById("rules")){
        //remove it
        document.body.removeChild(document.getElementById("rules"));
    }


    //create new elements
    var probTitle = document.createElement("p")
    var text=document.createTextNode("Please select a problem");
        probTitle.id= "instructionsSequent";
        probTitle.appendChild(text);
        document.body.appendChild(probTitle);

    for (i = 0; i<length; i++){

        var prob = document.createElement("p");
        var node=document.createTextNode(names[i]);
        prob.id= "sequent"+i;
        prob.appendChild(node);
        document.body.appendChild(prob);
    }
}
