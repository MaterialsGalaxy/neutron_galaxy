<%
    ##import os
    hdadict = trans.security.encode_dict_ids( hda.to_dict() )
    root = h.url_for( '/static/' )
    home = h.url_for( '/' )
    csv_file = f"{root}datasets/{hdadict['id']}/your_dataset.csv"
    ##${h.javascript_link( root + 'plugins/visualizations/lineplot/static/lineplot.js' )}
    file_url =home +'datasets/'+hdadict['id']+"/display?to_ext="+".csv"

%>
<!DOCTYPE HTML>

<html>
    <head>
        <title> Line Plot ${hdadict} </title>
        <script src="https://d3js.org/d3.v7.min.js"></script>
    </head>
    <style>
        body {
            margin: 0;
            padding: 10px;
        }
        svg {
            width: 80vw;
            height: 70vh;
            border: 1px solid black;
        }
        .controls {
            margin-bottom: 20px;
        }
    </style>
    <body>
        <div class="controls">
            <label for="x-select">X-Axis:</label>
            <select id="x-select"></select>

            <label for="y-select">Y-Axis:</label>
            <select id="y-select"></select>

            <button id="render-reset">Reset</button> <!-- Reset zoom button -->
        </div>
        <svg></svg>
        ${h.javascript_link( root + 'plugins/visualizations/lineplot/static/lineplot.js' )}
        <script>
        loadCSV('${file_url}');
        </script>
    </body>
</html>