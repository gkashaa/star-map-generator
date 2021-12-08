// Colton Cappa, Gloria Kashaa, Jared Nicoll, Leonie Nutz

var p1, p2, p3, p4, p5, p6, p7, p8, p9;		//Objects of the PlanetMath class
var star;					//Object of the StarMath class
var moon;					//Object of the lunarMath class
var lat, long, month, day, year, hour, min;	//Global Variables


// Event listener for the user input
window.addEventListener('load', () => {


    lat = localStorage.getItem("Latitude");
    long = localStorage.getItem("Longitude");

    month = localStorage.getItem("Month");
    day = localStorage.getItem("Day");
    year = localStorage.getItem("Year");

    hour = localStorage.getItem("Hour");
    min = localStorage.getItem("Min");

    // Covert local time to Greenwich Mean Time
    var GMT_hour = hour + 6;
    var GMT_min = min;

    var date = year + (month/12) + (day/365);

    star  = new StarMath(lat, long, year, month, day, hour, min);

    p1 = new PlanetMath(1, "Mercury", year, month, day, GMT_hour, GMT_min, lat, long);
    p2 = new PlanetMath(2, "Venus", year, month, day, GMT_hour, GMT_min, lat, long);
    p3 = new PlanetMath(3, "Earth", year, month, day, GMT_hour, GMT_min, lat, long);
    p4 = new PlanetMath(4, "Mars", year, month, day, GMT_hour, GMT_min, lat, long);
    p5 = new PlanetMath(5, "Jupiter", year, month, day, GMT_hour, GMT_min, lat, long);
    p6 = new PlanetMath(6, "Saturn", year, month, day, GMT_hour, GMT_min, lat, long);
    p7 = new PlanetMath(7, "Uranus", year, month, day, GMT_hour, GMT_min, lat, long);
    p8 = new PlanetMath(8, "Neptune", year, month, day, GMT_hour, GMT_min, lat, long);
    p9 = new PlanetMath(9, "Pluto", year, month, day, GMT_hour, GMT_min, lat, long);

    var planetArray = [];
    planetArray[0] = p1.altitudeAzimuth();
    planetArray[1] = p2.altitudeAzimuth();
    //planetArray[2] = p3.altitudeAzimuth();
    planetArray[2] = p4.altitudeAzimuth();
    planetArray[3] = p5.altitudeAzimuth();
    planetArray[4] = p6.altitudeAzimuth();
    planetArray[5] = p7.altitudeAzimuth();
    planetArray[6] = p8.altitudeAzimuth();
    planetArray[7] = p9.altitudeAzimuth();

    moon = new LunarMath(date);
    var moonPhase = moon.moonPhase();
    console.log(moonPhase);
    if(moonPhase == 0){
        document.getElementById("imgID").src="newmoon.png";
    }
    else if(moonPhase == 1){
        document.getElementById("imgID").src="firstquarter.png";
        }
    else if(moonPhase == 2){
        document.getElementById("imgID").src="fullmoon.png";
    }
    else{
        document.getElementById("imgID").src="thirdquarter.png";
    }


    // Draw the planets
        var planets = svg.selectAll("circle")
                    .data(planetArray)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) { return projection(d)[0]; })      // Azimuth of the planets
                    .attr("cy", function (d) { return projection(d)[1]; })      // Altitude of the planets
                    .attr("r", "40px")
                    .attr("fill", "blue");


        // Add the planet names next to the drawings
        var planet_names = svg.selectAll("#planet_text")
                    .data(planetArray)
                    .enter()
                    .append("text")
                    .attr("x", function (d) {return projection(d)[0] + 40; })
                    .attr("y", function (d) {return projection(d)[1]; })
                    .attr("fill", "white")
                    .text(function(d) { return (d)[2]; });


        // Checkbox to show/hide planet labels
        var planet_box = document.getElementById("planetLabel");

        // Checkbox listener for the planet label checkbox
        planet_box.addEventListener('change', (event) => {
                if (event.currentTarget.checked) {
                  planet_names.attr("opacity", 1);        // Show labels if checkbox is checked
                } else {
                  planet_names.attr("opacity", 0);        // Hide labels if checkbox is unchecked
                }
            });

        });



// Dimensions of the projection
var width = 5000;
var height = 5000;

// Create and configure stereographic projection
var projection = d3.geoSatellite()
            .scale(2500)
            .translate([width / 2, height / 2]);

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
               .style("fill", "aqua")
               .text((d) => d.ProperName);


    // Checkbox to show/hide star labels
    var star_box = document.getElementById('starLabel');


    // Checkbox listener for the star label checkbox
    star_box.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
          star_name.attr("opacity", 1);        // Show labels if checkbox is checked
        } else {
          star_name.attr("opacity", 0);        // Hide labels if checkbox is unchecked
        }
    });


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
    var con_name = svg.selectAll("#con")
        .data(cons)
        .enter()
        .append("text")
        .attr("x", function(p) { if (p.new_line !== null) return ((projection(star.azimuthElevation(p.ra, p.dec))[0]) + 30); })
        .attr("y", function(p) { if (p.new_line !== null) return ((projection(star.azimuthElevation(p.ra, p.dec))[1])); })
        .attr("fill", "yellow")
        .text(function(p) {
                    return (p.con); });


    // Checkbox to show/hide constellation labels
    var con_box = document.getElementById('constellationLabel');


    // Checkbox listener for the constellation label checkbox
    con_box.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
          con_name.attr("opacity", 1);        // Show labels if checkbox is checked
        } else {
          con_name.attr("opacity", 0);       // Hide labels if checkbox is unchecked
        }
      });


});

d3.csv("https://raw.githubusercontent.com/gkashaa/star-map-generator/main/Source%20Code/messier.csv", function(error, messier) {
    if (error) throw error;

    // Add the messier objects to the map projection
    svg.selectAll("circle")
		.data(messier)
                .enter()
		.append("circle")
		.attr("cx", function (d) { return projection(star.azimuthElevation(d.ra, d.dec))[0]; }) // Right Acension -> Azimuth

		.attr("cy", function (d) { return projection(star.azimuthElevation(d.ra, d.dec))[1]; }) // Declination -> Altitide

		.attr("r", "8px")  // Magnitude of the messier objecrs
		.attr("fill", "orange");




    // Add the name for each star
    var messier_name = svg.selectAll("#messier")
               .data(messier)
               .enter()
               .append("text")
               .attr("x", d => projection(star.azimuthElevation(d.ra, d.dec))[0] + 10)
               .attr("y", d => projection(star.azimuthElevation(d.ra, d.dec))[1])
               .style("fill", "orange")
               .text((d) => d.id);


    // Checkbox to show/hide star labels
    var messier_box = document.getElementById('messierLabel');


    // Checkbox listener for the messier label checkbox
    messier_box.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
          messier_name.attr("opacity", 1);        // Show labels if checkbox is checked
        } else {
          messier_name.attr("opacity", 0);        // Hide labels if checkbox is unchecked
        }
    });


});


delete star;                                // Delete star object
delete p1, p2, p3, p4, p5, p6, p7, p8, p9;  // Delete planet objects
delete moon;                                // Delete moon object

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
