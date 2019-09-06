jQuery.sap.require('sap/ui/thirdparty/d3');
jQuery.sap.declare('ags_kpi_tree.controls.TileHierarchy.TileHierarchy');
sap.ui.core.Control.extend(
    'ags_kpi_tree.controls.TileHierarchy.TileHierarchy',
    {
        data: null,
        config: {
            rectW: 148,
            rectH: 144,
            rectPadding: 8
        },
        dataOri: null,
        i: 0,
        scale: 1,

        metadata: {
            properties: {
                direction: {
                    defaultValue: 'v'
                },
                rectW: {
                    defaultValue: 148
                },
                rectH: {
                    defaultValue: 144
                },
                width: {
                    type: 'sap.ui.core.CSSSize',
                    defaultValue: '100%'
                },
                height: {
                    type: 'sap.ui.core.CSSSize',
                    defaultValue: '100%'
                },
                type: {
                    defaultValue: 'tree'
                }
            },
            aggregations: {
                content: {
                    singularName: 'content'
                }
            },
            events: {
                lineClick: {},
                chartClick: {},
                imageClick: {}
            }
        },

        init: function () {
            // jQuery.sap.includeStyleSheet("../application/Dashboard/control/TileHierarchy/TileHierarchy.css");
            var csspath = jQuery.sap.getModulePath(
                'sap.vo.mengniu',
                '/control/TileHierarchy/TileHierarchy.css'
            );
            jQuery.sap.includeStyleSheet(csspath);
            this.data = null;
            this.dataOri = null;
        },

        setData: function (data) {
            this.data = this._mapAttributes(data);
            this.dataOri = $.extend(true, {}, this.data);
        },

        /**
         * Update node (tile) in tree control
         *&nbsp;
         * @param sId
         * @param oTileData
         * @param aNodeSet
         */
        updateTile: function (sId, oTileData, aNodeSet) {
            var that = this;

            if (!aNodeSet) {
                aNodeSet = [this.data];
            }

            aNodeSet.forEach(function (node) {
                if (node.id == sId) {
                    // Update
                    // console.log(sId);

                    // Update model
                    node.number = oTileData.number;
                    node.factor = oTileData.factor;
                    node.numbercolor = oTileData.numbercolor;
                    node.dataLoadFinished = true;

                    // Update UI
                    var oD3Tile = d3.select('#' + sId);

                    oD3Tile
                        .select('.tree-tile-factor')
                        .style(
                            'fill',
                            that.val(node.numbercolor, 'rgb(132, 143, 148)')
                        )
                        .text(that.val(node.factor, ''))
                        .each(function (d) {
                            d.factorWidth = this.getComputedTextLength();
                        });
                    oD3Tile
                        .select('.tree-tile-number')
                        .style(
                            'fill',
                            that.val(node.numbercolor, 'rgb(132, 143, 148)')
                        )
                        .text(that.val(node.number, ''))
                        .attr('x', function (d) {
                            return (
                                that.config.rectW -
                                that.config.rectPadding -
                                d.factorWidth
                            );
                        });
                    oD3Tile
                        .select('.tree-tile-spinner')
                        .attr('style', 'display:none;');

                    // Continue searching
                } else if (node.children != null) {
                    return that.updateTile(sId, oTileData, node.children);
                } else if (node._children != null) {
                    return that.updateTile(sId, oTileData, node._children);
                }
            });
        },

        updateDirection: function (d) {
            this.setDirection(d);
        },

        reInit: function () {
            this.i = 0;
            this.scale = 0;
        },

        renderer: function (oRm, oControl) {
            oRm.write(
                "<div width='" +
                    oControl.getWidth() +
                    "' height='" +
                    oControl.getHeight() +
                    "' align='center'"
            );
            oRm.writeControlData(oControl);
            oRm.addClass('tile-hierarchy');
            oRm.writeClasses();
            oRm.write('>');
            oRm.write('</div>');
        },

        onAfterRendering: function () {
            var that = this;

            if (this.i == 0) {
                if (this.dataOri) {
                    this.data = $.extend(true, {}, this.dataOri);
                }
            }

            if (!this.data) {
                // console.log("TileHierarchy: No Data...");&nbsp;
                return;
            }

            this.config.rectW = this.getRectW();
            this.config.rectH = this.getRectH();

            /*
		 * Declaration local variables
		 */
            var data = this.data;

            var i = this.i;
            // &nbsp;

            var topMargin = 20;
            // margin-top of tree in pixel

            var leftMargin = 20;

            var animationDuration = 500;
            // milliseconds&nbsp;

            var rectW = this.config.rectW / 1;
            // sap.suite.ui.commons.GenericTile Small Width

            var rectH = this.config.rectH / 1;
            // sap.suite.ui.commons.GenericTile Small Height

            var canvasWidth = 1000;
            // TODO: App is maybe not available in any application

            var canvasHeight = $(window).height() - 48; // 48 = height of the header bar

            var titleFont = {
                size: 14,
                name: ' Arial, Helvetica, sans-serif', // Leading space is required
                lineHeight: 18
            };

            var unitFont = {
                size: 12,
                name: ' Arial, Helvetica, sans-serif', // Leading space is required
                lineHeight: 12
            };

            var padding = this.config.rectPadding;

            var tilePadding = padding;

            var tree = d3.layout.tree().nodeSize([
                rectW * 1.1 // Virtual size (width) of each node
            ]);
            if (that.getDirection() === 'h') {
                tree = d3.layout.tree().nodeSize([
                    rectH * 1.1 // Virtual size (width) of each node
                ]);
            }

            // Set position rule for tile connections
            var diagonal = d3.svg.diagonal().projection(function (d) {
                return [d.x + rectW / 2, d.y];
            });
            if (that.getDirection() === 'h') {
                // Set position rule for tile connections
                diagonal = d3.svg.diagonal().projection(function (d) {
                    return [d.y, d.x + rectH / 2];
                });
            }

            var canvasRect = document
                .getElementById(this.getId())
                .getBoundingClientRect();
            var controlD3 = d3.select('#' + this.getId());

            // clear up SVG
            controlD3.selectAll('svg').remove();

            // Create SVG canvas
            var svg = controlD3
                .append('svg')
                .attr('width', '1000px')
                .attr('height', '800px')
                .call(
                    (zm = d3.behavior
                        .zoom()
                        .scaleExtent([0.5, 1])
                        .on('zoom', redraw))
                ) // allow zoom to max scale of 2x
                .append('g')
                .attr('transform', function () {
                    if (that.getDirection() === 'h') {
                        return (
                            'translate(' +
                            leftMargin +
                            ',' +
                            (canvasHeight / 2 - rectH / 2) +
                            ')' +
                            ' scale(' +
                            that.scale +
                            ')'
                        );
                    } else {
                        return (
                            'translate(' +
                            (canvasWidth / 2 - rectW / 2) +
                            ',' +
                            topMargin +
                            ')' +
                            ' scale(' +
                            that.scale +
                            ')'
                        );
                    }
                });
            if (that.getDirection() === 'h') {
                zm.translate([leftMargin, canvasHeight / 2 - rectH / 2]).scale(
                    that.scale
                );
            } else {
                zm.translate([canvasWidth / 2 - rectW / 2, topMargin]).scale(
                    that.scale
                );
            }

            data.x0 = 0; // &nbsp;&nbsp;
            data.y0 = canvasHeight / 2;

            // Check if browser is safari or firefox: current Safari version (08.04.2015) is not supporting SVG filters
            var supportsfilter = true;

            if (
                sap.ui.Device.browser.name ===
                    sap.ui.Device.browser.BROWSER.SAFARI || // Safari
                sap.ui.Device.browser.name ===
                    sap.ui.Device.browser.BROWSER.FIREFOX || // Firefox
                (sap.ui.Device.browser.name === undefined &&
                    navigator.standalone === true)
            ) {
                // iOS Safari on Homescreen -> Bug Fix in Component.js
                supportsfilter = false;
            }

            // Define drop shadow filter for later usage
            var filter = svg
                .append('defs')
                .append('filter')
                .attr('id', 'dropshadow');
            filter
                .append('feGaussianBlur')
                .attr('in', 'SourceAlpha')
                .attr('stdDeviation', 4)
                .attr('result', 'blur');
            filter
                .append('feComponentTransfer')
                .append('feFuncA')
                .attr('type', 'linear')
                .attr('slope', 0.1);
            var feMerge = filter.append('feMerge');
            feMerge.append('feMergeNode').attr('in', 'offsetBlur');
            feMerge.append('feMergeNode').attr('in', 'SourceGraphic'); // &nbsp;

            svg.select('defs')
                .append('marker')
                .attr('id', 'arrowend')
                .attr('refX', 9)
                .attr('refY', 3)
                .attr('markerWidth', 10)
                .attr('markerHeight', 10)
                .attr('orient', 'auto')
                .append('path')
                .attr('d', 'M0,0 L0,6 L9,3 z');

            if (this.i == 0) {
                // Start rendering root tile and first child level
                if (data.children && data.children instanceof Array) {
                    data.children.forEach(collapse);
                }
            }
            update(data);

            function update (source) {
                var nodes = tree.nodes(data).reverse();
                // &nbsp;

                var links = tree.links(nodes);

                nodes.forEach(function (d) {
                    if (that.getDirection() === 'v') {
                        d.y = d.depth * that.config.rectH * 1.5;
                    } else {
                        d.y = d.depth * that.config.rectW * 1.5;
                    }
                });

                var node = svg.selectAll('g.node').data(nodes, function (d) {
                    return d.id || (d.id = ++that.i);
                });

                // Enter any new nodes at the parent's previous position.
                var nodeEnter = node
                    .enter()
                    .append('g')
                    .attr('id', function (d) {
                        return 'TILE_' + d.id;
                    })
                    .attr('class', 'node')
                    .attr('transform', function (d) {
                        if (that.getDirection() === 'h') {
                            return (
                                'translate(' + source.y0 + ',' + source.x0 + ')'
                            );
                        } else {
                            return (
                                'translate(' + source.x0 + ',' + source.y0 + ')'
                            );
                        }
                    });
                // .on("click", click);

                //  &nbsp;&nbsp;
                // Returns path data for a rectangle with rounded corners.
                // The top-left corner is
                function roundedRect (x, y, width, height, radius) {
                    return (
                        'M' +
                        x +
                        ',' +
                        y +
                        ' h' +
                        (width - 2 * radius) +
                        ' a' +
                        radius +
                        ',' +
                        radius +
                        ' 0 0 1 ' +
                        radius +
                        ',' +
                        radius +
                        ' v' +
                        (height - 2 * radius) +
                        ' a' +
                        radius +
                        ',' +
                        radius +
                        ' 0 0 1 ' +
                        -radius +
                        ',' +
                        radius +
                        ' h' +
                        (2 * radius - width) +
                        ' a' +
                        -radius +
                        ',' +
                        -radius +
                        ' 0 0 1 ' +
                        -radius +
                        ',' +
                        -radius +
                        ' v' +
                        (2 * radius - height) +
                        ' a' +
                        radius +
                        ',' +
                        -radius +
                        ' 0 0 1 ' +
                        radius +
                        ',' +
                        -radius +
                        ' z'
                    );
                }

                nodeEnter
                    .append('path')
                    .attr('d', function (d) {
                        return roundedRect(0, 0, rectW, rectH, 4);
                    })
                    .attr('filter', function () {
                        return supportsfilter ? 'url(#dropshadow)' : null;
                    })
                    .attr(
                        'style',
                        '-webkit-svg-shadow:0px 0px 4px rgba(0,0,0,0.1);'
                    )
                    .attr('width', rectW)
                    .attr('height', rectH)
                    .attr('x', '600px') //              .attr("fill-opacity", 1)
                    .attr('fill', 'rgb(230,242,249)')
                    .style('fill', 'rgb(230,242,249)');

                // collapse / expand icon
                // a) background path
                nodeEnter.append('g').each(function (d) {
                    var oD3GNode = d3.select(this);
                    if (d.children || d._children) {
                        oD3GNode
                            .append('path')
                            .attr('d', function (d) {
                                if (that.getDirection() === 'h') {
                                    return roundedRect(
                                        rectW + 14,
                                        rectH / 2 - 8,
                                        18,
                                        18,
                                        9
                                    );
                                } else {
                                    return roundedRect(
                                        rectW / 2,
                                        rectH + 14,
                                        18,
                                        18,
                                        9
                                    );
                                }
                            })
                            .attr('filter', function () {
                                return supportsfilter
                                    ? 'url(#dropshadow)'
                                    : null;
                            })
                            .attr(
                                'style',
                                '-webkit-svg-shadow:0px 0px 4px rgba(0,0,0,0.1);'
                            )
                            .attr('fill', 'rgb(255,255,255)')
                            .style('fill', 'rgb(255,255,255)');
                    }
                });
                // b) icon
                if (that.getDirection() === 'h') {
                    nodeEnter
                        .append('text')
                        .attr('class', 'tree-expand')
                        .attr('x', rectW - 4) // padding) // rectW / 2)
                        .attr('y', rectH / 2) // 114) // rectH / 2)
                        .attr('dy', '9px')
                        .attr('dx', '9px')
                        .attr('text-anchor', 'start')
                        .style('fill', 'rgb(132, 143, 148)') // "rgb(237, 239, 239)")
                        .style('font-size', '18px')
                        .style('font-family', 'SAP-icons')
                        .text(function (d) {
                            var sIconUri = '';
                            sIconUri = Array.isArray(d._children)
                                ? '\ue1f6'
                                : sIconUri;
                            sIconUri = Array.isArray(d.children)
                                ? '\ue1f7'
                                : sIconUri;
                            return sIconUri;
                        });
                } else {
                    nodeEnter
                        .append('text')
                        .attr('class', 'tree-expand')
                        .attr('x', rectW / 2) // padding) // rectW / 2)
                        .attr('y', rectH + 40) // 114) // rectH / 2)
                        .attr('dy', '-9px')
                        .attr('dx', '-9px')
                        .attr('text-anchor', 'start')
                        .style('fill', 'rgb(132, 143, 148)') // "rgb(237, 239, 239)")
                        .style('font-size', '18px')
                        .style('font-family', 'SAP-icons')
                        .text(function (d) {
                            var sIconUri = '';
                            sIconUri = Array.isArray(d._children)
                                ? '\ue1f6'
                                : sIconUri;
                            sIconUri = Array.isArray(d.children)
                                ? '\ue1f7'
                                : sIconUri;
                            return sIconUri;
                        });
                }
                // c) transparent touch area
                nodeEnter
                    .append('path')
                    .attr('d', function (d) {
                        if (that.getDirection() === 'h') {
                            return roundedRect(
                                rectW - 4,
                                rectH / 2 - 35,
                                70,
                                70,
                                0
                            );
                        } else {
                            return roundedRect(
                                rectW / 2 - 35,
                                rectH,
                                70,
                                70,
                                0
                            );
                        }
                    })
                    .style('fill-opacity', '0')
                    .on('click', click);

                var titleNode = nodeEnter
                    .append('text')
                    .attr('x', padding)
                    .attr('y', padding + titleFont.size)
                    .attr('text-anchor', 'start')
                    .attr('dy', '0px') // &nbsp;
                    .style('font-size', titleFont.size + 'px')
                    .style('font-family', titleFont.name);

                // Tooltip
                nodeEnter.append('svg:title').text(function (d) {
                    var tooltip = that.val(d.name, '');
                    tooltip +=
                        that.val(d.subtitle, '') != ''
                            ? ' - ' + that.val(d.subtitle, '')
                            : '';
                    return tooltip;
                });

                // 1st Line
                titleNode.append('tspan').text(function (d) {
                    return that.textLine(
                        that.val(d.name, ''),
                        titleFont,
                        rectW - padding * 2,
                        1,
                        2
                    );
                });

                // 2nd Line
                titleNode
                    .append('tspan')
                    .attr('x', padding)
                    .attr('dy', titleFont.lineHeight) // &nbsp;
                    .text(function (d) {
                        var text = that.textLine(
                            that.val(d.name, ''),
                            titleFont,
                            rectW - padding * 2,
                            2,
                            2
                        );
                        d.lines = text ? 2 : 1;
                        return text;
                    });

                // Subtitle
                nodeEnter
                    .append('text')
                    .attr('x', padding)
                    .attr('y', function (d) {
                        return (
                            padding +
                            titleFont.size +
                            titleFont.lineHeight * d.lines
                        );
                    })
                    .attr('text-anchor', 'start')
                    .attr('dy', '0px') // &nbsp;
                    .style('fill', 'rgb(102, 102, 102)')
                    .style('font-size', titleFont.size + 'px')
                    .style('font-family', titleFont.name)
                    .text(function (d) {
                        return that.textOverflow(
                            that.val(d.subtitle, ''),
                            titleFont,
                            rectW - padding * 2
                        );
                    });

                function OpenInNewTab (url) {
                    window.open(
                        url,
                        '_blank',
                        'width=' +
                            screen.width +
                            ',height=' +
                            screen.height +
                            ',top=0,left=0,toolbar=yes,menubar=yes,scrollbars=yes,resizable=yes,location=yes,status=yes'
                    );
                    // win.focus();
                }

                // main content
                var tileMain = nodeEnter
                    .append('g')
                    .attr('class', 'tree-tile-main')
                    .on('click', function (d) {
                        // var parameter = $.extend(true,{oSource:this},d)
                        var parameter = {};
                        parameter.dom = this;
                        parameter.d = d;
                        that.fireChartClick(parameter);
                    });

                tileMain.each(function (d) {
                    var d3Container = d3.select(this);
                    switch (d.type) {
                        case 'number':
                            _drawNumber(d3Container, d.main);
                            break;
                        case 'pie':
                            _drawPie(d3Container, d.main);
                            break;
                        case 'bar':
                            _drawBar(d3Container, d.main);
                            break;
                        case 'chord':
                            _drawChord(d3Container, d.main);
                            break;
                        default:
                    }
                });

                function _drawNumber (d3Container, d) {
                    var postionY = 60 + (rectH - 60 - padding) / 2;
                    if (d.imageUrl) {
                        // Image
                        d3Container
                            .append('image')
                            .attr('x', 20)
                            .attr('y', postionY)
                            .attr('width', 20)
                            .attr('height', 20)
                            .attr('xlink:href', d.imageUrl)
                            .on('click', function (d) {
                                that.fireEvent('imageClick', d);
                            });
                    }

                    // Number Factor
                    d3Container
                        .append('text')
                        .attr('class', 'tree-tile-factor')
                        .attr('x', rectW - padding)
                        .attr('y', postionY)
                        .attr('text-anchor', 'end')
                        .attr('dy', '0px') // &nbsp;
                        .style(
                            'fill',
                            that.val(d.numbercolor, 'rgb(132, 143, 148)')
                        )
                        .style('font-size', '12px')
                        .text(that.val(d.factor, ''))
                        .each(function (d) {
                            d.main.factorWidth = this.getComputedTextLength();
                        });

                    // Tile Number
                    if (d.numbercolor == null || d.numbercolor == '') {
                        d.numbercolor = 'rgb(225, 123, 36)';
                    }
                    if (d.number == null || d.number == '') {
                        d.number = '35';
                    }
                    d3Container
                        .append('text')
                        .attr('class', 'tree-tile-number')
                        .attr('x', rectW - padding - d.factorWidth)
                        .attr('y', postionY)
                        .attr('text-anchor', 'end')
                        .attr('dy', '0px') // &nbsp;
                        .style(
                            'fill',
                            that.val(d.numbercolor, 'rgb(132, 143, 148)')
                        )
                        .style('font-size', '34px')
                        .text(that.val(d.number, ''));

                    // Number Unit
                    d3Container
                        .append('text')
                        .attr('class', 'tree-tile-unit')
                        .attr('x', rectW - padding)
                        .attr('y', postionY + 20)
                        .attr('text-anchor', 'end')
                        .attr('dy', '0px') // &nbsp;
                        .style('fill', 'rgb(102, 102, 102)')
                        .style('font-size', unitFont.size + 'px')
                        .text(
                            that.textOverflow(
                                that.val(d.unit, ''),
                                unitFont,
                                rectW - padding * 2
                            )
                        );

                    // Arrow Icon (if tile has childs)
                    nodeEnter
                        .append('text')
                        .attr('class', 'expand')
                        .attr('x', padding) // rectW / 2)
                        .attr('y', postionY) // rectH / 2)
                        .attr('dy', '0px') // &nbsp;
                        .attr('text-anchor', 'start')
                        .style('fill', 'rgb(237, 239, 239)')
                        .style('font-size', '24px')
                        .style('font-family', 'SAP-icons')
                        .text(
                            d._children ||
                            (d.children && d.children instanceof Array)
                                ? '\ue1f9'
                                : ''
                        );
                }

                function _drawPie (d3Container, d) {
                    var pie = d3.layout.pie();

                    var piedata = pie(d.dataset);

                    var outerRadius1 = (rectH - padding - 60) / 2;
                    var outerRadius2 = rectW / 2 - padding;

                    var outerRadius =
                        outerRadius1 > outerRadius2
                            ? outerRadius2
                            : outerRadius1;
                    var innerRadius = 0;

                    var arc = d3.svg
                        .arc()
                        .innerRadius(innerRadius)
                        .outerRadius(outerRadius);

                    var color = d3.scale.category10();

                    var arcs = d3Container
                        .selectAll('g')
                        .data(piedata)
                        .enter()
                        .append('g')
                        .attr(
                            'transform',
                            'translate(' +
                                rectW / 2 +
                                ',' +
                                (60 + outerRadius1) +
                                ')'
                        );

                    arcs.append('path')
                        .attr('fill', function (d, i) {
                            return color(i);
                        })
                        .attr('d', function (d) {
                            return arc(d);
                        });

                    arcs.append('text')
                        .attr('transform', function (d) {
                            return 'translate(' + arc.centroid(d) + ')';
                        })
                        .attr('text-anchor', 'middle')
                        .text(function (d) {
                            return d.data;
                        });
                }

                function _drawBar (d3Container, d) {
                    // 画布大小
                    var width = rectW;
                    var height = rectH - 60 - tilePadding;

                    // 在 body 里添加一个 SVG 画布
                    var svg = d3
                        .select('body')
                        .append('svg')
                        .attr('width', width)
                        .attr('height', height);

                    // 画布周边的空白
                    var padding = {
                        left: 25,
                        right: 5,
                        top: 5,
                        bottom: 8
                    };

                    // 定义一个数组
                    var dataset = d.dataset;

                    // x轴的比例尺
                    var xScale = d3.scale
                        .ordinal()
                        .domain(d3.range(dataset.length))
                        .rangeRoundBands([
                            0,
                            width - padding.left - padding.right
                        ]);

                    // y轴的比例尺
                    var yScale = d3.scale
                        .linear()
                        .domain([0, d3.max(dataset)])
                        .range([height - padding.top - padding.bottom, 0]);

                    // 定义x轴
                    var xAxis = d3.svg
                        .axis()
                        .scale(xScale)
                        .orient('bottom');

                    // 定义y轴
                    var yAxis = d3.svg
                        .axis()
                        .scale(yScale)
                        .orient('left');

                    // 矩形之间的空白
                    var rectPadding = 2;

                    d3Container
                        .attr('class', 'bar')
                        .attr('transform', 'translate(0,50)');

                    // 添加矩形元素
                    var rects = d3Container
                        .selectAll('.MyRect')
                        .data(dataset)
                        .enter()
                        .append('rect')
                        .attr('class', 'MyRect')
                        .attr(
                            'transform',
                            'translate(' +
                                padding.left +
                                ',' +
                                padding.top +
                                ')'
                        )
                        .attr('x', function (d, i) {
                            return xScale(i) + rectPadding / 2;
                        })
                        .attr('y', function (d) {
                            return yScale(d);
                        })
                        .attr('width', xScale.rangeBand() - rectPadding)
                        .attr('height', function (d) {
                            return (
                                height -
                                padding.top -
                                padding.bottom -
                                yScale(d)
                            );
                        })
                        .style('fill', function (d) {
                            return d.color ? d.color : '#4682b4';
                        });

                    // 添加文字元素
                    var texts = d3Container
                        .selectAll('.MyText')
                        .data(dataset)
                        .enter()
                        .append('text')
                        .attr('class', 'MyText')
                        .attr(
                            'transform',
                            'translate(' +
                                padding.left +
                                ',' +
                                padding.top +
                                ')'
                        )
                        .attr('x', function (d, i) {
                            return xScale(i) + rectPadding / 2;
                        })
                        .attr('y', function (d) {
                            return yScale(d);
                        })
                        .attr('dx', function () {
                            return (xScale.rangeBand() - rectPadding) / 2;
                        })
                        .attr('dy', function (d) {
                            return 10;
                        })
                        .text(function (d) {
                            return d;
                        });

                    // 添加x轴
                    d3Container
                        .append('g')
                        .attr('class', 'axis')
                        .attr(
                            'transform',
                            'translate(' +
                                padding.left +
                                ',' +
                                (height - padding.bottom) +
                                ')'
                        )
                        .call(xAxis);

                    // 添加y轴
                    d3Container
                        .append('g')
                        .attr('class', 'axis')
                        .attr(
                            'transform',
                            'translate(' +
                                padding.left +
                                ',' +
                                padding.top +
                                ')'
                        )
                        .call(yAxis);
                }

                function _drawChord (d3Container, d) {
                    // 1.定义数据
                    var series_name = d.name;

                    var dataset = d.dataset;

                    // 2.转换数据，并输出转换后的数据
                    var chord_layout = d3.layout
                        .chord()
                        .padding(0.03) // 节点之间的间隔
                        .sortSubgroups(d3.descending) // 排序
                        .matrix(dataset); // 输入矩阵

                    var groups = chord_layout.groups();
                    var chords = chord_layout.chords();

                    // 3.SVG，弦图，颜色函数的定义
                    var width = rectW - padding;
                    var height = rectH - 60 - padding;
                    var radius1 = (rectH - padding - 60) / 2;
                    var radius2 = rectW / 2 - padding;

                    var radius = radius1 > radius2 ? radius2 : radius1;
                    var innerRadius = radius * 0.7;
                    var outerRadius = innerRadius * 1.1;

                    var color20 = d3.scale.category20();

                    d3Container.attr(
                        'transform',
                        'translate(' + rectW / 2 + ',' + (60 + height / 2) + ')'
                    );

                    // 4.绘制节点（即分组，有多少个城市画多少个弧形），及绘制城市名称
                    var outer_arc = d3.svg
                        .arc()
                        .innerRadius(innerRadius)
                        .outerRadius(outerRadius);

                    var g_outer = d3Container.append('g');

                    g_outer
                        .selectAll('path')
                        .data(groups)
                        .enter()
                        .append('path')
                        .style('fill', function (d) {
                            return color20(d.index);
                        })
                        .style('stroke', function (d) {
                            return color20(d.index);
                        })
                        .attr('d', outer_arc);

                    g_outer
                        .selectAll('text')
                        .data(groups)
                        .enter()
                        .append('text')
                        .each(function (d, i) {
                            d.angle = (d.startAngle + d.endAngle) / 2;
                            d.name = series_name[i];
                        })
                        .attr('dy', '.35em')
                        .attr('transform', function (d) {
                            return (
                                'rotate(' +
                                (d.angle * 180) / Math.PI +
                                ')' +
                                'translate(0,' +
                                -1.0 * (outerRadius + 10) +
                                ')' +
                                (d.angle > (Math.PI * 3) / 4 &&
                                d.angle < (Math.PI * 5) / 4
                                    ? 'rotate(180)'
                                    : '')
                            );
                        })
                        .text(function (d) {
                            return d.name;
                        });

                    // 5.绘制内部弦
                    var inner_chord = d3.svg.chord().radius(innerRadius);

                    d3Container
                        .append('g')
                        .attr('class', 'chord')
                        .selectAll('path')
                        .data(chords)
                        .enter()
                        .append('path')
                        .attr('d', inner_chord)
                        .style('fill', function (d) {
                            return color20(d.source.index);
                        })
                        .style('opacity', 1)
                        .on('mouseover', function (d, i) {
                            d3.select(this).style('fill', 'yellow');
                        })
                        .on('mouseout', function (d, i) {
                            d3.select(this)
                                .transition()
                                .duration(1000)
                                .style('fill', color20(d.source.index));
                        });
                }

                // Transition nodes to their new position.
                var nodeUpdate = node
                    .transition()
                    .duration(animationDuration)
                    .attr('transform', function (d) {
                        if (that.getDirection() === 'h') { return 'translate(' + d.y + ',' + d.x + ')'; } else return 'translate(' + d.x + ',' + d.y + ')';
                    });

                // Transition exiting nodes to the parent's new position.
                var nodeExit = node
                    .exit()
                    .transition()
                    .duration(animationDuration)
                    .attr('transform', function (d) {
                        if (that.getDirection() === 'h') {
                            return (
                                'translate(' + source.y + ',' + source.x + ')'
                            );
                        } else {
                            return (
                                'translate(' + source.x + ',' + source.y + ')'
                            );
                        }
                    })
                    .remove();

                if (that.getType() === 'tree') {
                    // Update the links��
                    var link = svg
                        .selectAll('path.link')
                        .data(links, function (d) {
                            return d.target.id;
                        });

                    // Enter any new links at the parent's previous position.
                    link.enter()
                        .insert('path', 'g')
                        .attr('class', 'link')
                        .attr('marker-end', 'url(#arrowend)') // add by fiona
                        .attr('x', rectW / 2)
                        .attr('y', rectH / 2)
                        .attr('d', function (d) {
                            var o = {
                                x: source.x0,
                                y: source.y0
                            }; // &nbsp;
                            return diagonal({
                                source: o,
                                target: o
                            });
                        })
                        .on('click', function (d, i) {
                            that.fireEvent('lineClick', d);
                        })
                        .on('mouseover', function (d, i) {
                            d3.select(this).style('stroke', 'red');
                        })
                        .on('mouseout', function (d, i) {
                            d3.select(this)
                                .transition()
                                .duration(500)
                                .style('stroke', null);
                        });

                    // Transition links to their new position.
                    link.transition()
                        .duration(animationDuration)
                        .attr('d', diagonal);

                    // Transition exiting nodes to the parent's new position.
                    link.exit()
                        .transition()
                        .duration(animationDuration)
                        .attr('d', function (d) {
                            var o = {
                                x: source.x,
                                y: source.y
                            };
                            return diagonal({
                                source: o,
                                target: o
                            });
                        })
                        .remove();
                } else if (that.getType() === 'flowchart') {
                    // Returns path data for a rectangle with rounded corners.
                    // The top-left corner is
                    function edgeLine (direction, source, target) {
                        if (direction === 'v') {
                            var sx = source.x + rectW / 2;
                            var sy = source.y + rectH;
                            var tx = target.x + rectW / 2;
                            var ty = target.y;
                            var offset = (ty - sy) / 4;
                            var space = ' ';
                            // return "M" + sx + space + sy + space +
                            //         "L" + sx + space + (sy + rectH/6) + space +
                            //         "L" + tx + space + (sy + rectH/6) + space +
                            //         "L" + tx + space + ty + space;
                            if (offset > 0) {
                                return (
                                    'M' +
                                    sx +
                                    space +
                                    sy +
                                    space +
                                    'v' +
                                    offset +
                                    space +
                                    'h' +
                                    (tx - sx) +
                                    space +
                                    'L' +
                                    tx +
                                    space +
                                    ty +
                                    space
                                );
                            } else {
                                return (
                                    'M' +
                                    sx +
                                    space +
                                    sy +
                                    space +
                                    'v' +
                                    0 +
                                    space +
                                    'h' +
                                    (tx - sx) +
                                    space +
                                    'L' +
                                    sx +
                                    space +
                                    sy +
                                    space
                                );
                            }
                        } else if (direction === 'h') {
                            var sx = source.y + rectW;
                            var sy = source.x + rectH / 2;
                            var tx = target.y;
                            var ty = target.x + rectH / 2;
                            var space = ' ';
                            var offset = (tx - sx) / 4;
                            if (offset > 0) {
                                return (
                                    'M' +
                                    sx +
                                    space +
                                    sy +
                                    space +
                                    'h' +
                                    offset +
                                    space +
                                    'v' +
                                    (ty - sy) +
                                    space +
                                    'L' +
                                    tx +
                                    space +
                                    ty +
                                    space
                                );
                            } else {
                                return (
                                    'M' +
                                    sx +
                                    space +
                                    sy +
                                    space +
                                    'h' +
                                    0 +
                                    space +
                                    'v' +
                                    (ty - sy) +
                                    space +
                                    'L' +
                                    sx +
                                    space +
                                    sy +
                                    space
                                );
                            }
                        }
                    }

                    var link = svg
                        .selectAll('path.link')
                        .data(links, function (d) {
                            return d.target.id;
                        });
                    // Enter any new links at the parent's previous position.
                    link.enter()
                        .insert('path', 'g')
                        .attr('class', 'link')
                        .attr('d', function (d) {
                            var o = {
                                x: source.x,
                                y: source.y
                            };
                            return edgeLine(that.getDirection(), o, o);
                        })
                        .on('click', function (d, i) {
                            that.fireEvent('lineClick', d);
                        })
                        .on('mouseover', function (d, i) {
                            d3.select(this).style('stroke', 'red');
                        })
                        .on('mouseout', function (d, i) {
                            d3.select(this)
                                .transition()
                                .duration(500)
                                .style('stroke', null);
                        });
                    // Transition links to their new position.
                    link.transition()
                        .duration(animationDuration)
                        .attr('d', function (d) {
                            return edgeLine(
                                that.getDirection(),
                                d.source,
                                d.target
                            );
                        })
                        .each('end', function () {
                            d3.select(this).attr(
                                'marker-end',
                                'url(#arrowend)'
                            );
                        });
                    // Transition exiting nodes to the parent's new position.
                    link.exit()
                        .transition()
                        .duration(animationDuration)
                        .attr('d', function (d) {
                            var o = {
                                x: source.x,
                                y: source.y
                            };
                            return edgeLine(that.getDirection(), o, o);
                        })
                        .remove();
                }

                // Stash the old positions for transition.
                nodes.forEach(function (d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });
            }

            // Collapse Tiles recursively
            function collapse (d) {
                if (d.children && d.children instanceof Array) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            // Toggle children on click.
            function click (d) {
                if (d.children && d.children instanceof Array) {
                    d._children = d.children;
                    d.children = null;
                } else {
                    d.children = d._children;
                    d._children = null;
                }
                var sId = 'TILE_' + d.id;
                var oD3Tile = d3.select('#' + sId).select('.tree-expand');
                oD3Tile.text(function () {
                    var sIconUri = '';
                    sIconUri = Array.isArray(d._children) ? '\ue1f6' : sIconUri;
                    sIconUri = Array.isArray(d.children) ? '\ue1f7' : sIconUri;
                    return sIconUri;
                });
                update(d);
            }

            // Redraw for zoom
            function redraw () {
                // console.log("here", d3.event.translate, d3.event.scale);
                svg.attr(
                    'transform',
                    'translate(' +
                        d3.event.translate +
                        ')' +
                        ' scale(' +
                        d3.event.scale +
                        ')'
                );
                that.scale = d3.event.scale;
            }

            // Very important: register to event, so that canvas is getting resized when viewport changes
            var self = this;
            $(window).resize(function () {
                self.calculateSize();
            });
            $(document).on(
                'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange',
                function () {
                    self.calculateSize();
                }
            );

            // Support spinning animation for IE (cause SMIL is not supported in IE)
            if (
                sap.ui.Device.browser.name ===
                sap.ui.Device.browser.BROWSER.INTERNET_EXPLORER
            ) {
                var spinner = $('#spinner path');
                var deg = 0;
                clearInterval(this.interval);
                this.interval = window.setInterval(function () {
                    spinner.attr('transform', 'rotate(' + deg + ' 50 50)');
                    deg = deg + (18 % 360);
                }, 50); // all 50ms 18deg = one spin in one sec.
            }
        },

        // HELPER FUNCTION 1: Return default value if initial
        val: function (value, defaultValue) {
            return value && value !== 'null' ? value : defaultValue;
        },

        // HELPER FUNCTION 2: Return text (with/without ellipsis) dependent on available length in pixel
        c: null, // &nbsp;
        ctx: null,
        textOverflow: function (text, font, lengthInPixel, ellipsisString) {
            if (!this.c) {
                // Create a dummy canvas (render invisible with css)
                this.c = document.createElement('canvas'); // &nbsp;
                // Get the context of the dummy canvas
                this.ctx = c.getContext('2d'); // &nbsp;
            }
            // Set the context.font to the font that you are using
            this.ctx.font = font.size + 'px' + font.name;

            var length = this.ctx.measureText(text); // Measure the string&nbsp;
            var avgCharSpace = length.width / text.length;
            ellipsisString = ellipsisString || '...';

            if (length.width > lengthInPixel) {
                var ellipsisLength = this.ctx.measureText(ellipsisString);
                var nbCharsToRemove = Math.round(
                    (length.width - lengthInPixel + ellipsisLength.width) /
                        avgCharSpace
                );

                text =
                    text.substr(0, text.length - 1 - nbCharsToRemove) +
                    ellipsisString;
            }

            return text;
        },

        // HELPER FUNCTION 3: Get remaining (deleted) characters
        getRemainingOverflow: function (
            text,
            font,
            lengthInPixel,
            ellipsisString
        ) {
            if (!this.c) {
                // Create a dummy canvas (render invisible with css)
                this.c = document.createElement('canvas'); // &nbsp;
                // Get the context of the dummy canvas
                this.ctx = c.getContext('2d'); // &nbsp;
            }
            // Set the context.font to the font that you are using
            this.ctx.font = font.size + 'px' + font.name;

            var length = this.ctx.measureText(text); // Measure the string&nbsp;
            var avgCharSpace = length.width / text.length;
            ellipsisString = ellipsisString || '...';

            if (length.width > lengthInPixel) {
                var ellipsisLength = this.ctx.measureText(ellipsisString);
                var nbCharsToRemove = Math.round(
                    (length.width - lengthInPixel + ellipsisLength.width) /
                        avgCharSpace
                );

                text = text.substr(
                    text.length - 1 - nbCharsToRemove,
                    text.length - 1
                );
            }

            return text;
        },

        // HELPER FUNCTION 4: Get line of multi line text dependent on available length in pixel
        textLine: function (text, font, lengthInPixel, line, maxLines) {
            if (!this.c) {
                // Create a dummy canvas (render invisible with css)
                this.c = document.createElement('canvas'); // &nbsp;
                // Get the context of the dummy canvas
                this.ctx = this.c.getContext('2d'); // &nbsp;
            }
            // Set the context.font to the font that you are using
            this.ctx.font = font.size + 'px' + font.name;

            var length;
            var tokenLength;
            var tokens = text.split(' ');
            var lineIndex = 1;
            var nextLine = '';
            var currentLine = '';

            for (var i = 0; i < tokens.length; i++) {
                // Add word to line
                if (i > 0) currentLine += ' ';
                currentLine += tokens[i];

                // Measure current length
                length = this.ctx.measureText(currentLine);

                // Check if line is exceeding max length
                if (length.width >= lengthInPixel) {
                    // Check if current line is last line of multi-line block
                    if (lineIndex === maxLines) {
                        // Add ellipsis to line
                        currentLine = this.textOverflow(
                            currentLine,
                            font,
                            lengthInPixel
                        );
                    } else {
                        // We now should either add the word to next line or if current word is too long: split the word

                        // Measure length of current word
                        tokenLength = this.ctx.measureText(tokens[i]);

                        if (tokenLength.width >= lengthInPixel) {
                            nextLine = this.getRemainingOverflow(
                                currentLine,
                                font,
                                lengthInPixel,
                                '-'
                            ); // &nbsp;
                            currentLine = this.textOverflow(
                                currentLine,
                                font,
                                lengthInPixel,
                                '-'
                            );
                        } else {
                            // Remove last token because it was exceeding the max length
                            nextLine = tokens[i];
                            currentLine = currentLine.substr(
                                0,
                                currentLine.length - tokens[i].length - 1
                            );
                        }
                    }

                    // Check if current line is output line
                    if (lineIndex === line) {
                        return currentLine;
                    } else {
                        // start next line with current word
                        currentLine = nextLine;
                        lineIndex++;
                    }
                } else {
                    // Continue with adding next word to current line
                    continue;
                }
            } // END LOOP AT TOKENS (words)

            if (lineIndex === line) {
                return this.textOverflow(currentLine, font, lengthInPixel);
            } else {
                return null;
            }
        },

        // Resize control, when window was resized
        calculateSize: function () {
            // Height is calculated differently if compact mode is active
            var iHeightDelta = 0;
            // fiona
            //    if(sap.ui.getCore().byId("agsKpiTreeShell").hasStyleClass("sapUiSizeCompact") === true) {
            //      iHeightDelta = 5;
            //        }

            // TODO: App is maybe not available in any application
            //    var bounds = document.getElementById("app").getBoundingClientRect();
            //    var svgCanvas = $("#"+this.getId()+">svg");
            //    svgCanvas.attr("width", bounds.width);
            //    svgCanvas.attr("height", bounds.height + iHeightDelta);
        },

        /**
         * Support lower case as well as upper case properties
         *&nbsp;
         * @memberOf ags_kpi_tree.main
         */
        _mapAttributes: function (json) {
            var that = this;

            // MAP NAME
            if (!json.name) {
                json.name = json.NAME ? json.NAME : null;
                delete json.NAME;
            } else if (json.name === 'null') {
                json.name = null;
            }

            // MAP SUBTITLE
            if (!json.subtitle) {
                json.subtitle = json.SUBTITLE ? json.SUBTITLE : null;
                delete json.SUBTITLE;
            } else if (json.subtitle === 'null') {
                json.subtitle = null;
            }

            // MAP URL
            if (!json.url) {
                json.url = json.URL ? json.URL : null;
                delete json.URL;
            } else if (json.url === 'null') {
                json.url = null;
            }

            // MAP Click
            if (!json.click) {
                json.click = json.Click ? json.Click : null;
                delete json.Click;
            } else if (json.click === 'null') {
                json.click = null;
            }

            if (json.type && json.type == 'number') {
                // MAP NUMBER
                if (!json.main.number) {
                    json.main.number = json.main.NUMBER
                        ? json.main.NUMBER
                        : null;
                    delete json.main.NUMBER;
                } else if (json.main.number === 'null') {
                    json.main.number = null;
                }

                // MAP FACTOR
                if (!json.main.factor) {
                    json.main.factor = json.main.FACTOR
                        ? json.main.FACTOR
                        : null;
                    delete json.main.FACTOR;
                } else if (json.main.factor === 'null') {
                    json.main.factor = null;
                }

                // MAP UNIT
                if (!json.main.unit) {
                    json.main.unit = json.main.UNIT ? json.main.UNIT : null;
                    delete json.main.UNIT;
                } else if (json.main.unit === 'null') {
                    json.main.unit = null;
                }

                // MAP NUMBERCOLOUR
                if (!json.main.numbercolor) {
                    if (json.main.numberColor) {
                        json.main.numbercolor =
                            json.main.numberColor &&
                            json.main.numberColor !== 'null'
                                ? json.main.numberColor
                                : null;
                        delete json.main.numberColor;
                    } else {
                        json.main.numbercolor = json.main.NUMBERCOLOUR
                            ? json.main.NUMBERCOLOUR
                            : null;
                        delete json.main.NUMBERCOLOUR;
                    }
                } else if (json.main.numbercolor === 'null') {
                    json.main.numbercolor = null;
                }
            }

            // MAP CHILDREN NODE
            if (!json.children || !(json.children instanceof Array)) {
                json.children =
                    json.CHILDREN && json.CHILDREN instanceof Array
                        ? json.CHILDREN
                        : null;
                delete json.CHILDREN;
            }

            // MAP CHILDRENS RECURSIVELY
            if (json.children) {
                json.children.forEach(function (element, index, array) {
                    json.children[index] = that._mapAttributes(element);
                });
            }

            return json;
        }
    }
);
