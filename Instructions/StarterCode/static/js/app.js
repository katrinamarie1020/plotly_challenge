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
        let filterSample = data.samples.filter(d => d.id==sample)
    
        let sample_data = filterSample[0]

        let otu_ids = sample_data.otu_ids;
        
        let otu_labels = sample_data.otu_labels;
        let sample_values = sample_data.sample_values;

        // sort the data
        var sorted = sample_values.sort(function sortFunction(a, b) {
            return b.sample_values - a.sample_values;
          });
          
// Slice the first 10 objects for plotting
slicedData = sorted.slice(0, 10);

// Reverse the array to accommodate Plotly's defaults
reversedData = slicedData.reverse();

// console.log(reversedData)

// Trace1 for the OTU Data
var trace1 = {
  x: slicedData,
  y: otu_ids.slice(0, 10).map(object => `OTU ${object}`).reverse(), 
  text: otu_labels.slice(0, 10).reverse(),
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



var bubbleData = [{
    x: otu_ids,
    y: sample_values,
    mode: 'markers',
    text: otu_labels,
    marker: {
    size: sample_values,
    color: otu_ids,
    }
}];

var bubblelayout = {
    title: 'Bacteria Cultures per Sample',
    margin: {t:0},
    xaxis: {title: "OTU ID"},
    margin: {t: 30}
};

Plotly.newPlot('bubble', bubbleData, bubblelayout);
    
            
 });

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
console.log(newSample)
}

// Initialize dashboard on page load
init();

