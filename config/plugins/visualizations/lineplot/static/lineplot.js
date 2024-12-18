function loadFile(file_url,extension){
    if (extension == "tabular"){
        dataLoader = d3.tsv;
    }
    else if (extension == "csv"){
        dataLoader = d3.csv;
    }
    dataLoader(file_url).then(data => {
        if (data.length > 0) {
            const columnHeaders = Object.keys(data[0]);
    
            // Populate the dropdowns with the column headers
            const xSelect = d3.select("#x-select");
            const ySelect = d3.select("#y-select");
            xSelect.selectAll('option').data(columnHeaders).enter().append("option").text(function (d) {return d;})
            ySelect.selectAll('option').data(columnHeaders).enter().append("option").text(function (d) {return d;})
    
            // Set initial selections
            xSelect.property("value", columnHeaders[0]);
            ySelect.property("value", columnHeaders[1]);
    
            // Define margins
            const margin = { top: 20, right: 30, bottom: 40, left: 60 };
    
            function renderChart() {
                // Get selected columns
                const xColumn = xSelect.property("value");
                const yColumn = ySelect.property("value");
    
                const xVals = data.map(d => +d[xColumn]).filter(d => !isNaN(d));
                const yVals = data.map(d => +d[yColumn]).filter(d => !isNaN(d));
    
                // Clear existing SVG content
                d3.select("svg").selectAll("*").remove();
    
                // Get current SVG dimensions
                const svg = d3.select("svg");
                const svgWidth = parseFloat(svg.style("width"));
                const svgHeight = parseFloat(svg.style("height"));
    
                // Set viewBox dynamically based on current width/height
                svg.attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`);
    
                const width = svgWidth - margin.left - margin.right;
                const height = svgHeight - margin.top - margin.bottom;
    
                const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    
                // Set the scales based on current width/height
                const x = d3.scaleLinear()
                    .domain([d3.min(xVals) * 0.9, d3.max(xVals) * 1.1])  // X-values on the X-axis
                    .range([0, width]);
    
                const y = d3.scaleLinear()
                    .domain([d3.min(yVals) * 0.9, d3.max(yVals) * 1.1])  // Y-values on the Y-axis
                    .range([height, 0]);
    
                // Add the X axis
                const xAxis = g.append("g")
                    .attr("transform", `translate(0,${height})`)
                    .call(d3.axisBottom(x));
    
                // Add the Y axis
                const yAxis = g.append("g")
                    .call(d3.axisLeft(y));
    
                // Define the line
                const line = d3.line()
                    .x(d => x(+d[xColumn]))  // X-values on X-axis
                    .y(d => y(+d[yColumn]));  // Y-values on Y-axis
    
                // Add the line to the plot
                g.append("path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);
    
                // Add zoom functionality
                const zoom = d3.zoom()
                    .scaleExtent([1, 10])
                    .on("zoom", (event) => {
                        const new_x = event.transform.rescaleX(x);
                        const new_y = event.transform.rescaleY(y);
    
                        // Update axes
                        xAxis.call(d3.axisBottom(new_x));
                        yAxis.call(d3.axisLeft(new_y));
    
                        // Update line and circles
                        g.selectAll(".line")
                            .attr("d", line.x(d => new_x(+d[xColumn]))
                                           .y(d => new_y(+d[yColumn])));
                    });
    
                svg.call(zoom);
            }
    
            // Initial rendering
            renderChart();
    
            // Redraw the chart when the selected column changes
            xSelect.on("change", renderChart);
            ySelect.on("change", renderChart);
    
            // Redraw the chart on window resize
            window.addEventListener('resize', renderChart);
            d3.select("#render-reset").on("click", renderChart);
    
        } else {
            console.error("The CSV file is empty or not loaded correctly.");
        }
    }).catch(error => {
        console.error('Error loading the CSV file:', error);
    });
    
    }