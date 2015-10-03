function makeAltGraph(textProofTree, scale){//alternate view

  if(document.getElementById("graphView")){//if graph veiw currently

    document.body.removeChild(document.getElementById("graphView"));

  }

var margin = {top: 20, right: 0, bottom: 20, left: 0},
    width = $(window).width(),
    height = 1000;
    //height = $(window).height();
    
 var i = 0,
     duration = 750,
     root;

 var tree = d3.layout.tree()
     .size([width/2+(width/14), height]);

 var diagonal = d3.svg.diagonal();

 var svg = d3.select("body").append("svg")
     .attr("width", width)
     .attr("height", height)
     .attr("id", "graphView")
     .append("g")
     .attr("id", "graph")
     .attr("transform", "translate(" + 0 + "," + margin.top + "), scale(" +scale+")");


    var dataOriginal1231 = jQuery.extend(true, {}, textProofTree);
    var treemodel124 = new TreeModel();
    var root = treemodel124.parse(dataOriginal1231);

   root.x = 0;
   root.y = 0;

   function collapse(d) {
     if (d.children) {
       d._children = d.children;
       d._children.forEach(collapse);
       d.children = null;
     }
   }

   update(root);


 d3.select(self.frameElement).style("height", "800px");

 function update(source) {

   // Compute the new tree layout.
   var nodes = tree.nodes(root),
       links = tree.links(nodes);

       //set height of view
   d3.select("#graphaltView").attr("height", (nodes.length *180) +100);
       


   // Normalize for fixed-depth.
   nodes.forEach(function(d) { d.y =d.depth * 100 +40; });
    
   var listOfYChords = [];

   var prevNodeDepth = null; //used to avoid duplicates
    for (var i =0; i<nodes.length;i++){// get all coordinates

      if (nodes[i].y != prevNodeDepth | prevNodeDepth ==null){

        listOfYChords.push(nodes[i].y);
        prevNodeDepth = nodes[i].y;
      }
      
    }

    //flip the node coords if more than 1 node
    if (nodes.length > 1){

      var counter = -1;
      var originalPrevNodeDepth = null;
      var yMatchings= invertYcoordinates(listOfYChords);

      for (var i =0; i<nodes.length;i++){// get all coordinates

        if (yMatchings.hasOwnProperty(nodes[i].y)){

          nodes[i].y = yMatchings[nodes[i].y];


        }
        
      }

    }

   var numberOfGraphGivens ={};

   // Update the nodes…
   var node = svg.selectAll("g.node")
       .data(nodes, function(d) { numberOfGraphGivens[d.model.model.id]=d.model.model.Givens.length; return d.id || (d.id = ++i); });

   // Enter any new nodes at the parent's previous position.
   var nodeEnter = node.enter().append("g")
       .attr("class", "node");
  //     .attr("transform", function(d) { return "translate(" + (-1*source.y0)+ "," + (-1*source.x0) + ")"; });
       

   nodeEnter.append("circle")
       .attr("r", 6)
       .style("fill", function(d) { return d._children ? "black" : "#fff"; })
       .style("stroke", function(d) { return d.model.model.activeBranch ? "yellow" : "#C2C2C2"; })
       .on("click", click);


       var allGElements = nodeEnter[0];


       for (var gElement = 0; gElement<allGElements.length; gElement++){

        if (!(allGElements[gElement] === null)) {

         currentSelection=  d3.select(allGElements[gElement]);

          if (!allGElements[gElement].__data__.model.model.Givens.length ==0){

            for (var given = 0; given<allGElements[gElement].__data__.model.model.Givens.length;given++){//for each given append it to the node

              currentSelection.append("text")
                .attr("x", function(d) { return d.children || d._children ? -(given+1*100) : given+1*100; })
                 .attr("dy", ".35em")
                 .attr("id", function(d) { return d.model.model.activeBranch ? "1given"+allGElements[gElement].__data__.model.model.id+"."+ (given+1) : "given"+allGElements[gElement].__data__.model.model.id+"."+(given+1); })
                 .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                 .text(allGElements[gElement].__data__.model.model.id+"."+(given+1)+": "+"Given: "+displayTree(allGElements[gElement].__data__.model.model.Givens[given]))
                 .style('fill',function(d) { return d.model.model.completeBranch ? "black":(d.model.model.activeBranch ? "yellow" : "#C2C2C2"); });


            }
          }
        }
       }

       //append the show to the node
   nodeEnter.append("text")
     .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
     .attr("dy", ".35em")
     .attr("id", function (d){return "show"+d.model.model.id})
     .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
     .text(function (d){return +d.model.model.id+": "+"Show: "+displayTree(d.model.model.Show);})
     .style('fill',function(d) { return d.model.model.completeBranch ? "black":(d.model.model.activeBranch ? "yellow" : "#C2C2C2"); });

   var xcoord;
   var nodeUpdate = node.transition()
       .duration(duration)
       .attr("transform", function(d) { xcoord = d.x; return "translate(" + ((d.x)) + "," + d.y + ")"; });

   nodeUpdate.select("circle")
       .attr("r", 4.5)
       .style("fill", function(d) { return d._children ? "black" : "#fff"; });

   nodeUpdate.select("text")
       .style("fill-opacity", 1);

   // Transition exiting nodes to the parent's new position.
   var nodeExit = node.exit().transition()
       .duration(duration)
       .attr("transform", function(d) { return "translate(" + source.x + "," + source.y + ")"; })
       .remove();

   nodeExit.select("circle")
       .attr("r", 1e-6);

   nodeExit.select("text")
       .style("fill-opacity", 1e-6);

   // Update the links…
   var link = svg.selectAll("path.link")
       .data(links, function(d) { return d.target.id; });

   // Enter any new links at the parent's previous position.
   link.enter().insert("path", "g")
       .attr("class", "link")
       .attr("d", function(d) {
         var o = {x: source.x0, y: source.y0};
         return diagonal({source: o, target: o});
       });

   // Transition links to their new position.
   link.transition()
       .duration(duration)
       .attr("d", diagonal);

   // Transition exiting nodes to the parent's new position.
   link.exit().transition()
       .duration(duration)
       .attr("d", function(d) {
         var o = {x: source.x, y: source.y};
         return diagonal({source: o, target: o});
       })
       .remove();

   // Stash the old positions for transition.
   nodes.forEach(function(d) {
     d.x0 = d.x;
     d.y0 = d.y;
   });
 }

 // Toggle children on click.
 function click(d) {
   if (d.children) {
     d._children = d.children;
     d.children = null;
   } else {
     d.children = d._children;
     d._children = null;
   }
   update(d);
 }

}


function zoomGraph(value){

  if(document.getElementById("graphView")){//if graph veiw currently

    document.body.removeChild(document.getElementById("graphView"));
/*
    if (flag){

      makeGraph(proofTree,0.5);
      flag = 0;

    }else{

      makeGraph(proofTree,1.5);
      flag = 1;
    }
*/
    
  }
  else{


    alert("no graph to zoom");

  }
}


function invertYcoordinates(list){

  var Ymatchings = {};
  var usedNumbers = [];
  var done =false;
  var nextLargest = null;
  var nextSmallest = null;

  while (!done){

    for (var i = 0;i<list.length;i++){

      if (list[i]>nextLargest && !usedNumbers.contains(list[i])| nextLargest ==null){

        if (nextLargest<nextSmallest | nextSmallest == null){

          nextSmallest = nextLargest;
        }
        nextLargest = list[i];

      }
      else if (list[i]<nextSmallest && !usedNumbers.contains(list[i])| nextSmallest ==null){

        if (nextSmallest<nextLargest | nextLargest == null){

          nextLargest = nextSmallest;
        }

        nextSmallest = list[i];
      }

    }

    if (usedNumbers.contains(nextSmallest) && usedNumbers.contains(nextLargest)){

      done = true;

    }else if (!nextLargest!= nextSmallest){

      Ymatchings[nextSmallest]=nextLargest;
      Ymatchings[nextLargest]=nextSmallest;
      usedNumbers.push(nextSmallest);
      usedNumbers.push(nextLargest);

    }

}

return Ymatchings;
}


Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}