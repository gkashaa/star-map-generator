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
    .style("background", "black")
    .style("margin", "-10");

// Add another SVG element (for the graticule)
svg.append("path")
    .attr("d", path(graticule))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-opacity", 1);

d3.csv("hyg.csv", function(error, data) {
    if (error) throw error;
    
    
    // add the stars to the map projection
    svg.selectAll("circle")
		.data(data)
                .enter()
		.append("circle")
        
                
		.attr("cx", function (d) { 
                     if (d.mag <= 6)
                            return projection(azimuthElevation(d.RA, d.Dec))[0]; }) // Right Acension -> Azimuth
                         
                
		.attr("cy", function (d) { 
                     if (d.mag <= 6)
                            return projection(azimuthElevation(d.RA, d.Dec))[1]; }) // Declination -> Elevation
                            
                      
        // Magnitude of the stars (not done)
		.attr("r", function (d) {
                    if (Math.sign(d.mag) === -1) {      // Checks for negative magnitudes
                        d.mag = -(d.mag);
                        return (d.mag); 
                    }
                        return (d.mag); 
                    }) 
    
		.attr("fill", "white");
    
    
    
    // add the name for each star
     svg.selectAll("text")
                .data(data)
                .enter()
		.append("text")
                
                .attr("x", d => projection(azimuthElevation(d.RA, d.Dec))[0])
                        
		.attr("y", d => projection(azimuthElevation(d.RA, d.Dec))[1])
                
                .attr("dy", -7) // set y position of bottom of text
                .style("fill", "aqua")
                .text((d) => d.name); 
     
            
d3.json("constellations.json", function(error, co) {
    if (error) throw error;     
   
        
        // create constellations 
         var pLine = d3.line()
            .x(function(p) { return (projection(azimuthElevation(p.ra, p.dec))[0]); })
            .y(function(p) { return (projection(azimuthElevation(p.ra, p.dec))[1]); })
            .defined(function (p) { return (p.space) !== null; });
            
    
            // add the constellations
            svg.append("path")
                .data(data)
                .attr("d", pLine(co))
                .attr("fill", "none")
                .attr("stroke", "#8ae8ff")
                .attr("stroke-width", "2");
      
            // add the constellation names
            svg.selectAll("text")
                .data(co)
                .enter()
                .append("text")
                .attr("x", function(p) { return ((projection(azimuthElevation(p.ra, p.dec))[0]) + 10); })
                .attr("y", function(p) { return (projection(azimuthElevation(p.ra, p.dec))[1]); })
                .attr("fill", "#fffb8a")
                .text(function(p) { return (p.con); });

            
    });
    
    
 });
