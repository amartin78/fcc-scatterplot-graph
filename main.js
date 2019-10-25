
d3.json('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
    .then((result) => {
        scatterPlotGraph(result);
    });

function time(t) {
    t = t.split(':');
    let time = new Date();
    time.setMinutes(t[0]);
    time.setSeconds(t[1]);

    return time.getTime();
}

function scatterPlotGraph(dataset) {

    d3.select('body')
        .append('h1')
        .attr('id', 'title')
        .text('Doping in Professional Bicycle Racing')

    const width = 1000;
    const height = 500;
    const padding = 100;

    const xScale = d3.scaleLinear()
                    .domain([ d3.min(dataset, (d) => d['Year'] - 1), 
                              d3.max(dataset, (d) => d['Year']) + 1 ])
                    .range([padding, width - padding]);

    const yScale = d3.scaleTime()
                    .domain([ d3.max(dataset, (d) => time(d['Time'])),
                              d3.min(dataset, (d) => time(d['Time'])) ])
                    .range([height - padding, padding]);

    const xAxis = d3.axisBottom(xScale)
                    .tickFormat((d) => {
                        return d;
                    });

    const yAxis = d3.axisLeft(yScale)
                    .tickFormat((d) => {
                        return d3.timeFormat('%M:%S')(d);
                    });

    const svg = d3.select('body')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height)

    let tooltip = d3.select('body')
                      .append('div')
                      .attr('width', '3rem')
                      .attr('height', '2rem')
                      .style('background-color', 'cadetblue')
                      .style('color', 'white')
                      .style('opacity', 0.95)
                      .style('font-size', '0.9rem')
                      .style('padding', '0.6rem')
                      .style('border-radius', '4px')
                      .attr('id', 'tooltip')
                      .style('position', 'absolute')
                      .style('visibility', 'hidden')

    svg.append('g')
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(xAxis)

    svg.append('g')
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
        .call(yAxis)

    svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('data-xvalue', (d) => d['Year'])
        .attr('data-yvalue', (d) => {
            return new Date(time(d['Time'])).toISOString()
        })
        .attr('r', '7')
        .attr('cx', (d) => xScale(d['Year']))
        .attr('cy', (d) => yScale(time(d['Time'])))
        .style('fill', 'cadetblue')
        .style('opacity', 0.8)
        .on('mouseover', function(d) {
            tooltip.attr('data-year', d['Year'])
            tooltip.style('visibility', 'visible')
            tooltip.html( d['Name'] + ' - ' + d['Nationality'] + '<br>' 
                        + d['Year'] + ' - ' + 'Time ' + d['Time'] + '<hr>'
                        + d['Doping'])
                   .style('top', padding + yScale(time(d['Time'])) + 3)
                   .style('left', padding + xScale(d['Year']) + 52)
        })
        .on('mouseout', (d) => {
            tooltip.style('visibility', 'hidden')
        })
        
    d3.select('body')
        .append('text')
        .attr('id', 'legend')
        .attr('x', 300)
        .attr('y', 260)
        .text('some aditional info...')

}







