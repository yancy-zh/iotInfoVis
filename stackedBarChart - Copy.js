
var causes = ["exp", "fill_lvl"];

var parseDate = d3.time.format("%H/%d").parse;

var margin = { top: 20, right: 50, bottom: 30, left: 20 },
    width = 1700 - margin.left - margin.right,
    height = 140 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width]);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var z = d3.scale.category10();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format("%H/%d"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("right");

var myFileList = ["070c47082e9c2a1d", "070c47082e9c371d", "070447082e9c2c3d", "070447082e9c2f3c", "070847082e9c3722", "070947082e9c2a1c", "071247082e9c2a19", "071247082e9c2f1e", "071247082e9c311a", "071247082e9c361e", "071247082e9c2517", "071247082e9c2918"];

function type(d) {
//    console.log(d.date);
    d.date = parseDate(d.date);
    causes.forEach(function (c) { d[c] = +d[c]; });
    return d;
}


//////////////////////////////////////////////////////////////////
myFileList.forEach(function(filename){
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv(filename.concat(".tsv"), type, function (error, crimea) {
        if (error) throw error;
        var layers = d3.layout.stack()(causes.map(function (c) {
            return crimea.map(function (d) {
                return { x: d.date, y: d[c] };
            });
        }));
        console.log(crimea[1]);
        x.domain(layers[0].map(function (d) { return d.x; }));

        y.domain([0, d3.max(layers[layers.length - 1], function (d) { return d.y0 + d.y; })]).nice();
        var layer = svg.selectAll(".layer")
            .data(layers)
            .enter().append("g")
            .attr("class", "layer")
            .style("fill", function (d, i) { return z(i); });

        layer.selectAll("rect")
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("x", function (d) { return x(d.x); })
            .attr("y", function (d) { return y(d.y + d.y0); })
            .attr("height", function (d) { return y(d.y0) - y(d.y + d.y0); })
            .attr("width", x.rangeBand() - 1);

        svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "axis axis--y")
            .attr("transform", "translate(" + width + ",0)")
            .call(yAxis);
    });
});
