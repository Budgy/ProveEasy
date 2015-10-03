function makeGraph(textProofTree, scale){

/////////////////////////////////////////////////forcegraph////////////////////////////////////////////
// var width = 960,
//     height = 500;

// var color = d3.scale.category20();

// var force = d3.layout.force()
//     .charge(-120)
//     .linkDistance(30)
//     .size([width, height]);

// var svg = d3.select("body").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//		.attr("id","graphView");




// var tree = d3.layout.tree();

// var tempData = textProofTree;

// var tempNodes = tree.nodes(tempData);
// var tempLinks = tree.links(tempNodes);

// var graph =[];

// graph["nodes"]= tempNodes;
// graph["links"]=tempLinks;



//   force
//       .nodes(graph.nodes)
//       .links(graph.links)
//       .start();

//   var link = svg.selectAll(".link")
//       .data(graph.links)
//     .enter().append("line")
//       .attr("class", "link")
//       .style("stroke-width", "3");

//   var node = svg.selectAll(".node")
//       .data(graph.nodes)
//     .enter().append("circle")
//       .attr("class", "node")
//       .attr("r", 10)
//       .style("fill", "blue")
//       .call(force.drag);

//   node.append("title")
//       .text(function (d){return displayTree(d.model.Show)});

//   force.on("tick", function() {
//     link.attr("x1", function(d) { return d.source.x; })
//         .attr("y1", function(d) { return d.source.y; })
//         .attr("x2", function(d) { return d.target.x; })
//         .attr("y2", function(d) { return d.target.y; });

//     node.attr("cx", function(d) { return d.x; })
//         .attr("cy", function(d) { return d.y; });
//   });



////////////////////////////////////collapsable archgraph/////////////////////////////////////////////




var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = $(window).width(),
    height = $(window).height();
    
 var i = 0,
     duration = 750,
     root;

 var tree = d3.layout.tree()
     .size([height, width]);

 var diagonal = d3.svg.diagonal();

 var svg = d3.select("body").append("svg")
     .attr("width", width)
     .attr("height", height)
     .attr("id", "graphView")
     .append("g")
     .attr("id", "graph")
     .attr("transform", "translate(" + 0 + "," + margin.top + "), scale(" +scale+")");

    //var root = textProofTree;

    var dataOriginal1231 = jQuery.extend(true, {}, textProofTree);
    var treemodel124 = new TreeModel();
    var root = treemodel124.parse(dataOriginal1231);






   root.x0 = 0;
   root.y0 = 0;

   function collapse(d) {
     if (d.children) {
       d._children = d.children;
       d._children.forEach(collapse);
       d.children = null;
     }
   }

   root.children.forEach(collapse);
   update(root);
 //});

 d3.select(self.frameElement).style("height", "800px");

 function update(source) {

   // Compute the new tree layout.
   var nodes = tree.nodes(root).reverse(),
       links = tree.links(nodes);

   // Normalize for fixed-depth.
   nodes.forEach(function(d) { d.y = d.depth * 180; });

   // Update the nodes…
   var node = svg.selectAll("g.node")
       .data(nodes, function(d) { return d.id || (d.id = ++i); });

   // Enter any new nodes at the parent's previous position.
   var nodeEnter = node.enter().append("g")
       .attr("class", "node")
       .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
       .on("click", click);

   nodeEnter.append("circle")
       .attr("r", 1e-6)
       .style("fill", function(d) { return d._children ? "black" : "#fff"; })
       .style("stroke", "black");

   nodeEnter.append("text")
       .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
       .attr("dy", ".35em")
       .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
       .text(function (d){return displayTree(d.model.model.Show)})
       .style("fill-opacity", 1e-6);

   // Transition nodes to their new position.
   var nodeUpdate = node.transition()
       .duration(duration)
       .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

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






////////////////////////////////////////archgraph/////////////////////////////////


// var canvas= d3.select("body").append("svg")
// 	.attr("width",500)
// 	.attr("height",500)
// 	.attr("id","graphView")
// 	.append("g")
// 		.attr("transform", "translate(50,50)");


// var tree = d3.layout.tree()
// 	.size([400,400]);


// 	//data = textProofTree;
// 	//var dataOriginal = treeToJson(textProofTree);
// 	dataOriginal = jQuery.extend(true, {}, textProofTree);
// 	var treemodel = new TreeModel();
    	
//     var data = treemodel.parse(dataOriginal);

// 	//var data = clone(textProofTree);
// 	//var data = {};
// 	//jQuery.extend(data,textProofTree);
// 	//data = jQuery.extend(true, {}, textProofTree)

// 	var nodes = tree.nodes(data);
// 	var links = tree.links(nodes);

// 	var node = canvas.selectAll(".node")
// 		.data(nodes)
// 		.enter()
// 		.append("g")
// 		.attr("class", "node")
// 		.attr("transform", function(d){return "translate("+d.x+","+d.y+")"});


// 	node.append("circle")
// 	.attr("r",5)
// 	.attr("fill", "black");

// 	node.append("text")
// 		.text(function (d){return displayTree(d.model.model.Show)})
// 		.attr("stroke", "blue");

// 		var diagonal = d3.svg.diagonal();


// 	canvas.selectAll(".link")
// 		.data(links)
// 		.enter()
// 		.append("path")
// 		.attr("class", "link")
// 		.attr("fill", "none")
// 		.attr("stroke", "#ADADAD")
// 		.attr("d", diagonal);


}



function toggleView(proofTree){



	if(document.getElementById("entireProofSoFar")){//if textual view currently
		//remove it
	  	document.body.removeChild(document.getElementById("entireProofSoFar"));
	  	// var tree = new TreeModel();
    	
    // 	proofTree = tree.parse(proofTree);
	  	makeGraph(proofTree,0.5);
      flag = 0;
	  	
	}
	else if(document.getElementById("graphView")){//if graph veiw currently

		document.body.removeChild(document.getElementById("graphView"));
		//var tree = new TreeModel();
    	
     //	proofTree = tree.parse(proofTree);
		visualiseProofTree(proofTree);
		
	}




}



function zoomGraph(value){

  if(document.getElementById("graphView")){//if graph veiw currently

    document.body.removeChild(document.getElementById("graphView"));

    if (flag){

      makeGraph(proofTree,0.5);
      flag = 0;

    }else{

      makeGraph(proofTree,1.5);
      flag = 1;
    }

    
  }
  else{


    alert("no graph to zoom");

  }

}