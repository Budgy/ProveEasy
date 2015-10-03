


function match (pattern, instance){
    var matches = {};

    //first make sure neither are empty (check depth)
    //using jquery
    if (jQuery.isEmptyObject(pattern)){

        console.log("pattern is empty");
        matches = {};
        return;
    }

    if (jQuery.isEmptyObject(instance)){

        console.log("instance is empty");
        matches = {};
        return;
    }

    //get required testing information from trees 
    patternOperatorFlag = 0;
    instanceOperatorFlag = 0;

    pattern.first(function (node) {

        if(node.model.type == "operator"){

            patternNode = node;
            patternValue = node.model.value;
            patternChildrenNum = node.children.length;
            patternOperatorFlag = 1;
            return node.model.type == "operator";
        }
    });

    instance.first(function (node) {

        if(node.model.type == "operator"){

            instanceNode = node;
            instanceValue = node.model.value;
            instanceChildrenNum = node.children.length;
            instanceOperatorFlag = 1;
            return node.model.type == "operator";
        }  	
    });

    //check operators
    if (patternOperatorFlag === 0){

        //no operator in pattern, match value to entire instance
        matches[pattern.model.value] = instance;
        return matches;
    }

    if (instanceOperatorFlag === 0){

        //no operator in instance
        if (getDepth(instance)!= getDepth(pattern)){

            console.log("incorrect depths");
            matches = {};
            return;

        }else{

            matches[pattern.model.value] = instance;
            return matches;
        }
    }

    if ((instanceValue != patternValue)){

        console.log("operators are not the same");
        matches = {};
        return;
    }

    if (getDepth(pattern)>getDepth(instance)){

        console.log("pattern depth longer than instance");
        matches = {};
        return;
    }

    //check numbers of children at the operator found
    if (patternChildrenNum != instanceChildrenNum){

        if (patternChildrenNum === 0){

            //map the one pattern variable to the entire instance
            matches[pattern.model.value] = instance;
            return matches;

        }else{

            console.log("number of children incorrect for match");
            matches = {};
            return;
        }
    }





    //if it makes it through the above checks then it must be a match

    for (var i=0;i<pattern.children.length;i++) { 

        if (isInArray(pattern.model.children[i].value, probVars)){// make sure no problem values are ever assigned to more than one instance value

            console.log("the same problem variable can't be assigned to multple instance components");
            matches = {};
            return;

        }else{

            tree = new TreeModel();
            miniPatternTree = tree.parse(pattern.model.children[i]);
            miniInstanceTree = tree.parse(instance.model.children[i]);

            var bool = false;

            miniPatternTree.walk(function (node) {

                if(miniPatternTree.model.type == "operator"){

                    bool=true;
                    return false;

                }
            });

            if (bool == true){

                newMatches =match(miniPatternTree,miniInstanceTree);

                if ($.isEmptyObject(newMatches)){

                    matches = {};
                    console.log("subtree does not match");
                    return;

                }else{

                    matches=merge_options(newMatches,matches);
                    bool = false;
                }

            }else{

                instanceBool = false;

                miniInstanceTree.walk(function (node) {

                    if(miniInstanceTree.model.type == "operator"){

                        instanceBool = true;
                        return false;    	
                    }
                });

                if (instanceBool == true){

                    bool = false;
                    instanceBool = false;
                    probVars.push(miniPatternTree.model.value);
                    matches[miniPatternTree.model.value] = miniInstanceTree;

                }else{

                    bool = false;
                    probVars.push(miniPatternTree.model.value);
                    matches[miniPatternTree.model.value] = miniInstanceTree.model.value;
                }
            }
        }
    }

    return matches;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function isInArray(value, array) {// checks if a value is in the array

    return array.indexOf(value) > -1;
}

function merge_options(obj1,obj2){//merge to objects
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function nodeMatching(patternSeq, instanceSeq, type){


    probVars = [];

    if (type == "show"){ 

        if (!patternSeq.Givens.isEmpty){//if the givens list isn't empty in the pattern then matching needs to be done on them

            //get show matches
            showMatch = match(patternSeq.Show, instanceSeq.model.Show);

            if (objToString(showMatch) == ""){

                //no match
                return "";
            }


            var numberOfMatches=0;
            var givenMatches={};


            for (var j =0; j<instanceSeq.model.Givens.length; j++){// for each instance given

                for (var i =0; i<patternSeq.Givens.length; i++){//for each pattern given

                    if(jQuery.isEmptyObject(patternSeq.Givens)){

                        return "";//no match
                        break;

                    }

                    variablesOfSequent = [];


                    //check if these pattern variables have already been bound


                    patternSeq.Givens[i].walk(function (node) {//get variables in pattern
                        // Halt the traversal by returning false

                        if(node.type =="variable"){

                            variablesOfSequent.push(node.mode.value);

                        }


                    });

                    //see if they have already been seen
                    var variablesSeen = {};

                    variablesOfSequent.forEach(function(variable){

                        if (givenMatches.hasOwnProperty(variable)){//if the variable has been seen 
                            variablesSeen.variable = givenMatches.variable;

                        }

                    });








                    //split here, if variable has been seen before or not

                    if (jQuery.isEmptyObject(variablesSeen)){//variables havn't been seen before

                        var tempGivenMatch = match(patternSeq.Givens[i], instanceSeq.model.Givens[j]);


                        if (!jQuery.isEmptyObject(tempGivenMatch)){// if match

                            //check if any two keys have been matched to the same thing


                            if(!jQuery.isEmptyObject(givenMatches)){

                                for (var key1 in givenMatches){

                                    for(var key2 in tempGivenMatch){

                                        if (key1 != key2 && givenMatches.key1 == givenMatches.key2){//if neither key is the same but the values are then no match


                                            continue;


                                        }else{//match made, merge


                                            numberOfMatches++;
                                            givenMatches = merge_options(tempGivenMatch, givenMatches);
                                            delete patternSeq.Givens[i];
                                            break;

                                        }

                                    }

                                }

                            }else {

                                numberOfMatches++;
                                givenMatches = merge_options(tempGivenMatch, givenMatches);
                                delete patternSeq.Givens[i];
                                break;

                            }

                        }

                        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////          


                    }else{//variable has been seen before

                        var tempGivenMatch = match(patternSeq.Givens[i], instanceSeq.model.Givens[j]);


                        if (jQuery.isEmptyObject(tempGivenMatch)){//no match 
                            break;

                        }


                        for (var key in tempGivenMatch){//check key values in each object


                            if (givenMatches.hasOwnProperty(key)){


                                if (!tempGivenMatch.key == givenMatches.key){//if any don't match continue the loop for the patterns because this doesn't match


                                    continue;// go onto next pattern

                                }

                            }


                        }



                        if(!jQuery.isEmptyObject(givenMatches)){
                            //check if any two keys have been matched to the same thing
                            for (var key1 in givenMatches){

                                for (var key2 in tempGivenMatch){

                                    if (key1 != key2 && givenMatches.key1 == givenMatches.key2){//if neither key is the same but the values are then no match


                                        continue;


                                    }else{//match made, merge


                                        numberOfMatches++;
                                        givenMatches = merge_options(tempGivenMatch, givenMatches);
                                        delete patternSeq.Givens[i];
                                        break;


                                    }

                                }

                            }

                        }else {

                            numberOfMatches++;
                            givenMatches = merge_options(tempGivenMatch, givenMatches);
                            delete patternSeq.Givens[i];
                            break;


                        }

                    }


                }

            }


            if (!numberOfMatches==instanceSeq.model.Givens.length){

                //no match for this formula
                return "";
            }






            if(!jQuery.isEmptyObject(givenMatches)){
                //check if any two keys have been matched to the same thing
                for (var key1 in givenMatches){

                    for (var key2 in showMatch){

                        if (key1 == key2 && !(givenMatches.key1 == showMatch.key2)){//if neither key is the same but the values are then no match


                            return "";//no match


                        }else{


                            continue;


                        }

                    }

                }
            }


            //combine
            combinedMatches = merge_options(showMatch, givenMatches);

            return combinedMatches;






































        }else{

            showMatch = match(patternSeq.Show, instanceSeq.model.Show);
            return showMatch;

        }

    }
    else if (type == "given"){

        //get show matches
        showMatch = match(patternSeq.Show, instanceSeq.model.Show);

        if (objToString(showMatch) == ""){

            //no match
            return "";
        }

        var numberOfMatches=0;
        var givenMatches={};


        for (var j =0; j<instanceSeq.model.Givens.length; j++){// for each instance given

            for (var i =0; i<patternSeq.Givens.length; i++){//for each pattern given

                if(jQuery.isEmptyObject(patternSeq.Givens)){

                    return "";//no match
                    break;

                }

                variablesOfSequent = [];


                //check if these pattern variables have already been bound


                patternSeq.Givens[i].walk(function (node) {//get variables in pattern
                    // Halt the traversal by returning false

                    if(node.type =="variable"){

                        variablesOfSequent.push(node.mode.value);

                    }


                });

                //see if they have already been seen
                var variablesSeen = {};

                variablesOfSequent.forEach(function(variable){

                    if (givenMatches.hasOwnProperty(variable)){//if the variable has been seen 
                        variablesSeen.variable = givenMatches.variable;

                    }

                });








                //split here, if variable has been seen before or not

                if (jQuery.isEmptyObject(variablesSeen)){//variables havn't been seen before

                    var tempGivenMatch = match(patternSeq.Givens[i], instanceSeq.model.Givens[j]);


                    if (!jQuery.isEmptyObject(tempGivenMatch)){// if match

                        //check if any two keys have been matched to the same thing


                        if(!jQuery.isEmptyObject(givenMatches)){

                            for (var key1 in givenMatches){

                                for(var key2 in tempGivenMatch){

                                    if (key1 != key2 && givenMatches.key1 == givenMatches.key2){//if neither key is the same but the values are then no match


                                        continue;


                                    }else{//match made, merge


                                        numberOfMatches++;
                                        givenMatches = merge_options(tempGivenMatch, givenMatches);
                                        delete patternSeq.Givens[i];
                                        break;

                                    }

                                }

                            }

                        }else {

                            numberOfMatches++;
                            givenMatches = merge_options(tempGivenMatch, givenMatches);
                            delete patternSeq.Givens[i];
                            break;

                        }

                    }

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////          


                }else{//variable has been seen before

                    var tempGivenMatch = match(patternSeq.Givens[i], instanceSeq.model.Givens[j]);


                    if (jQuery.isEmptyObject(tempGivenMatch)){//no match 
                        break;

                    }


                    for (var key in tempGivenMatch){//check key values in each object


                        if (givenMatches.hasOwnProperty(key)){


                            if (!tempGivenMatch.key == givenMatches.key){//if any don't match continue the loop for the patterns because this doesn't match


                                continue;// go onto next pattern

                            }

                        }


                    }



                    if(!jQuery.isEmptyObject(givenMatches)){
                        //check if any two keys have been matched to the same thing
                        for (var key1 in givenMatches){

                            for (var key2 in tempGivenMatch){

                                if (key1 != key2 && givenMatches.key1 == givenMatches.key2){//if neither key is the same but the values are then no match


                                    continue;


                                }else{//match made, merge


                                    numberOfMatches++;
                                    givenMatches = merge_options(tempGivenMatch, givenMatches);
                                    delete patternSeq.Givens[i];
                                    break;


                                }

                            }

                        }

                    }else {

                        numberOfMatches++;
                        givenMatches = merge_options(tempGivenMatch, givenMatches);
                        delete patternSeq.Givens[i];
                        break;


                    }

                }


            }

        }


        if (!numberOfMatches==instanceSeq.model.Givens.length){

            //no match for this formula
            return "";
        }


        //combine
        combinedMatches = merge_options(showMatch, givenMatches);

        return combinedMatches;

    }
}
