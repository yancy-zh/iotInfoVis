//d3.select("body")
//    .style("color", "black")
//    .style("background-color", "green");

//d3.select("body")
//    .append("div")
//    .style("background-color", "lightblue")
//    .html("Hello, world!");

//var data = [4, 8, 15, 16, 23, 42];

var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width);

//data = d3.csv("data.csv",
//    function(data) {
//        x.domain([
//            0, d3.max(data,
//                function(d) {
//                    return d.fill_lvl;
//                })
//        ]);
//    });
var width = 420,
    barHeight = 20;

var x = d3.scale.linear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width);

d3.tsv("data.tsv", type, function (error, data) {
    x.domain([0, d3.max(data, function (d) { return d.value; })]);

    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function (d) { return x(d.value); })
        .attr("height", barHeight - 1);

    bar.append("rect")
        .style("fill", "red")
        .attr("width", function (d) { return x(d.value2); })
        .attr("height", barHeight - 1);

    bar.append("text")
        .attr("x", function (d) { return x(d.value) - 3; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d) { return d.value; });
});

function type(d) {
    d.value = +d.value; // coerce to number
    return d;
}




//chart.attr("height", barHeight * data.length);

//var bar = chart.selectAll("g")
//    .data(data)
//    .enter().append("g")
//    .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

//bar.append("rect")
//    .attr("width", function (d) { return x(d.fill_lvl); })
//    .attr("height", barHeight - 1);

//bar.append("text")
//    .attr("x", function (d) { return x(d.fill_lvl) - 3; })
//    .attr("y", barHeight / 2)
//    .attr("dy", ".35em")
//    .text(function (d) { return d.fill_lvl; });
