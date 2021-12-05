// StarMath object
var star = new StarMath(-6.7924, 39.2083, 22.0984235779);

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

// Outline for 0
var outline = d3.geoCircle().radius(90).center([0, 90])();

// Create an SVG element (for the body)
var svg = d3.select("body")
    .append("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("fill", "currentColor")
    .style("background", "#1f1f1f")
    .style("margin", "-10");
  
// Add an SVG element (for the graticule)
svg.append("path") 
    .attr("d", path(graticule))
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-opacity", 1);

// Add an SVG element (for the outline)
svg.append("path")
    .attr("d", path(outline))
    .attr("fill", "none")
    .attr("stroke", "yellow");



d3.csv("https://raw.githubusercontent.com/gkashaa/star-map-generator/main/Source%20Code/hyg.csv", function(error, data) {
    if (error) throw error;


    
    // Add the stars to the map projection
    svg.selectAll("circle")
		.data(data)
                .enter()
		.append("circle")
		.attr("cx", function (d) { 
                     if (d.Mag <= 6)
                            return projection(star.azimuthElevation(d.RA, d.Dec))[0]; }) // Right Acension -> Azimuth
                
		.attr("cy", function (d) { 
                     if (d.Mag <= 6)
                            return projection(star.azimuthElevation(d.RA, d.Dec))[1]; }) // Declination -> Altitide
                             
		.attr("r", function (d) { 
                            return (magnitude(d.Mag)); })  // Magnitude of the stars
		.attr("fill", "white");
                
                
    
        
    // Add the name for each star
    var star_name = svg.selectAll("#star")
               .data(data)
               .enter()
               .append("text")
               .attr("x", d => projection(star.azimuthElevation(d.RA, d.Dec))[0] + 10)
               .attr("y", d => projection(star.azimuthElevation(d.RA, d.Dec))[1])
               .style("fill", "white")
               .text((d) => d.ProperName);
        
        
    // Checkbox to show/hide star labels
    var checkbox = document.getElementById('starLabel');        


    // Checkbox listener for the star label checkbox
    checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
          star_name.attr("opacity", 1);        // Show labels if checkbox is checked
        } else {
          star_name.attr("opacity", 0);        // Hide labels if checkbox is unchecked
        }
    });
    
  
  
           
     
   
d3.json("https://raw.githubusercontent.com/gkashaa/star-map-generator/main/Source%20Code/constellations.json", function(error, cons) {
    if (error) throw error;     

        
    // Create constellations 
    var pLine = d3.line()
       .x(function(p) { return (projection(star.azimuthElevation(p.ra, p.dec))[0]); })
       .y(function(p) { return (projection(star.azimuthElevation(p.ra, p.dec))[1]); })
       .defined(function (p) { return (p.new_line) !== null; });


    // Add the constellations
    svg.append("path")
        .data(cons)
        .attr("d", pLine(cons))
        .attr("fill", "none")
        .attr("stroke", "#8ae8ff")
        .attr("stroke-width", "2")     // Hides the constellations
        .attr("opacity", 0);    


    // Add the constellation names
    var con_name = svg.selectAll("#figure_text")
        .data(cons)
        .enter()
        .append("text")
        .attr("x", function(p) { if (p.new_line !== null) return ((projection(star.azimuthElevation(p.ra, p.dec))[0]) + 30); })
        .attr("y", function(p) { if (p.new_line !== null) return ((projection(star.azimuthElevation(p.ra, p.dec))[1])); })
        .attr("fill", "#fffb8a")
        .text(function(p) { 
                    return (p.con); });


    // Checkbox to show/hide constellation labels
    var checkbox_2 = document.getElementById('constellationLabel');     


    // Checkbox listener for the constellation label checkbox
    checkbox_2.addEventListener('change', (event) => {      
        if (event.currentTarget.checked) {
          con_name.attr("opacity", 1);        // Show labels if checkbox is checked                      
        } else {
          con_name.attr("opacity", 0);       // Hide labels if checkbox is unchecked 
        }
      });



    });
}); 

window.onload = function () {
  d3.select("#downLoadBtn").on("click", function () {
    var svgString = getSVGString(svg.node());
    svgString2Image(svgString, 2 * width, 2 * height, save); // passes Blob and filesize String to the callback

    function save(dataBlob, filesize) {
      saveAs(dataBlob, "star-map.jpg"); // FileSaver.js function
    }
  });

  // functions that handle actual exporting:
  function getSVGString(svgNode) {
    svgNode.setAttribute("xlink", "http://www.w3.org/1999/xlink");
    var cssStyleText = getCSSStyles(svgNode);
    appendCSS(cssStyleText, svgNode);

    var serializer = new XMLSerializer();
    var svgString = serializer.serializeToString(svgNode);
    svgString = svgString.replace(/(\w+)?:?xlink=/g, "xmlns:xlink=");
    svgString = svgString.replace(/NS\d+:href/g, "xlink:href"); 

    return svgString;

    function getCSSStyles(parentElement) {
      var selectorTextArr = [];

      // Add Parent element Id and Classes to the list
      selectorTextArr.push("#" + parentElement.id);
      for (var c = 0; c < parentElement.classList.length; c++)
        if (!contains("." + parentElement.classList[c], selectorTextArr))
          selectorTextArr.push("." + parentElement.classList[c]);

      // Add Children element Ids and Classes to the list
      var nodes = parentElement.getElementsByTagName("*");
      for (var i = 0; i < nodes.length; i++) {
        var id = nodes[i].id;
        if (!contains("#" + id, selectorTextArr))
          selectorTextArr.push("#" + id);

        var classes = nodes[i].classList;
        for (var c = 0; c < classes.length; c++)
          if (!contains("." + classes[c], selectorTextArr))
            selectorTextArr.push("." + classes[c]);
      }

      // Extract CSS Rules
      var extractedCSSText = "";
      for (var i = 0; i < document.styleSheets.length; i++) {
        var s = document.styleSheets[i];

        try {
          if (!s.cssRules) continue;
        } catch (e) {
          if (e.name !== "SecurityError") throw e; // for Firefox
          continue;
        }

        var cssRules = s.cssRules;
        for (var r = 0; r < cssRules.length; r++) {
          if (contains(cssRules[r].selectorText, selectorTextArr))
            extractedCSSText += cssRules[r].cssText;
        }
      }

      return extractedCSSText;

      function contains(str, arr) {
        return arr.indexOf(str) === -1 ? false : true;
      }
    }

    function appendCSS(cssText, element) {
      var styleElement = document.createElement("style");
      styleElement.setAttribute("type", "text/css");
      styleElement.innerHTML = cssText;
      var refNode = element.hasChildNodes() ? element.children[0] : null;
      element.insertBefore(styleElement, refNode);
    }
  }

  function svgString2Image(svgString, width, height, callback) {
    var imgsrc =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgString))); // Convert SVG string to data URL

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    canvas.width = width;
    canvas.height = height;

    var image = new Image();
    image.onload = function () {
      context.clearRect(0, 0, width, height);
      context.drawImage(image, 0, 0, width, height);

      canvas.toBlob(function (blob) {
        var filesize = Math.round(blob.length / 1024) + " KB";
        if (callback) callback(blob, filesize);
      });
    };

    image.src = imgsrc;
  }
};
