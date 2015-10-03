function getProblemTree(problem) {//converts string to tree

    Result = parse(problem);
    tree = new TreeModel();
    root = tree.parse(Result);    
    return root;

}

function initialiseProofTree(problem) {//initialises the proof tree on the problem sequent (sets up the proof)

    //parse the show into a tree
    var tree = new TreeModel();
    showResult = parse(problem.Show);
    showTree = tree.parse(showResult);

    if (problem.Givens.length>0){//if there are givens

        givensResult = [];

        for (var i =0; i < problem.Givens.length;i++){//for eachgiven, parse it into a tree and add it to the list

            givensResult.push(tree.parse(parse(problem.Givens[i])));
            
        }

        //construct first node of the proof tree
        newTreeRoot = tree.parse({

            Show: showTree, //show must be in tree form
            Givens: givensResult,
            children: [], 
            activeBranch: 1,
            id: 1,
            completeBranch:0,
            ruleUsed:"?"
        });

    }else{//there are no givens

        //construct first node of the proof tree
        newTreeRoot = tree.parse({

            Show: showTree, //show must be in tree form, maybe create seperate element for it?
            Givens: [],
            children: [], 
            activeBranch: 1,
            id: 1,
            completeBranch:0,
            ruleUsed:"?"
        });
    }

    //return the root node
    return newTreeRoot;
}



function getDepth (tree){//returns the max depth of a tree

    max=0;

    tree.walk(function (node) {
        // Halt the traversal by returning false

        if (node.children.length===0){//if the node is a leaf

            //get it's path
            nodeArray = node.getPath();

            //if the path length is greater than the current max, replace the max
            if (nodeArray.length>max){

                max=nodeArray.length;
            }
        }
    });

    return max;
}



function compareChildren(patternTree, instanceTree){//compares the children in every node in both trees

    arrayOfPatternChildren = [];
    arrayOfInstanceChildren = [];

    patternTree.walk(function (node) {

        arrayOfPatternChildren.push(node.children.length);

    });
    instanceTree.walk(function (node) {
    
        arrayOfInstanceChildren.push(node.children.length);

    });

    return arrayOfPatternChildren.compare(arrayOfInstanceChildren);
}






function displayTree(tree) {// takes a tree and prints it as a string with appropriate parenthesis. this function recursively calles itself in order to draw the tree as a string

    var dispStr = "";
    var operator ="";
    var leftSide = "";
    var rightSide = "";
    var onlyAVariable = 0;


    tree.walk({strategy: 'breadth'}, function (node) {//walk the tree

        //split into 3 types, Operator var var, var Operator var, Operator var

        if (["All","Ex"].indexOf(node.model.value) > -1){//if it contains All or Ex then assign the variables to the locations

                leftSide=node.model.value;
                operator = displayTree(node.children[0]);
                rightSide = displayTree(node.children[1]);
                return false;

        }else if (["not","Suc"].indexOf(node.model.value) > -1){

            if(node.model.type == "operator"&&operator ==""){

                operator = node.model.value;
                rightSide = displayTree(node.children[0]);     
                return false;

            }

        }else if ((["P","Q","R", "L"].indexOf(node.model.value) > -1) && node.children.length == 1){

            if(node.model.type == "operator"&&operator ==""){

                operator = node.model.value;
                rightSide = displayTree(node.children[0]);     
                return false;

            }

        }else{//everything else

            if ((node.children.length === 0)&&(operator=="")&&(leftSide=="")&&(rightSide=="")){

                leftSide = node.model.value;
                return false;
            }
           
            if ((node.model.type == "operator")&&(operator=="")){

                operator = node.model.value;
                leftSide = displayTree(node.children[0]); 
                rightSide = displayTree(node.children[1]);
                return false;

            }
        }
    });

        if (operator=="" && rightSide==""){// if it's only a variable

        return leftSide;

        }else{

        //once left operator and righ are all filled, combine them together
        dispStr = "("+leftSide+" " + operator+" " + rightSide+")";    

        }

        return dispStr;
    }



Array.prototype.compare = function (array) {// allows two arrays to be compared
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal
            return false;
        }
    }
    return true;
}

function stringToTree(string){// takes a string and outputs a tree

    parsedString = parse(string);
    tree = new TreeModel();
    newTree = tree.parse(parsedString);

    return newTree;

}

function objToString (obj) {// takes and object (matches) and outputs a printable string

    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {

            if(obj[p].hasOwnProperty('children')){
                        

                str += p + '::' + displayTree(obj[p]) + '\n';

            }else{

                str += p + '::' + obj[p] + '\n';

            }                       
                
        }
    }
    return str;
}


function getGivenVariables(proofTree){//returns all given variables in the active branch

    var givensList = [];

    proofTree.walk(function (node) {

        if (node.model.activeBranch ==1&&node.model.Givens.length>0){//find active leaf

            for (var i =0;i<node.model.Givens.length;i++){

                givensList.push(node.model.Givens[i]);

            }
        }
    });

    return givensList;

}


function changeToThisBranchPath (id, proofTree) {//change active branch, buggy

    var showSelected= id;

        proofTree.walk(function (node) {// get the path of the selected show
            // Halt the traversal by returning false
            if (node.model.id == showSelected && node.model.children.length==0){

                path = node.getPath();
                return false;
            }
            if (node.model.id == showSelected && node.model.children.length!=0){

                alert("old show, select a newer one");
                return;

            }
            if (node.model.id == showSelected && node.model.completeBranch ==1){

                alert("branch already complete, please select a different one");
                return;
            }
        });

        proofTree.walk(function (node) {// make everything non-active
            
            if (node.model.activeBranch ==1){

                node.model.activeBranch =0;
                
            }
        });

        proofTree.walk(function (node) {// make only the nodes in the path found active
          
            for (var i =0; i<path.length; i++){

                if (node.model.id == path[i].model.id){

                    node.model.activeBranch =1;
                    
                }
            }
        });

        if(document.getElementById('entireProofSoFar')){

            // refresh printed tree
            visualiseProofTree(proofTree);
            return null;
        }
        else if(document.getElementById('graphView')){

            makeGraph(proofTree,1.5);

            return null;
        }

    }


function treeToJson(proofTree){//takes a tree and changes it to a json object

// newTreeRoot = tree.parse({

//         Show: showTree, //show must be in tree form, maybe create seperate element for it?
//         Givens: [],
//         children: [], 
//         activeBranch: 1,
//         id: 1,
//         completeBranch:0
//     });

    var jsonObj = [];

    proofTree.walk(function (node){

        var item={};
        item["id"] = node.model.id;
        item["show"] = displayTree(node.model.Show);

        if (node.model.Givens.length>0){

            for (var x =0;x<node.model.Givens.length; x++){

                item["Given"+x] = displayTree(node.model.Givens[x])

            }
        }

        if (node.children.length>0){

            var children = [];

            for (var index = 0; index<node.children.length;index ++){

                var child = treeToJson(node.children[index]);

                children.push(child);

            }

            item["children"] = children;

            jsonObj.push(item);
            return false;

        }
        else{

            item["children"] = [];
            jsonObj.push(item);
            return false;

        }
    });

    return jsonObj;
}




/*{
    value:
    type:
    children: [],
    
}*/


function clone(obj) {//clones an object
    var copy;
    var children=[];

    if(typeof obj == "string"){

        return obj;
    }

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Object
    if (obj instanceof Object) {

        if (obj.hasOwnProperty("children")&&obj.hasOwnProperty("model")){

            if(obj.children.length>0){

                for (var i =0; i<obj.model.children.length;i++){//get its children

                    children.push(clone(obj.model.children[i]));
                }

                //create new object
                copy = {

                    value: obj.model.value,
                    type:obj.model.type,
                    children: children
                    
                };
            }else{

                //create new object
                copy = {
                    value: obj.model.value,
                    type:obj.model.type,
                    
                };
            }
        }else{

            if (obj.hasOwnProperty("children")&& !obj.hasOwnProperty("model")){


                for (var i =0; i<obj.children.length;i++){

                    children.push(clone(obj.children[i]));
                }

                copy = {
                    value: obj.value,
                    type:obj.type,
                    children: children
                    
                };
            }else{

                copy = {
                        value:obj.value,
                        type:obj.type   
                };
            }
        }

        return copy;
    }
}


function cloneControlFunction(object){

    //object is matches, iterate through each, cloning them as you go and adding them to the new copy
    var copy={};

    for(var key in object) {

        if(object.hasOwnProperty(key)) {
            copy[key] = clone(object[key]);
        }
    }
    return copy;
}


function cloneControlFunctionSubNode(object){

    //object is subnode, iterate through each, cloning them as you go and adding them to the new copy
    var copy={};

    for(var key in object) {
        if(object.hasOwnProperty(key)) {

            if (typeof object[key] == 'object'){

                copy[key] = clone(object[key]);

            }else if(typeof object[key] == 'string' ){

                copy[key] = object[key];

            }
        }
    }
    return copy;
}

function getGivenVariablesAndCreateList(proofTree){// returns a list of given variables that are only 1 variable long e.g. a, a_, a1_

    var appropriateGivens={};

    proofTree.walk(function (node){//walk the tree

        for (var given=0; given<node.model.Givens.length;given++){//for each given

            if (node.model.Givens[given].model.type =="variable"){//if it is a variable

                //test
                if(node.model.Givens[given].model.value.length==1 
                    || node.model.Givens[given].model.value.length==2  && node.model.Givens[given].model.value.endsWith("_")
                        ||node.model.Givens[given].model.value.length==3  &&node.model.Givens[given].model.value.endsWith("1_")){

                    //add it to the list
                    appropriateGivens[node.model.id]=node.model.Givens[given].model.value;
                }
            }
        }
    });

    return appropriateGivens;
}


String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};


String.prototype.startsWith = function(needle)
{
    return(this.indexOf(needle) == 0);
};