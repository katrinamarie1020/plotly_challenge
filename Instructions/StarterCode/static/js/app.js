/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// Define a function that will create metadata for given sample
function buildMetadata(sample) {
    
    // Read the json data
    d3.json("samples.json").then(function(data){
        
        var filterData = data.metadata.filter(d => d.id === parseInt(sample))
        
       var sampleMetadata = filterData[0]
       d3.select("#sample-metadata").html("");
      
       Object.entries(sampleMetadata).forEach(function([key, value]) {
          
        var p = d3.select("#sample-metadata").append("p");
        p.text(`${key}: ${value}`);
       });
    });

        
}


// Define a function that will create charts for given sample
function buildCharts(sample) {

    // Read the json data
    d3.json("samples.json").then(function(data){
        // Parse and filter the data to get the sample's OTU data
        let filterSample = data.samples.filter(d => d.sample_values=== parseInt(sample))
        var sample_data = filterSample[0]
        console.log(sample_data)

        // sort the data
        var sorted = filterSample.sort(function sortFunction(a, b) {
            return b.sample_values - a.sample_values;
          });

// Slice the first 10 objects for plotting
slicedData = sorted.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

// ONLY RETURNS 10 IDs, NOT THE TOP 10 SAMPLE VALUES
// console.log(reversedData)

// Trace1 for the OTU Data
var trace1 = {
  x: reversedData.map(object => object.sample_values),
  y: reversedData.map(object => object.otu_ids),
  text: reversedData.map(object => object.otu_labels),
  name: "Top 10 OTUs",
  type: "bar",
  orientation: "h"
};

// data
var data = [trace1];

// Apply the group bar mode to the layout
var layout = {
  title: "Top 10 OTUs",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

 // Create bar chart in correct location
Plotly.newPlot("bar", data, layout);    
            
          });

        
        // data.samples---filter data 
        // will output a dictionary of arrays
        // slice and reverse
        // make the OTUid a string otu then the id, ex: otu1150
        // Pay attention to what data is required for each chart

       

        // Create bubble chart in correct location
        // <div id="bubble"></div>
        // don't need to slice and reverse

        var trace1 = {
            x: [1, 2, 3, 4],
            y: [10, 11, 12, 13],
            mode: 'markers',
            marker: {
              size: [40, 60, 80, 100]
            }
          };
          
          var data = [trace1];
          
          var layout = {
            title: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot('bubble', data, layout);
}

// Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then(function(data){
        
        var nameData = data.names
        // console.log(nameData)
 
        nameData.forEach(function(name) {
        
            var option = d3.select("#selDataset").append("option");
            option.property("value", name);
    
        
         option.text(name);
        });
     });
        // Parse and filter data to get sample names

        // Add dropdown option for each sample

    // Use first sample to build metadata and initial plots
    buildMetadata("940")
    buildCharts("940")
}

function optionChanged(newSample){

    // Update metadata with newly selected sample
    buildMetadata(newSample);
    buildCharts(newSample);
    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();

