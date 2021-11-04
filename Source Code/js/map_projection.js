// Dimensions of the projection
var width = 5000;       
var height = 5000;      

// Create and configure stereographic projection
var projection = d3.geoStereographic()
    .scale(800)
    .translate([width / 2, height / 2])
    .rotate([0, -90]);

// Create geographic path generator
var path = d3.geoPath(projection);

// Create a graticule generator (grid of meridians and parallels)
var graticule = d3.geoGraticule()
    .stepMinor([45, 10])();

// Create an SVG element (for the body)
var svg = d3.select("body")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("fill", "currentColor")
    .style("margin", "-10");

// Add another SVG element (for the graticule)
svg.append("path")
    .attr("d", path(graticule))
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-opacity", 1);

