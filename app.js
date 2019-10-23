var width = 800;
var height = 600;
var padding = 50;
var barPadding = 1;
var ageData = regionData.filter(d => d.medianAge !== null);
var initialBinCount = 16;

var medianAge = d3.select('#medianAge')
  .attr('width', width)
  .attr('height', height);

d3.select('#medianAgeInput')
  .property('value', initialBinCount)
  .on('input', function() {
    updateRects(+d3.event.target.value);
  });

medianAge.append('g')
  .attr('transform', 'translate(0,' + (height - padding) + ')')
  .classed('x-axis', true);

medianAge.append('g')
  .attr('transform', 'translate(' + padding + ', 0)')
  .classed('y-axis', true);

medianAge.append('text')
  .attr('x', width / 2)
  .attr('y', height - 10)
  .style('text-anchor', 'middle')
  .text('Median Age');

medianAge.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', - height / 2)
  .attr('y', 15)
  .style('text-anchor', 'middle')
  .text('Frequency');

updateRects(initialBinCount);



function updateRects(val) {
  var xScale = d3.scaleLinear()
    .domain(d3.extent(ageData, d => d.medianAge))
    .rangeRound([padding, width - padding]);

  var histogram = d3.histogram()
    .domain(xScale.domain())
    .thresholds(xScale.ticks(val))
    .value(d => d.medianAge);

  var bins = histogram(ageData);

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)])
    .range([height - padding, padding]);
  
  d3.select('.y-axis')
    .call(d3.axisLeft(yScale));

  d3.select('.x-axis')
    .call(d3.axisBottom(xScale)
      .ticks(val))
    .selectAll('text')
    .attr('y', -3)
    .attr('x', 10)
    .attr('transform', 'rotate(90)')
    .style('text-anchor', 'start');

  var rect = medianAge
    .selectAll('rect')
    .data(bins);

  rect
    .exit()
    .remove();

  rect
    .enter()
    .append('rect')
    .merge(rect)
    .attr('x', d => xScale(d.x0))
    .attr('y', d => yScale(d.length))
    .attr('height', d => height - padding - yScale(d.length))
    .attr('width', d => xScale(d.x1) - xScale(d.x0) - barPadding)
    .attr('fill', 'blue');

  d3.select('#medianAge-bin-count')
    .text('Number of bins: ' + bins.length);
}



var width = 800;
var height = 600;
var padding = 50;
var barPadding = 1;
var urbanPopulationData = regionData.filter(d => d.urbanPopulationRate !== null);
var urbanBin = 16;

var urbanPopulationRate = d3.select('#urbanPopulationRate')
  .attr('width', width)
  .attr('height', height);

d3.select('#urbanPopulationRateInput')
  .property('value', urbanBin)
  .on('input', function() {
    updateRects2(+d3.event.target.value);
  });

urbanPopulationRate.append('g')
  .attr('transform', 'translate(0,' + (height - padding) + ')')
  .classed('x-axis1', true);

urbanPopulationRate.append('g')
  .attr('transform', 'translate(' + padding + ', 0)')
  .classed('y-axis1', true);

urbanPopulationRate.append('text')
  .attr('x', width / 2)
  .attr('y', height - 10)
  .style('text-anchor', 'middle')
  .text('Percentage Urban Population');

urbanPopulationRate.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', - height / 2)
  .attr('y', 15)
  .style('text-anchor', 'middle')
  .text('Number of Nations');

updateRects2(urbanBin);



function updateRects2(val) {
  var xScale = d3.scaleLinear()
    .domain(d3.extent(urbanPopulationData, d => d.urbanPopulationRate))
    .rangeRound([padding, width - padding]);

  var histogram = d3.histogram()
    .domain(xScale.domain())
    .thresholds(xScale.ticks(val))
    .value(d => d.urbanPopulationRate);

  var bins = histogram(urbanPopulationData);

  var yScale= d3.scaleLinear()
    .domain([0, d3.max(bins, d => d.length)])
    .range([height - padding, padding]);
  
  d3.select('.y-axis1')
    .call(d3.axisLeft(yScale));

  d3.select('.x-axis1')
    .call(d3.axisBottom(xScale)
      .ticks(val))
    .selectAll('text')
    .attr('y', -3)
    .attr('x', 10)
    .attr('transform', 'rotate(90)')
    .style('text-anchor', 'start');

  var rect = urbanPopulationRate
    .selectAll('rect')
    .data(bins);

  rect
    .exit()
    .remove();

  rect
    .enter()
    .append('rect')
    .merge(rect)
    .attr('x', d => xScale(d.x0))
    .attr('y', d => yScale(d.length))
    .attr('height', d => height - padding - yScale(d.length))
    .attr('width', d => {
      var width = xScale(d.x1)- xScale(d.x0) - barPadding;
      return width < 0 ? 0 : width;
    })
    .attr('fill', 'green');

  d3.select('#urbanPopulationRate-bin-count')
    .text('Number of bins: ' + bins.length);
}
