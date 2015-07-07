//Width and height
			var w = 1000;
			var h = 400;
			var padding = 40;
			
			var dataset = d3.csv("data.csv");
			
			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
						
			d3.csv('kc-education.csv', type, function(error, dataset) {
				
				var xScale = d3.scale.linear()
					.domain([0, dataset.length])
					.range([padding, w - padding]);	
					
				var yScale = d3.scale.linear()
					.domain(d3.extent(dataset, function(d) {return d.NOHS_CY; }))
					.range([padding, h - padding])
					.clamp(true);
					
				var hScale = d3.scale.linear()
					.domain(d3.extent(dataset, function(d) {return d.NOHS_CY; }))
					.range([0, h - (padding*2)])
					.clamp(true);
				
				var yAxisScale = d3.scale.linear()
					.domain(d3.extent(dataset, function(d) {return d.NOHS_CY; }))
					.range([h - (padding), padding])
					.clamp(true);
				
				var xAxisScale = d3.scale.ordinal()
					.rangeRoundBands([0, w], .05)
					.domain(dataset.map(function(d) { return d.ID; }));
				
				var xAxis = d3.svg.axis()
					.scale(xAxisScale)
					.orient("bottom")

				
				var yAxis = d3.svg.axis()
					.scale(yAxisScale)
					.orient("left")

				svg.selectAll("rect")
				   .data(dataset)
				   .enter()
				   .append("rect")
				   .attr("id", function(d) { 
						return "rect_" + d.ID; 
					})
				   .attr("x", function(d, i) {
						return (i * (w / dataset.length)) + padding;
					})
				   .attr("y", function(d) {
						return (h - yScale(d.NOHS_CY));
				   })
				   .attr("width", (w-padding) / dataset.length)
				   
				   .attr("height", function(d) {
						return hScale(d.NOHS_CY);
				   })
				   .attr("fill", function(d) {
						return "#00B08B";
				   });

				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(" + padding + ",0)")
					.call(yAxis);
					
				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate("+ padding + ", 360)")
					.call(xAxis)
					.selectAll("text")
					.style("text-anchor", "end")
					.attr("dx", "-.8em")
					.attr("dy", "-.55em")
					.attr("transform", "rotate(-90)" );

			});
			
			function type(d) {
				d.NOHS_CY = +d.NOHS_CY; // coerce to number
				return d;
			};
