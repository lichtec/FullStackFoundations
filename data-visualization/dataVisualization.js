//Width and height
			var w = 1250;
			var h = 500;
			var padding = 55;
						
			//Create SVG element
			var body = d3.select("body");
			var svg = body.append("svg")
				.attr("width", w)
				.attr("height", h);
						
			d3.csv('kc-education.csv', type, function(error, dataset) {
				
				//var headerNames = d3.keys(dataset[0]);
				//headerNames = headerNames.slice(4, -2);
				
				var xScale = d3.scale.linear()
					.domain([0, dataset.length])
					.range([padding, w - padding])
					.clamp(true);	
					
				var yScale = d3.scale.linear()
					.domain(d3.extent(dataset, function(d) {return d['EDUCBASECY']; }))
					.range([padding, h - padding])
					.clamp(true);
					
				var hScale = d3.scale.linear()
					.domain(d3.extent(dataset, function(d) {return d['EDUCBASECY']; }))
					.range([0, h - (padding*2)])
					.clamp(true);
				
				var yAxisScale = d3.scale.linear()
					.domain(d3.extent(dataset, function(d) {return d['EDUCBASECY']; }))
					.range([h - (padding), padding])
					.clamp(true);
				
				var xAxisScale = d3.scale.ordinal()
					.domain(dataset.map(function(d) { return d.ID; }))
					.rangeBands([padding, w-padding]);
				
				var xAxis = d3.svg.axis()
					.scale(xAxisScale)
					.orient("bottom");

				
				var yAxis = d3.svg.axis()
					.scale(yAxisScale)
					.orient("left");
					
				svg.selectAll("rect")
				   .data(dataset)
				   .enter()
				   .append("rect")
				   .attr("id", function(d) { 
						return "rect_" + d.ID; 
					})
				   .attr("x", function(d, i) {
						return (xScale(i));
					})
				   .attr("y", function(d) {
						return (h - yScale(d['EDUCBASECY']));
				   })
				   .attr("width", function(d, i) {
						return (xScale(i+1) - xScale(i)-2);
					})
				   
				   .attr("height", function(d) {
						return hScale(d['EDUCBASECY']);
				   })
				   .attr("fill", function(d) {
						return "#00B08B";
					});
					//.attr("stroke", "orange")
					//.attr("stroke-width", 3);

				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(" + padding + ",0)")
					.call(yAxis);
					
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(-.5," + (h - padding) + ")")
					.call(xAxis)
					.selectAll("text")
					.style("text-anchor", "end")
					.attr("dx", "-.8em")
					.attr("dy", "-.55em")
					.attr("transform", "rotate(-90)" );

			});
			
			function type(d) {
				d['EDUCBASECY'] = +d['EDUCBASECY']; // coerce to number
				return d;
			};
