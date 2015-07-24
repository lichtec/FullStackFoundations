//Width and height
			var w = 1250;
			var h = 500;
			var padding = 60;
						
			//Create SVG element
			var body = d3.select("body");
			var slider = d3.selectAll(".slider");
			
						
			d3.csv('kc-education.csv', type, function(error, dataset) {
				d3.csv('kc-education-layout.csv', type, function(error, dataset_layout) {
				
					var headerNames = d3.keys(dataset[0]);
					headerNames = headerNames.slice(4, -2);
					for(var i = 0; i < headerNames.length; i++) {
					
						var slide = slider.append('div').attr('class', 'slide');
						var svg = slide.append("svg")
							.attr("width", w)
							.attr("height", h);
						
						var xScale = d3.scale.linear()
						.domain([0, dataset.length])
						.range([padding, w - padding])
						.clamp(true);	
						
						var yScale = d3.scale.linear()
							.domain(d3.extent(dataset, function(d) {return d[headerNames[i]]; }))
							.range([padding, h - padding])
							.clamp(true);
							
						var hScale = d3.scale.linear()
							.domain(d3.extent(dataset, function(d) {return d[headerNames[i]]; }))
							.range([0, h - (padding*2)])
							.clamp(true);
						
						var yAxisScale = d3.scale.linear()
							.domain(d3.extent(dataset, function(d) {return d[headerNames[i]]; }))
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
								return (h - yScale(d[headerNames[i]]));
						   })
						   .attr("width", function(d, i) {
								return (xScale(i+1) - xScale(i)-2);
							})
						   
						   .attr("height", function(d) {
								return hScale(d[headerNames[i]]);
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
							
						svg.append("text")
							.attr("x", (w / 2))             
							.attr("y", (padding / 2))
							.attr("text-anchor", "middle")  
							.style("font-size", "16px") 
							.style("text-decoration", "underline")  
							.text(headerNames[i]);
						
						svg.append("text")
							.attr("x", (w / 2))             
							.attr("y", (h - 5))
							.attr("text-anchor", "middle")  
							.style("font-size", "14px") 
							.style("text-decoration", "underline")  
							.text('Zip Codes');
							
						svg.append("text")
							.attr("transform", "rotate(-90)")
							.attr("y", 0 )
							.attr("x",0 - (h / 2))
							.attr("dy", "1em")
							.style("text-anchor", "middle")
							.style("font-size", "14px")
							.style("text-decoration", "underline")
							.text("Population");
						}
				});
			});
			
			function edu_type(d) {
						d['EDUCBASECY'] = +(d['EDUCBASECY'].replace(/[,]/ig, "")); // coerce to number and remove stupid commas
						d['NOHS_CY'] = +(d['NOHS_CY'].replace(/[,]/ig, ""));
						d['SOMEHS_CY'] = +(d['SOMEHS_CY'].replace(/[,]/ig, ""));
						d['HSGRAD_CY'] = +(d['HSGRAD_CY'].replace(/[,]/ig, ""));
						d['GED_CY'] = +(d['GED_CY'].replace(/[,]/ig, ""));
						d['SMCOLL_CY'] = +(d['SMCOLL_CY'].replace(/[,]/ig, ""));
						d['ASSCDEG_CY'] = +(d['ASSCDEG_CY'].replace(/[,]/ig, ""));
						d['BACHDEG_CY'] = +(d['BACHDEG_CY'].replace(/[,]/ig, ""));
						d['GRADDEG_CY'] = +(d['GRADDEG_CY'].replace(/[,]/ig, ""));
						return d;
					};
				
			d3.csv('kc-demographics-and-income.csv', income_type, function(error, dataset) {
				
				var headerNames = d3.keys(dataset[0]);
				headerNames = headerNames.slice(4, -2);
				for(var i = 0; i < headerNames.length; i++) {
					//alert(headerNames[i]);
					if(headerNames[i] == "MEDHINC_CY" || headerNames[i] == "AVGHINC_CY" || headerNames[i] == "MEDHINC_FY" || headerNames[i] == "AVGHINC_FY") { 
					
						var slide = slider.append('div').attr('class', 'slide');
						var svg = slide.append("svg")
							.attr("width", w)
							.attr("height", h);
						
						var xScale = d3.scale.linear()
						.domain([0, dataset.length])
						.range([padding, w - padding])
						.clamp(true);	
						
						var yScale = d3.scale.linear()
							.domain(d3.extent(dataset, function(d) {return d[headerNames[i]]; }))
							.range([padding, h - padding])
							.clamp(true);
							
						var hScale = d3.scale.linear()
							.domain(d3.extent(dataset, function(d) {return d[headerNames[i]]; }))
							.range([0, h - (padding*2)])
							.clamp(true);
						
						var yAxisScale = d3.scale.linear()
							.domain(d3.extent(dataset, function(d) {return d[headerNames[i]]; }))
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
								return (h - yScale(d[headerNames[i]]));
						   })
						   .attr("width", function(d, i) {
								return (xScale(i+1) - xScale(i)-2);
							})
						   
						   .attr("height", function(d) {
								return hScale(d[headerNames[i]]);
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
							
						svg.append("text")
							.attr("x", (w / 2))             
							.attr("y", (padding / 2))
							.attr("text-anchor", "middle")  
							.style("font-size", "16px") 
							.style("text-decoration", "underline")  
							.text(headerNames[i]);
						
						svg.append("text")
							.attr("x", (w / 2))             
							.attr("y", (h - 5))
							.attr("text-anchor", "middle")  
							.style("font-size", "14px") 
							.style("text-decoration", "underline")  
							.text('Zip Codes');
							
						svg.append("text")
							.attr("transform", "rotate(-90)")
							.attr("y", 0 )
							.attr("x",0 - (h / 2))
							.attr("dy", "1em")
							.style("text-anchor", "middle")
							.style("font-size", "14px")
							.style("text-decoration", "underline")
							.text("Income (USD)");
						}
				}
			});
			
			function income_type(d) {
						d['MEDHINC_CY'] = +(d['MEDHINC_CY'].replace(/[,]/ig, "")); // coerce to number and remove stupid commas
						d['AVGHINC_CY'] = +(d['AVGHINC_CY'].replace(/[,]/ig, ""));
						d['MEDHINC_FY'] = +(d['MEDHINC_FY'].replace(/[,]/ig, ""));
						d['AVGHINC_FY'] = +(d['AVGHINC_FY'].replace(/[,]/ig, ""));
						return d;
					};	
