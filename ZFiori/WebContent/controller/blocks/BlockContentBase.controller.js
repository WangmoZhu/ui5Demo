sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
    'use strict';
    return Controller.extend(
        'sap.vo.mengniu.controller.blocks.BlockContentBase',
        {
            _blockContainer: undefined,
            setBlockContainer: function (blockContainer) {
                this._blockContainer = blockContainer;
            },
            setViewIndex: function (index) {
                if (this._blockContainer) {
                    this._blockContainer.setViewIndex(index);
                }
            },
            getRouter: function () {
                var component = sap.ui.getCore().getComponent('__component0');
                return component.getRouter();
            },
            getDate: function (oDate) {
                var formatDate = function (oDateObject) {
                    if (
                        typeof oDateObject === 'object' &&
                        oDateObject.getFullYear
                    ) {
                        var month = oDateObject.getMonth() + 1;
                        var day = oDateObject.getDate();
                        return (
                            String(oDateObject.getFullYear()) +
                            String(month < 10 ? '0' + month : month) +
                            String(day < 10 ? '0' + day : day)
                        );
                    }
                };
                if (typeof oDate === 'string') {
                    var oNow = new Date();

                    if (oDate === 'FDOCY') {
                        var oFDOCY = new Date(oNow.getFullYear(), 0, 1);
                        return formatDate(oFDOCY);
                    }
                    if (
                        oDate === 'FDOCM' ||
                        oDate === 'LDOLM' ||
                        oDate === 'FDOLM'
                    ) {
                        var oFDOCM = new Date(
                            oNow.getFullYear(),
                            oNow.getMonth(),
                            1
                        );
                        if (oDate === 'FDOCM') {
                            return formatDate(oFDOCM);
                        }
                        var oLDOLM = new Date(
                            oFDOCM.valueOf() - 24 * 60 * 60 * 1000
                        );
                        if (oDate === 'LDOLM') {
                            return formatDate(oLDOLM);
                        }
                        var oFDOLM = new Date(
                            oLDOLM.getFullYear(),
                            oLDOLM.getMonth(),
                            1
                        );
                        if (oDate === 'FDOLM') {
                            return formatDate(oFDOLM);
                        }
                    }
                    if (oDate === 'FDOLW' || oDate === 'LDOLW') {
                        var oLDOLW = new Date(
                            oNow.valueOf() - oNow.getDay() * 24 * 60 * 60 * 1000
                        );
                        if (oDate === 'LDOLW') {
                            return formatDate(oLDOLW);
                        }
                        var oFDOLW = new Date(
                            oLDOLW.valueOf() - 6 * 24 * 60 * 60 * 1000
                        );
                        if (oDate === 'FDOLW') {
                            return formatDate(oFDOLW);
                        }
                    }
                } else if (typeof oDate === 'object' && oDate.getFullYear) {
                    return formatDate(oDate);
                } else if (typeof oDate === 'number') {
                    var oCalDate = new Date();
                    oCalDate = new Date(
                        oCalDate.valueOf() -
                            parseInt(oDate) * 24 * 60 * 60 * 1000
                    );
                    return formatDate(oCalDate);
                } else {
                    return formatDate(new Date());
                }
            },
            getMonthDate: function (sValue) {
                if (sValue.length !== 8) {
                    return sValue;
                } else {
                    var iType = sap.ui
                        .getCore()
                        .getModel('User')
                        .getProperty('/Datfm');
                    switch (iType) {
                        case '1':
                            return (
                                sValue.substr(4, 2) + '.' + sValue.substr(0, 4)
                            );
                        case '2':
                            return (
                                sValue.substr(4, 2) +
                                '%2F' +
                                sValue.substr(0, 4)
                            );
                        case '3':
                            return (
                                sValue.substr(4, 2) + '-' + sValue.substr(0, 4)
                            );
                        case '4':
                            return (
                                sValue.substr(0, 4) + '.' + sValue.substr(4, 2)
                            );
                        case '5':
                            return (
                                sValue.substr(0, 4) +
                                '%2F' +
                                sValue.substr(4, 2)
                            );
                        case '6':
                            return (
                                sValue.substr(0, 4) + '-' + sValue.substr(4, 2)
                            );
                        default:
                            return sValue;
                    }
                }
            },
            s2ab: function (s) {
                // 字符串转字符流
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) { view[i] = s.charCodeAt(i) & 0xff; }
                return buf;
            },
            // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
            getCharCol: function (n) {
                let temCol = '';

                let s = '';

                let m = 0;
                while (n > 0) {
                    m = (n % 26) + 1;
                    s = String.fromCharCode(m + 64) + s;
                    n = (n - m) / 26;
                }
                return s;
            },
            onDownloadExcel: function (oTable, ModelInfo) {
                var that = this;
                var oView = this.getView();

                if (ModelInfo) {
                    that.ODataModel.read(ModelInfo.path, {
                        urlParameters: ModelInfo.urlParameters,
                        filters: [ModelInfo.filters],
                        success: function (oData) {
                            var sData = oData.results;
                            var tmpDown, type;
                            var keyMap = []; // 获取键
                            for (var k in sData[0]) {
                                if (
                                    k !== '__metadata' &&
                                    k.slice(-2) !== '_F'
                                ) {
                                    keyMap.push(k);
                                }
                            }
                            var HeadStr = '{';
                            for (var ii = 0; ii < keyMap.length; ii++) {
                                if (ii === keyMap.length - 1) {
                                    HeadStr +=
                                        '"' +
                                        keyMap[ii] +
                                        '"' +
                                        ':' +
                                        '"' +
                                        oTable.getColumns()[ii].mAggregations
                                            .label.mProperties.text +
                                        '"' +
                                        '}';
                                } else {
                                    HeadStr +=
                                        '"' +
                                        keyMap[ii] +
                                        '"' +
                                        ':' +
                                        '"' +
                                        oTable.getColumns()[ii].mAggregations
                                            .label.mProperties.text +
                                        '"' +
                                        ',';
                                }
                            }

                            var HeadObj = JSON.parse(HeadStr);

                            sData.unshift(HeadObj);
                            var _extends =
                                Object.assign ||
                                function (target) {
                                    for (var i = 1; i < arguments.length; i++) {
                                        var source = arguments[i];
                                        for (var key in source) {
                                            if (
                                                Object.prototype.hasOwnProperty.call(
                                                    source,
                                                    key
                                                )
                                            ) {
                                                target[key] = source[key];
                                            }
                                        }
                                    }
                                    return target;
                                };
                            var tmpdata = []; // 用来保存转换好的json
                            sData
                                .map(function (v, i) {
                                    return keyMap.map(function (k, j) {
                                        return _extends(
                                            {},
                                            {
                                                v: v[k],
                                                position:
                                                    (j > 25
                                                        ? that.getCharCol(j)
                                                        : String.fromCharCode(
                                                            65 + j
                                                        )) +
                                                    (i + 1)
                                            }
                                        );
                                    });
                                })
                                .reduce(function (prev, next) {
                                    return prev.concat(next);
                                })
                                .forEach(function (v, i) {
                                    return (tmpdata[v.position] = {
                                        v: v.v
                                    });
                                });
                            var outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
                            var tmpWB = {
                                SheetNames: ['Sheet1'], // 保存的表标题
                                Sheets: {
                                    Sheet1: _extends(
                                        {},
                                        tmpdata, // 内容
                                        {
                                            '!ref':
                                                outputPos[0] +
                                                ':' +
                                                outputPos[outputPos.length - 1] // 设置填充区域
                                        }
                                    )
                                }
                            };
                            tmpDown = new Blob(
                                [
                                    that.s2ab(
                                        XLSX.write(
                                            tmpWB,
                                            {
                                                bookType:
                                                    type == undefined
                                                        ? 'xlsx'
                                                        : type,
                                                bookSST: false,
                                                type: 'binary'
                                            } // 这里的数据是用来定义导出的格式类型
                                        )
                                    )
                                ],
                                {
                                    type: ''
                                }
                            ); // 创建二进制对象写入转换好的字节流

                            saveAs(tmpDown, '样本数据.xlsx');
                        }
                    });
                } else {
                    var oTableData = oTable.mBindingInfos.rows.binding.oList;
                    var sData = [];
                    for (var i = 0; i < oTableData.length; i++) {
                        var oEntry = oTableData[i];
                        sData.push(oEntry);
                    }
                    // var sData = oTable.mBindingInfos.rows.binding.oList;
                    var aFilters = oTable.getBinding().aFilters;
                    for (var k = 0; k < aFilters.length; k++) {
                        for (var i = 0; i < sData.length;) {
                            if (
                                sData[i][aFilters[k].sPath] == undefined ||
                                sData[i][aFilters[k].sPath].indexOf(
                                    aFilters[k].oValue1
                                ) == -1
                            ) {
                                sData.splice(i, 1);
                            } else {
                                i++;
                            }
                        }
                    }

                    var tmpDown, type;
                    var keyMap = []; // 获取键
                    for (var k in sData[0]) {
                        if (k !== '__metadata') {
                            keyMap.push(k);
                        }
                    }
                    var HeadStr = '{';
                    for (var ii = 0; ii < keyMap.length; ii++) {
                        if (ii === keyMap.length - 1) {
                            HeadStr +=
                                '"' +
                                keyMap[ii] +
                                '"' +
                                ':' +
                                '"' +
                                keyMap[ii] +
                                '"' +
                                '}';
                        } else {
                            HeadStr +=
                                '"' +
                                keyMap[ii] +
                                '"' +
                                ':' +
                                '"' +
                                keyMap[ii] +
                                '"' +
                                ',';
                        }
                    }

                    var HeadObj = JSON.parse(HeadStr);

                    sData.unshift(HeadObj);
                    var _extends =
                        Object.assign ||
                        function (target) {
                            for (var i = 1; i < arguments.length; i++) {
                                var source = arguments[i];
                                for (var key in source) {
                                    if (
                                        Object.prototype.hasOwnProperty.call(
                                            source,
                                            key
                                        )
                                    ) {
                                        target[key] = source[key];
                                    }
                                }
                            }
                            return target;
                        };
                    var tmpdata = []; // 用来保存转换好的json
                    sData
                        .map(function (v, i) {
                            return keyMap.map(function (k, j) {
                                return _extends(
                                    {},
                                    {
                                        v: v[k],
                                        position:
                                            (j > 25
                                                ? that.getCharCol(j)
                                                : String.fromCharCode(65 + j)) +
                                            (i + 1)
                                    }
                                );
                            });
                        })
                        .reduce(function (prev, next) {
                            return prev.concat(next);
                        })
                        .forEach(function (v, i) {
                            return (tmpdata[v.position] = {
                                v: v.v
                            });
                        });
                    var outputPos = Object.keys(tmpdata); // 设置区域,比如表格从A1到D10
                    var tmpWB = {
                        SheetNames: ['Sheet1'], // 保存的表标题
                        Sheets: {
                            Sheet1: _extends(
                                {},
                                tmpdata, // 内容
                                {
                                    '!ref':
                                        outputPos[0] +
                                        ':' +
                                        outputPos[outputPos.length - 1] // 设置填充区域
                                }
                            )
                        }
                    };
                    tmpDown = new Blob(
                        [
                            that.s2ab(
                                XLSX.write(
                                    tmpWB,
                                    {
                                        bookType:
                                            type == undefined ? 'xlsx' : type,
                                        bookSST: false,
                                        type: 'binary'
                                    } // 这里的数据是用来定义导出的格式类型
                                )
                            )
                        ],
                        {
                            type: ''
                        }
                    ); // 创建二进制对象写入转换好的字节流

                    saveAs(tmpDown, '样本数据.xlsx');
                }
            }
        }
    );
});
