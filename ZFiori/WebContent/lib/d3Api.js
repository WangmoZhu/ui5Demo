function d3API(json, container, onLineClick, onCircleClick) {
	// var height = $(container).height();
	// var width = $(container).width() + 30;
	var height = 200;
	var width = 1050;
	var Inwith = 1000;
	// var width = Inwith ;
	var time = 0;
	var scale;
	var img_l = 40;
	var data = json.data;
	var threshold = json.threshold;
	var normal = json.normal;

	var svg;
	var line_style = 'line';
	for (var i = 0; i < data.length; i++) {
		time = time + data[i].time;
	}
	// scale = (800 / time).toFixed(2)
	scale = (Inwith / time).toFixed(2) - 1;
		//得到x坐标和百分比value
	for (var i = 0; i < data.length; i++) {
		data[i].value = Math.round((data[i].time / time)*100 *5.9);
		var sum = 0;
		if (i > 0) {
			for (var k = 0; k <= i; k++) {
				sum = sum + (data[k].time) * scale;
			}
		} else {
			sum = 0;
		}
		data[i].x = sum + 40;
	}

	var i = 0;
	while(i < data.length){
		if (data[i].time > threshold){
			line_style = 'red';
			break;
		}
		i =  i +1;
	}
	if(line_style != 'red'){
		var i = 0;
		while(i<data.length){
			if(data[i].time < threshold && data[i].time >=normal){
				line_style = 'normal';
				break;
			}
		i = i+1;
		}
	}

	var body = d3.select(container);
	body.select("svg").remove;
	var svg = body.append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', [0, 0, width, height]);
	var lines = svg.selectAll('p')
		.data(data)
		.enter()
		.append('line');
	var texts = svg.selectAll('m')
		.data(data)
		.enter()
		.append('text');

	var texts_two = svg.selectAll('q')
		.data(data)
		.enter()
		.append('text');
	lines.attr('x1', function(d, i) {
			return d.x + img_l / 2;

		})
		.attr('x2', function(d, i) {
			if (i < data.length - 1) {
				x2 = data[i + 1].x - img_l / 2;

			} else {
				x2 = d.x + img_l / 2;
			}
			return x2;
		})
		.attr('y1', function(d, i) {
			return height / 2;
		})
		.attr('y2', function(d, i) {
			return height / 2;
		})
		.attr("class", line_style)
		.attr("stroke-width", 8)
		.attr('id', function(d, i) {
			return d.name;
		})
		.attr('time', function(d, i) {
			return d.time;
		})
		.on('click', function(d) {
			onLineClick(d);
		});
	texts.text(function(d, i) {
		return d.name;
	});
	texts.attr('x', function(d, i) {
			var x_w = this.getComputedTextLength();
			return d.x - x_w / 2;
		})
		.attr('y', function(d, i) {
			return height / 2 - 35;
		})
		.attr('class', 'text-name');
	texts_two.text(function(d, i) {
			if (i < data.length - 1) {
				return data[i + 1].value + '% :  ' + data[i + 1].time + 'h';
			}
		})
		.attr('x', function(d, i) {
			var x_w = this.getComputedTextLength();
			if (i < data.length - 1) {
				return d.x + (data[i + 1].x - data[i].x) / 2 - x_w / 2;
			}
		})
		.attr('class', 'text-info')
		.attr('y', function(d, i) {
			return height / 2 + 20;
		});

	var circles = svg.selectAll('circle').data(data).enter().append('circle');

	circles.attr('cx', function(d, i) {
			return d.x;
		})
		.attr('r', 20)
		.attr('cy', height / 2)
		.attr('class', "circle")
		//.attr('fill', 'white')
		.attr('stroke-width', 4);

	var icons = svg.selectAll('nodes').data(data).enter().append('text');
	icons.attr('x', function(d, i) {
			return d.x;
		})
		.attr('class','sapUiIcon')
		.attr("text-anchor", "start")
		.attr("dx", function(d) {
			return d.dx || '-10px';
		})
		.attr('dy', '10px')
		.attr('y', height / 2)
		.style("fill", "rgb(132, 143, 148)")
		.style("font-size", "20px")
		.style("font-family", "SAP-icons")
		.text(function(d) {
			return d.icon;
		})
		.on('click',function(d){
			onCircleClick&&onCircleClick(d);
		});

}