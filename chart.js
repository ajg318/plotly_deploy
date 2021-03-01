function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
  
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // Use the first sample from the list to build the initial plots
      var firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  // Initialize the dashboard
  init();
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildMetadata(newSample);
    buildCharts(newSample);
    
  }
  
  // Demographics Panel 
  function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      // Filter the data for the object with the desired sample number
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var guage = result.wfreq;
      // Use d3 to select the panel with id of `#sample-metadata`
      var PANEL = d3.select("#sample-metadata");
  
      // Use `.html("") to clear any existing metadata
      PANEL.html("");
  
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
  }
  
  // Bar and Bubble charts
  // Create the buildCharts function.
  function buildCharts(sample) {
    // Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
      // 3. Create a variable that holds the samples array. 
      var samples = data.samples;
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var samplesFilter = samples.filter(sampleObj => sampleObj.id == sample);
      var samplesSort = samplesFilter.sort((a,b) => b.sample.sample_values - a.sample.sample_values);
      var samplesArray = samplesSort.slice(0,10);
      console.log(samplesArray);

      
      
      // console.log(samplesSlice);
      //  5. Create a variable that holds the first sample in the array.
      var firstSample = samplesArray[0];
      console.log(firstSample);
      console.log(firstSample);
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
      var sampleId = firstSample.otu_ids;
      console.log(sampleId);
      var sampleLabels = firstSample.otu_labels;
      console.log(sampleId);
      var sampleValues = firstSample.sample_values;

      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var gauge = result.wfreq;
      console.log(guage);
  
      // Create the trace for the bar chart. 
      var barData = {
        x:[sampleId],
        y:[sampleValues],
        text:[sampleLabels],
        mode: 'makers',
        marker: {
          color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
          size: [40, 60, 80, 100]
        }
  
  
      };
      // Create the layout for the bar chart. 
      var barData = [{
        y: sampleLabels,
        x: sampleValues,
        type: "bar",
        orientation: 'h'
      }];
      // Use Plotly to plot the data with the layout. 
  
      // 1. Create the trace for the bubble chart.
      var bubbleData = {
        x:[sampleId],
        y:[sampleValues],
        text:[sampleLabels],
        mode: 'makers',
        marker: {
          color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
          size: [40, 60, 80, 100]
        }
  
  
      };
  
      // 2. Create the layout for the bubble chart.
      var bubbleLayout = {
        title: 'Bubble Chart',
        showlegend: false,
        height: 600,
        width: 600
      };

          // 4. Create the trace for the gauge chart.
    var gaugeData = [
        {
            domain: { x:gauge , y: [1,2,3,5,5,6,7] },
            value: samples,
            title: { text: "Scrubs Per Week" },
            type: "indicator",
            mode: "gauge+number"
        }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
      // 3. Use Plotly to plot the data with the layout.
      Plotly.newPlot("bar", barData);
      Plotly.newPlot("bubble", [bubbleData], [bubbleLayout]);
      Plotly.newPlot("gauge", gaugeData, [layout]);
      
    });
  }
  