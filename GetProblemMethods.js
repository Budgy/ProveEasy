function getProblemTree(problem) {

    //ProblemParser= PEG.buildParser("start = sep* All:All sep* {return All} All = sep* operator:\"All\" sep* xValue: AND sep* pValue: AND {return {type:\"operator\",value:operator, children:[xValue, pValue]}} /AND AND= left:implication sep* operator:\"&\" sep* right:AND {return {type:\"operator\", value:operator, children:[left,right]}} /implication implication = left:OR sep* operator:\"->\" sep* right:implication{return {type:\"operator\", value:operator, children:[left,right]}}/OR OR =  left:Not  sep* operator:\"|\" sep* right:OR{return {type:\"operator\", value:operator, children:[left,right]}}/Not Not = sep* operator:\"¬\" sep* right:primary{return {type:\"operator\", value:operator, children:[right]}}/primary primary  = letter:letter{return {type:\"variable\", value:letter}}/ \"{\" sep* All:All sep* \"}\" {return All}/\"(\" sep* All:All sep* \")\" {return All} sep = spaces:[' ',\\t,\\r,\\n] letter  = letters:[A-Za-z]");

    Result = parse(problem);
    tree = new TreeModel();
    root = tree.parse(Result);    
    return root;

}


function getProblem(Title){// get the goal for a specific problem

    return Problems[Title];
}

function removeProbsFromDoc(){

    for (i = 0; i<length; i++){


        $( "[id^='sequent']" ).remove();

    }

}

function getListOfProbs(){// get and display all problem titles


    $("[id^='button']").hide();



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



    var probTitle = document.createElement("p")
    var text=document.createTextNode("Please select a problem");
        probTitle.id= "sequentTitle";
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
