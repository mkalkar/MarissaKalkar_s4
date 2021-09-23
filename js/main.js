
// SVG Size
var width = 700,
	height = 500;



// Load CSV file
d3.csv('data/wealth-health-2014.csv').then(function(data) {

	// Analyze the dataset in the web console

	console.log("Countries: " + data.length)
	data.sort(function(x, y){
   return d3.ascending(x.Population, y.Population);
	})
	console.log(data)
	data.forEach(function(item,index){
		item["Population"] = +item["Population"]
		item["LifeExpectancy"] = +item["LifeExpectancy"]
		item["Income"] = +item["Income"]

	});


	console.log(data)
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
	let incomeScale = d3.scaleLinear()
	  .domain([minIncome , maxIncome])
	  .range([padding, width-padding]);


	let lifeExpectancyScale = d3.scaleLinear()
		.domain([minLifeEx , maxLifeEx ])
		.range([height - padding, padding]);

		var maxPopulation = d3.max(data, function(d) {
			return d.Population;
		});

		var minPopulation = d3.min(data, function(d) {
			return d.Population;
		});

		let populationScale = d3.scaleLinear()
			.domain([minPopulation , maxPopulation])
			.range([4, 30]);

		var svg = d3.select('#chart-area')
			.append("svg")
			.attr("height", height)
			.attr("width", width);


		  var circles = svg.selectAll("circle")
		      .data(data)

		   circles
		      .enter()
		      .append("circle")
		      .merge(circles)
		      .attr("cx", function(d){ return incomeScale(d.Income); })
		     	.attr("cy", function(d){ return lifeExpectancyScale(d.LifeExpectancy); })
					.attr("r", function(d){ return populationScale(d.Population); })
					.attr("stroke", "green")
					.attr("fill", "green")

					// Create an axis function specifying orientation (top, bottom, left, right)
			let xAxis = d3.axisBottom();

			// Pass in the scale function
			xAxis.scale(incomeScale);

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
			.attr("transform", "translate(40, 0)")

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
	    .attr("x", width)
	    .attr("y", height - 6)
	    .text("Income per Person (GDP per capita)");



		


});
