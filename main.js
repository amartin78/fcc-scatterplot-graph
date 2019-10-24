
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
        .text('Doping in Professional Bycicle Racing')

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
        .attr('r', '6')
        .attr('cx', (d) => xScale(d['Year']))
        .attr('cy', (d) => yScale(time(d['Time'])))
    
}







