
//SVG Size
var width = 700,
	height = 500;



// Load CSV file
d3.csv('data/wealth-health-2014.csv').then(function(data) {



	//sort the data
	console.log("Countries: " + data.length)
	data.sort(function(x, y){
   return x["Population"] - y["Population"];
	})

	//turn proper things form string to int
	data.forEach(function(item,index){
		item["Population"] = +item["Population"]
		item["LifeExpectancy"] = +item["LifeExpectancy"]
		item["Income"] = +item["Income"]

	});

	// Margin object with properties for the four directions
	let margin = {top: 20, right: 10, bottom: 20, left: 10};

	// Width and height as the inner dimensions of the chart area
	let widthInner = 700 - margin.left - margin.right,
	    heightInner = 500 - margin.top - margin.bottom;


	// Returns the minimum value in a given array (= 6900)
	var minIncome = d3.min(data, function(d) {
	  return d.Income;
	});

	var maxIncome = d3.max(data, function(d) {
		return d.Income;
	});


	var maxLifeEx = d3.max(data, function(d) {
	  return d.LifeExpectancy;
	});

	// Returns the minimum value in a given array (= 6900)
	var minLifeEx = d3.min(data, function(d) {
	  return d.LifeExpectancy;
	});

	let padding = 50;
	// console.log(maxIncome);
	// console.log(minIncome);
	// Creating a scale function



	let incomeScale = d3.scaleLog()
	  .domain([minIncome , maxIncome])
	  .range([50, width])



	let lifeExpectancyScale = d3.scaleLinear()
		.domain([minLifeEx , maxLifeEx ])
		.range([height, 0]);

		var maxPopulation = d3.max(data, function(d) {
			return d.Population;
		});

		var minPopulation = d3.min(data, function(d) {
			return d.Population;
		});

		let populationScale = d3.scaleLinear()
			.domain([minPopulation , maxPopulation])
			.range([4, 30]);



			var colorScale = d3.scaleOrdinal()
		    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]);

				colorScale.domain(data.map(function(d) {
						return d.Region;
				}));

			var svg = d3.select('#chart-area')
				.append("svg")
				.attr("width", widthInner + margin.left + margin.right)
			 	.attr("height", heightInner + margin.top + margin.bottom)
			 	.append("g")
			 	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


		  var circles = svg.selectAll("circle")
		      .data(data)

		   circles
		      .enter()
		      .append("circle")
		      .merge(circles)
		      .attr("cx", function(d){ return incomeScale(d.Income); })
		     	.attr("cy", function(d){ return lifeExpectancyScale(d.LifeExpectancy); })
					.attr("r", function(d){ return populationScale(d.Population); })
					.attr("stroke", "black")
					.attr("fill", function(d){ return colorScale(d.Region); })

					// Create an axis function specifying orientation (top, bottom, left, right)
			let xAxis = d3.axisBottom();

			// Pass in the scale function
			xAxis.scale(incomeScale)
			.tickArguments([6, "s"]);

			let yAxis = d3.axisLeft();

			// Pass in the scale function
			yAxis.scale(lifeExpectancyScale);

			svg.append("g")
		  .attr("class", "axis x-axis")
		  .call(xAxis)
			.attr("transform", "translate(0, 460)")
			.attr("text", "Income")

			var xAxisText = d3.select('.x-axis')
				.append("text")
				.text("Income");


			svg.append("g")
		  .attr("class", "axis y-axis")
		  .call(yAxis)
			.attr("transform", "translate(42, -15)")

			//y label
			svg.append("text")
	    .attr("class", "y label")
	    .attr("text-anchor", "end")
	    .attr("y", 10)
	    .attr("transform", "rotate(-90)")
	    .text("life Expectancy (years)");

			//x label
			svg.append("text")
	    .attr("class", "x label")
	    .attr("text-anchor", "end")
	    .attr("x", widthInner)
	    .attr("y", heightInner - 6)
	    .text("Income per Person (GDP per capita)");






});
