
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then((result) => {
        scatterPlotGraph(result);
    });


function scatterPlotGraph(dataset) {

    d3.select('body')
        .append('h1')
        .attr('id', 'title')
        .text('Doping in Professional Bycicle Racing')

    const width = 1000;
    const height = 500;
    const padding = 100;

    const xScale = d3.scaleLinear()
                    .domain([0,1000])
                    .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
                    .domain([0,1000])
                    .range([height - padding, padding]);

    const xAxis = d3.axisBottom(xScale);

    const yAxis = d3.axisLeft(yScale);

    const svg = d3.select('body')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)

    svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(xAxis)

    svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
        .call(yAxis)

    
    
}







