var data, txt, svg, x, y, bins, bar;
var formatCount = d3.format(",.0f");

d3.json("/load_data", function (error, json_data) {

  if(!error){
     data = json_data['users'];
     map = data.map(function(d,i){ return parseFloat(d.age); })
     createVis()
  }

  else{
    console.log("Data not loaded!!!")
  }

});

function createVis(){
   
    // visualize the total number of users
    // use txt variable defined above
   
    txt = d3.select("#total_users_text")
      .append("text");

    // Part 1  

    // ------ YOUR CODE GOES HERE -------- 

    // into .text attribute pass the lenghts of the data
    txt.append("text")
    .text(d3.max(data, function(d){
      return d.uid;
    }));

    txt  
      .style("text-anchor", "start")
      .style("font-size", "30px")
      .style("font-style", "italic")
      .attr("fill", "#888")
      .attr("y", 440)
      .attr("x", 10);

    svg = d3.select("#barChart")
        margin = {top: 45, right: 45, bottom: 45, left: 0},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g")
               .attr("transform",
                     "translate(" + margin.left + "," + margin.top + ")");

    // Part 2  

    // ------ YOUR CODE GOES HERE -------- 
    // a. Create x and y scale
    var xScale = d3.scaleLinear()
    .domain([d3.min(map), d3.max(map)])
    .rangeRound([margin.left, width-margin.right]);

    // b. Create bins and histogram
    var bins = d3.histogram()
    .domain(xScale.domain())
    .thresholds(xScale.ticks(12))
    (map);

    var yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d){
      return d.length;
    })])
    .range([height, margin.top]);

    // c. Create bars (rect)
    var bar = g.selectAll(".bar")
    .data(bins)
    .enter()
    .append("g")
    .attr("class", "bar")
    .attr("transform", function(d){
      return "translate(" + xScale(d.x0) + "," + yScale(d.length)+")";
    });

    bar.append("rect")
    .attr("x", 1)
    .attr("width", xScale(bins[0].x1) - xScale(bins[0].x0) - 1)
    .attr("height", function(d){
      return height - yScale(d.length);
    })
    .style("fill", "#962915");

    // d. Create bar labels
    bar.append("text")
    .attr("dy", ".75em")
    .attr("y", -10)
    .attr("x", (xScale(bins[0].x1) - xScale(bins[0].x0)) / 2)
    .attr("text-anchor", "middle")
    .text(function(d){
      return formatCount(d.length);
    });

    // e. Call Axes
    var xAxis = d3.axisBottom(xScale)
    .scale(xScale)
    .ticks(4);

    g.append("g")
    .attr("transform", "translate(0,"+height+" )")
    .call(xAxis);

    // f. Create Axes label
    svg.append("text")
    .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top + 35) + ")")
    .style("text-anchor", "middle")
    .text("Age");

}