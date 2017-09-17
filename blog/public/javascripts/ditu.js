$(function () {
    var openedArea = null;
    var count = 0;
    var layers;
    var pointName = null;
    var pointID = null;
    var pointObject = null;
    var changePoint = null;
    var maplayers = new Array();
    var map = initMap();

    //点图标样式
    var iIcon = L.icon({
        iconUrl: '/images/marker-icon1.png',
        iconSize: [10.5, 18],
        iconAnchor: [12, 26],
        popupAnchor: [0, -28]
    });
    var iIcon1 = L.icon({
        iconUrl: '/images/icon1.png',
        iconSize: [10.5, 18],
        iconAnchor: [12, 26],
        popupAnchor: [0, -28]
    });
    //区域样式设定
    function boundstyle(feature) {
        return {
            fillColor: '#007EA7',
            weight: 2,
            opacity: 0.5,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.3
        }
    }

    //边界样式设定
    function irrstyle(feature) {
        return {
            fillColor: '#EE4000',
            weight: 3,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.5
        }
    }

    $('.nav-header').bind("click", function () {
        var currentArea = $(this);
        if (count == 0) {
            layers = initNavcontent();
            count = 1;
        }
        setXY(map);

        if (openedArea !== null) {
         //
        } else {
            openedArea = currentArea;
            $('.main-left-introduction').find('#selected-name')
                .after('<mark class="area-name">' + currentArea.find('span').text() + '</mark>');
        }
    });

    $('.map-item').bind("click", function (event) {
        var selectedStatus;
        var selectedMap;
        var mapName;

        selectedStatus = $(this).find('input[type=checkbox]');
        selectedMap = $(this).find('label');
        if (selectedStatus.is(':checked') == false) {
            if (event.target.tagName == 'INPUT') {
                event.preventDefault();
                return;
            }
            selectedStatus.prop("checked", true);
            mapName = selectedMap.find('a').text();
            // initNavcontent();
            addLayers(layers, mapName, map, maplayers);
        } else {
            if (event.target.tagName == 'INPUT') {
                event.preventDefault();
                return;
            }
            selectedStatus.prop("checked", false);
            mapName = selectedMap.find('a').text();

            map.removeLayer(layers[mapName]);
        }
    });

    function initNavcontent() {
        var data = $.ajax({
            type: 'get',
            async: false,
            url: '/readareaData',
            dataType: 'json',
            success: function (areaDatas) {
                // console.log("yes");
            }
        });
        data = stringToObject(data.responseText);
        var layers = {
            border: initGeoJsonLayer('border', data[0].border),
            region: initGeoJsonLayer('region', data[0].region),
            point: initGeoJsonLayer('point', data[0].point),
        };
        return layers;
    }

    function initGeoJsonLayer(name, data) {
        if (name == 'region') {
            var layer = L.geoJson(data, {
                style: boundstyle
            });
            return layer;
        }
        if (name == 'border') {
            var layer = L.geoJson(data, {
                style: irrstyle
            });
            return layer;
        }
        if (name == 'point') {
            var layer = L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                    return L.marker(latlng, {
                        icon: iIcon
                    });
                }
            });
            layer.on('click', function(e) {
                if (changePoint!=null) {
                    changePoint.setIcon(iIcon);
                }
                changePoint = e.layer;
                e.layer.setIcon(iIcon1);
      
                ShowDiv('dataPanel');
                showpPanel(e);
                showechart(e);
                showechart1(e);
            });
            layer.on('mouseover',function(e){
                pointObject = e.layer;
                displayPoint(e);
                e.layer.bindPopup(pointID+"---"+pointName);
                e.layer.openPopup();
                pointName = null;
                pointID = null;
            });
            layer.on('mouseout',function(e){
                pointObject.closePopup();
            });
            return layer;
        }
    }

        //点击其他部分div消失
            $('#map').bind('click', function() {
                $('#dataPanel').css('display', 'none');
                if(pointObject!=null){
                    pointObject.setIcon(iIcon); 
                }
            });
            //阻止点击事件冒泡到父元素
            $('#dataPanel').bind('click', function(e) {
                stopPropagation(e);
            });
            // $('#mytest').bind('click',function (e) {
            //     stopPropagation(e);
            //     alert("为啥还在动");
            // });
            // $('#mytest').click(function (event) {
            //     event.preventDefault();
            // });
            // $('#mytest').live('click', function(event) {
            //     event.preventDefault();
            // });
            $('#tystest').mousedown(function () {
                // rDrag.init(document.getElementById('dataPanel'));
                $("#dataPanel").draggable();
                $("#dataPanel").draggable("enable");
            });
            $('#tystest').mouseup(function () {
                $("#dataPanel").draggable("disable");
            });
            function stopPropagation(e) {
                if (e.stopPropagation)
                    e.stopPropagation();
                else
                    e.cancelBubble = true;
            }
        $('#Close').bind('click',function () {
            $('#dataPanel').css('display', 'none');
            if(pointObject!=null){
                pointObject.setIcon(iIcon);
            }
        });
        function ShowDiv(obj){
            document.getElementById(obj).style.display = 'block';
        }

        function myArraysun(dataTemp){
                var yearData = new Array();
                var sum = 0;
                for (var i = 0; i < dataTemp.length; i++) {
                    if (i % 12 == 11) {
                    sum += dataTemp[i];
                    yearData.push((sum / 12).toFixed(3));
                    //alert(sum/12);
                    sum = 0;
                    } else {
                        sum += dataTemp[i];
                    }
                }
                return yearData;
            }

        function myArray(dataTemp){
                var yearDataT = new Array();
                var sum = 0;
                for (var i = dataTemp.length-1; i >=0; i--) {
                if (i % 12 == 0) {
                    sum += dataTemp[i];
                    yearDataT.push((sum / 12).toFixed(3));
                    //alert(sum/12);
                    sum = 0;
                    } else {
                        sum += dataTemp[i];
                    }
                }
                return yearDataT;
            }

        function showechart1(event){
            var myChart5 = echarts.init(document.getElementById('echartPanel5'));
            var myChart6 = echarts.init(document.getElementById('echartPanel6'));
            var myChart7 = echarts.init(document.getElementById('echartPanel7'));
            var myChart8 = echarts.init(document.getElementById('echartPanel8'));
            var myChart9 = echarts.init(document.getElementById('echartPanel9'));
            var myChart10 = echarts.init(document.getElementById('echartPanel10'));
            var myChart11 = echarts.init(document.getElementById('echartPanel11'));
            var myChart12 = echarts.init(document.getElementById('echartPanel12'));
            // myChart5.showLoading();
            var tempss = {};
            var data;
            tempss.lat = event.latlng.lat;
            tempss.lng = event.latlng.lng;
            $.ajax({
                type: 'post',
                async: false,
                url: '/readchemical',
                contentType: 'application/json;charest = utf-8',
                data: JSON.stringify(tempss),
                dataType: 'json',
                 success: function(newss) {
                   data = newss.chemicalelements;
                },
                error: function(newss) {
                    console.log(err);
                }
            });
            // myChart5.hideLoading();
            var option12 = {
                        title: {
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter: function (params) {
                                var tar = params[1];
                                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                            }
                        },
                        legend: {
                            data:['pH','碱度']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        xAxis : [
                            {
                                type : 'category',
                                splitLine: {show:false},
                                data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name:'pH值'
                            },
                            {
                                type : 'value',
                                name : '碱度(mmol/L)',
                            }
                        ],
                        series : [
                            {
                                name:'辅助',
                                type:'bar',
                                barWidth : 22,
                                stack: '总量',
                                itemStyle:{
                                    normal:{
                                        barBorderColor:'rgba(0,0,0,0)',
                                        color:'rgba(0,0,0,0)'
                                    },
                                    emphasis:{
                                        barBorderColor:'rgba(0,0,0,0)',
                                        color:'rgba(0,0,0,0)'
                                    }
                                },
                                data:[0, 1.5, 3.2, 2, 3.8, 5.7, 7, 9, 10.5, 10.5, 9,7.5,5,7.5,10.5,13.5]
                            },
                            {
                                name:'pH',
                                type:'bar',
                                barWidth : 22,
                                stack: '总量',
                                itemStyle : { normal: {label : {show: true, position: 'top'}}},
                                data:myArraysun(data.pH)
                            },
                            {
                                name:'碱度',
                                type:'line',
                                yAxisIndex: 1,
                                data:myArraysun(data.alkalinity)
                            },
                        ]
            };
            var option11 = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                    },
                    legend: {
                        data:['磷酸根','溶解性总磷']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name:'(mg/L)'
                        }
                    ],
                    series : [
                        {
                            name:'磷酸根',
                            type:'bar',
                            data:myArraysun(data.PhosphateRadical),
                           markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:'溶解性总磷',
                            type:'bar',
                            data:myArraysun(data.dtp),
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                data : [
                                    {type : 'average', name : '平均值'}
                                ]
                            }
                        }
                    ]
            };
            var option10 = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:['钠离子','钙离子','氯离子','硫酸根离子','硅酸盐']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                splitLine: {show:false},
                                data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name:'(mg/L)'
                            }
                        ],
                        series : [
                            {
                                name:'钠离子',
                                type:'line',
                                data:myArraysun(data.Na)
                            },
                            {
                                name:'钙离子',
                                type:'line',
                                data:myArraysun(data.Ca)
                            },
                            {
                                name:'氯离子',
                                type:'line',
                                data:myArraysun(data.Cl)
                            },
                            {
                                name:'硫酸根离子',
                                type:'line',
                                data:myArraysun(data.SO4)
                            },
                            {
                                name:'硅酸盐',
                                type:'line',
                                data:myArraysun(data.SiO4)
                            },
                        ]
            };
            var colors = ['#5793f3', '#d14a61', '#675bba'];
            var option9 = {
                color: colors,
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    right: '20%'
                },
                toolbox: {
                    feature: {
                        dataView: {show: true, readOnly: false},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                legend: {
                    data:['硝态氮','亚硝态氮','总磷']
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data:  ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '硝态氮',
                        position: 'right',
                        axisLine: {
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}mg/L'
                        }
                    },
                    {
                        type: 'value',
                        name: '亚硝态氮',
                        position: 'right',
                        offset: 80,
                        axisLine: {
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}mg/L'
                        }
                    },
                    {
                        type: 'value',
                        name: '总磷',
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: colors[2]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}mg/L'
                        }
                    }
                ],
                series: [
                    {
                        name:'亚硝态氮',
                        type:'bar',
                        data:myArraysun(data.NitriteNitrogen)
                    },
                    {
                        name:'硝态氮',
                        type:'bar',
                        yAxisIndex: 1,
                        data:myArraysun(data.nitricNitrogen)
                    },
                    {
                        name:'总磷',
                        type:'line',
                        yAxisIndex: 2,
                        data:myArraysun(data.totalPhosphorus)
                    }
                ]
            };
            var option8 = {
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data:['氟离子(mg/L)','钾离子(mg/L)']
                            },
                            toolbox: {
                                show : true,
                                feature : {
                                    dataView : {show: true, readOnly: false},
                                    restore : {show: true},
                                    saveAsImage : {show: true}
                                }
                            },
                            calculable : true,
                            xAxis : [
                                {
                                    type : 'category',
                                    boundaryGap : false,
                                    data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    name:'(mg/L)'
                                }
                            ],
                            series : [
                                {
                                    name:'氟离子(mg/L)',
                                    type:'line',
                                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                    data:myArraysun(data.F)
                                },
                                {
                                    name:'钾离子(mg/L)',
                                    type:'line',
                                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                    data:myArraysun(data.K)
                                }
                            ]
            };
            var option7 = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:['氨氮(mg/L)','CODMn(mg/L)','溶解氧(mg/L)','BOD5(mg/L)']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                splitLine: {show:false},
                                data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name:'mg/L'
                            }
                        ],
                        series : [
                            {
                                name:'氨氮(mg/L)',
                                type:'line',
                                data:myArraysun(data.ammoniaNitrogen)
                            },
                            {
                                name:'CODMn(mg/L)',
                                type:'line',
                                data:myArraysun(data.CODMn)
                            },
                            {
                                name:'溶解氧(mg/L)',
                                type:'line',
                                data:myArraysun(data.dissolvedOxygen)
                            },
                            {
                                name:'BOD5(mg/L)',
                                type:'line',
                                data:myArraysun(data.BOD5)
                            },
                        ]
            };
            var option6 = {
                        title: {
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            },
                            formatter: function (params) {
                                var tar = params[1];
                                return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
                            }
                        },
                        legend: {
                            data:['总氮(mg/L)']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        xAxis : [
                            {
                                type : 'category',
                                splitLine: {show:false},
                                data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name:'总氮(mg/L)'
                            }
                        ],
                        series : [
                            {
                                name:'辅助',
                                type:'bar',
                                barWidth : 22,
                                stack: '总量',
                                itemStyle:{
                                    normal:{
                                        barBorderColor:'rgba(0,0,0,0)',
                                        color:'rgba(0,0,0,0)'
                                    },
                                    emphasis:{
                                        barBorderColor:'rgba(0,0,0,0)',
                                        color:'rgba(0,0,0,0)'
                                    }
                                },
                                data:[0, 1.5, 3.2, 2, 3.8, 5.7, 7, 9, 10.5, 10.5, 9,7.5,5,7.5,10.5,13.5]
                            },
                            {
                                name:'总氮(mg/L)',
                                type:'bar',
                                barWidth : 22,
                                stack: '总量',
                                itemStyle : { normal: {label : {show: true, position: 'top'}}},
                                data:myArraysun(data.totalNitrogen)
                            },
                        ]
            };
            var option5 = {
                         title: {
                                 text: '水体化学要素',
                                 textStyle:{fontWeight: 'bolder',color: '#000000'}
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:['叶绿素a','脱镁叶绿素']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                splitLine: {show:false},
                                data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name:'(μg/L)'
                            }
                        ],
                        series : [
                            {
                                name:'叶绿素a',
                                type:'line',
                                itemStyle : { normal: {label : {show: true, position: 'top'}}},
                                data:myArraysun(data.chlorophyla)
                            },
                            {
                                name:'脱镁叶绿素',
                                type:'line',
                                itemStyle : { normal: {label : {show: true, position: 'top'}}},
                                data:myArraysun(data.pheophytin)
                            },
                        ]
                    };
                    var currentIndex = -1;
                    var timeTicket = setInterval(function () {
                        var dataLen = option5.series[0].data.length;
                        // 取消之前高亮的图形
                        myChart5.dispatchAction({
                            type: 'downplay',
                            seriesIndex: 0,
                            dataIndex: currentIndex
                        });
                     currentIndex = (currentIndex + 1) % dataLen;
                        // 高亮当前图形
                        myChart5.dispatchAction({
                            type: 'highlight',
                            seriesIndex: 0,
                            dataIndex: currentIndex
                        });
                        // 显示 tooltip
                        myChart5.dispatchAction({
                            type: 'showTip',
                            seriesIndex: 0,
                            dataIndex: currentIndex
                        });
                    }, 1500);          
                    myChart5.setOption(option5);
                    myChart6.setOption(option6);
                    myChart7.setOption(option7);
                    myChart8.setOption(option8);
                    myChart9.setOption(option9);
                    myChart10.setOption(option10);
                    myChart11.setOption(option11);
                    myChart12.setOption(option12);
        }

        function showechart(event) {
                    //初始化数据面板和echart内容
                var myChart1 = echarts.init(document.getElementById('echartPanel1'));
                var myChart2 = echarts.init(document.getElementById('echartPanel2'));
                var myChart3 = echarts.init(document.getElementById('echartPanel3'));
                var myChart4 = echarts.init(document.getElementById('echartPanel4'));
                myChart1.showLoading({text: "拼命加载中..."});
                myChart2.showLoading({text: "拼命加载中..."});
                myChart3.showLoading({text: "拼命加载中..."});
                myChart4.showLoading({text: "拼命加载中..."});
                var data;
                    // 指定图表的配置项和数据
                var option4 = {
                            tooltip : {
                                trigger: 'axis',
                                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            legend: {
                                data:['悬浮质(mg/L)']
                            },
                            toolbox: {
                                show : true,
                                feature : {
                                    dataView : {show: true, readOnly: false},
                                    restore : {show: true},
                                    saveAsImage : {show: true}
                                }
                            },
                            calculable : true,
                            xAxis : [
                                {
                                    type : 'category',
                                    boundaryGap : false,
                                    data : []
                                }
                            ],
                            yAxis : [
                                {
                                    type : 'value',
                                    name:'悬浮质(mg/L)'
                                }
                            ],
                            series : [
                                {
                                    name:'悬浮质(mg/L)',
                                    type:'line',
                                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                    data:[]
                                }
                            ]
                        };
                var option3 = {
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:['电导率(µS/cm)']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                splitLine: {show:false},
                                data : []
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name:'电导率(µS/cm)'
                            }
                        ],
                        series : [
                            {
                                name:'电导率(µS/cm)',
                                type:'line',
                                itemStyle : { normal: {label : {show: true, position: 'top'}}},
                                data:[]
                            }
                        ]
                    };
                var option2 = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            dataView : {show: true, readOnly: false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    legend: {
                        data:['透明度-折线','透明度-柱状']
                    },
                    xAxis : [
                        {
                            boundaryGap : true,
                            data : []
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name : '透明度(m)'
                        }
                    ],
                    series : [
                        {
                            name:'透明度-折线',
                            type:'line',
                            data:[]
                        },
                        {
                            name:'透明度-柱状',
                            type:'bar',
                            barWidth : 22,
                            itemStyle:{
                                normal:{
                                    color:'#9BCA63',
                                }
                            },
                            data:[]
                        }
                    ]
                };
                var option1 = {
                        title: {
                                 text: '水体物理要素',
                                 textStyle:{fontWeight: 'bolder',color: '#000000'}
                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data:['水深(m)','水温(℃)']
                        },
                        toolbox: {
                            show : true,
                            feature : {
                                dataView : {show: true, readOnly: false},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        calculable : true,
                        xAxis : [
                            {
                                type : 'category',
                                splitLine: {show:false},
                                boundaryGap : false,
                                data : []
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value',
                                name : '水温(℃)'
                            },
                            {
                                type : 'value',
                                name : '水深(m)'
                            }
                        ],
                        series : [
                            {
                                name:'水深(m)',
                                type:'line',
                                yAxisIndex: 1,
                                data:[]
                            },
                            {
                                name:'水温(℃)',
                                type:'line',
                                data:[]
                            }
                        ]
                };

                var currentIndex = -1;
                var timeTicket = setInterval(function () {
                    var dataLen = option1.series[0].data.length;
                    // 取消之前高亮的图形
                    myChart1.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: currentIndex
                    });
                    currentIndex = (currentIndex + 1) % dataLen;
                    // 高亮当前图形
                    myChart1.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: currentIndex
                    });
                    // 显示 tooltip
                    myChart1.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: currentIndex
                    });
                }, 1500);
                myChart1.setOption(option1);
                myChart2.setOption(option2);
                myChart3.setOption(option3);
                myChart4.setOption(option4);
                var temps = {};
                temps.lat = event.latlng.lat;
                temps.lng = event.latlng.lng;
                $.ajax({
                    type: 'post',
                    async: false,
                    url: '/readphysical',
                    contentType: 'application/json;charest = utf-8',
                    data: JSON.stringify(temps),
                    dataType: 'json',
                    success: function(news) {
                        data = news.physicalelements;
                        myChart1.hideLoading();
                        myChart1.setOption({xAxis : [
                            {
                                data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                            }
                        ],
                            series : [
                                {
                                    data:myArray(data.waterDepth)
                                },
                                {
                                    data:myArray(data.temperature)
                                },
                            ]});
                        myChart2.hideLoading();
                        myChart2.setOption({xAxis : [
                            {
                                data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                            }
                        ],
                            series : [
                                {
                                    data:myArray(data.transparency)
                                },
                                {
                                    data:myArray(data.transparency)
                                }
                            ]});
                        myChart3.hideLoading();
                        myChart3.setOption({xAxis : [
                            {
                                data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                            }
                        ],
                            series : [
                                {
                                    data:myArray(data.conductivity)
                                }
                            ]});
                        myChart4.hideLoading();
                        myChart4.setOption({xAxis : [
                            {
                                data : ['1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006']
                            }
                        ],
                            series : [
                                {
                                    data:myArray(data.suspensoid)
                                }
                            ]});
                    },
                    error: function(news) {
                        console.log(err);
                    }
                });
            }

        function showpPanel(event) {
        //初始化数据面板和echart内容
            var myChart = echarts.init(document.getElementById('echartPanel'));
            myChart.showLoading({text: "拼命加载中..."});
            var datatest;
                    // 指定图表的配置项和数据
             var option = {
                    baseOption: {
                        timeline: {
                            axisType: 'category',
                            autoPlay: true,
                            playInterval: 1000,
                            data: ['1999','2000','2001','2002','2003','2004','2005','2006'],
                            label: {
                                formatter : function(s) {
                                    return (new Date(s)).getFullYear();
                                }
                            }
                        },
                        toolbox: {
                                show : true,
                                feature : {
                                    dataView : {show: true, readOnly: false},
                                    restore : {show: true},
                                    saveAsImage : {show: true}
                                }
                        },
                        tooltip: {trigger: 'axis',
                                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                                            }
                                        },
                        legend: {
                            data: ['Datas'],
                        },
                        itemStyle:{
                           normal:{
                                color:'#27727B',
                            }
                        },
                        calculable : true,
                        grid: {
                            top: 80,
                            bottom: 100
                        },
                        xAxis: [
                            {
                                'type':'category',
                                'axisLabel':{'interval':0},
                                'data':{},
                                splitLine: {show: false}
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                max:10
                            }
                        ],
                        series: [
                            {name: 'Datas', type: 'bar',barWidth : 22},      
                        ]
                    },
                    options: [
                        {
                            title: {},
                            series: [
                                {data: []},
                            ]
                        },
                        {
                            title: {},
                            series: [
                                {data: []},
                            ]
                        },
                        {
                            title: {},
                            series: [
                                {data: []},
                            ]
                        },
                        {
                            title: {},
                            series: [
                                {data: []},
                            ]
                        },
                        {
                            title: {},
                            series: [
                                {data: []},
                            ]
                        },
                        {
                            title: {},
                            series: [
                                {data: []},
                            ]
                        },
                        {
                            title: {},
                            series: [
                                {data: []},
                            ]
                        },
                        {
                            title: {},
                            series: [
                                {data: []},
                            ]
                        }
                    ]
            };
            myChart.setOption(option);
            var params = {};
            params.lat = event.latlng.lat;
            params.lng = event.latlng.lng;
            $.ajax({
                type: 'post',
                async: false,
                url: '/readPoint',
                contentType: 'application/json;charest = utf-8',
                data: JSON.stringify(params),
                dataType: 'json',
                success: function(msg) {
                    datatest = msg.chartdata;
                    myChart.hideLoading();
                    myChart.setOption({xAxis: [
                        {
                            'data':["含水率*10","\n总磷(mg/L)","总氮(mg/L)","\n砂土百分比*10","粉砂土百分比*10","\n粘土百分比*10","烧失量(LOI)","\npH"]
                        }
                    ],
                        series: [
                            {name: 'Datas', type: 'bar',barWidth : 22},
                        ],
                        options: [
                            {
                                title: {text: '1999太湖沉积物监测图',
                                    textStyle:{fontWeight: 'bolder',color: '#000000'},
                                    subtext :'            '+datatest.name+'----'+datatest.point,
                                    subtextStyle:{color: '#000000'}
                                },
                                series: [
                                    {data: datatest.y1999},
                                ]
                            },
                            {
                                title : {text: '2000太湖沉积物监测图',
                                    textStyle:{fontWeight: 'bolder',color: '#000000'},
                                    subtext :'            '+datatest.name+'----'+datatest.point,
                                    subtextStyle:{color: '#000000'}
                                },
                                series : [
                                    {data: datatest.y2000},
                                ]
                            },
                            {
                                title : {text: '2001太湖沉积物监测图',
                                    textStyle:{fontWeight: 'bolder',color: '#000000'},
                                    subtext :'            '+datatest.name+'----'+datatest.point,
                                    subtextStyle:{color: '#000000'}
                                },
                                series : [
                                    {data: datatest.y2001},
                                ]
                            },
                            {
                                title : {text: '2002太湖沉积物监测图',
                                    textStyle:{fontWeight: 'bolder',color: '#000000'},
                                    subtext :'            '+datatest.name+'----'+datatest.point,
                                    subtextStyle:{color: '#000000'}
                                },
                                series : [
                                    {data: datatest.y2002},
                                ]
                            },
                            {
                                title : {text: '2003太湖沉积物监测图',
                                    textStyle:{fontWeight: 'bolder',color: '#000000'},
                                    subtext :'            '+datatest.name+'----'+datatest.point,
                                    subtextStyle:{color: '#000000'}
                                },
                                series : [
                                    {data: datatest.y2003},
                                ]
                            },
                            {
                                title : {text: '2004太湖沉积物监测图',
                                    textStyle:{fontWeight: 'bolder',color: '#000000'},
                                    subtext :'            '+datatest.name+'----'+datatest.point,
                                    subtextStyle:{color: '#000000'}
                                },
                                series : [
                                    {data: datatest.y2004},
                                ]
                            },
                            {
                                title : {text: '2005太湖沉积物监测图',
                                    textStyle:{fontWeight: 'bolder',color: '#000000'},
                                    subtext :'            '+datatest.name+'----'+datatest.point,
                                    subtextStyle:{color: '#000000'}
                                },
                                series : [
                                    {data: datatest.y2005},
                                ]
                            },
                            {
                                title : {text: '2006太湖沉积物监测图',
                                    textStyle:{fontWeight: 'bolder',color: '#000000'},
                                    subtext :'            '+datatest.name+'----'+datatest.point,
                                    subtextStyle:{color: '#000000'}
                                },
                                series : [
                                    {data: datatest.y2006},
                                ]
                            }
                        ]});
                },
                error: function(msg) {
                    console.log(err);
                }
            });
            // 使用刚指定的配置项和数据显示图表。
    }

        function displayPoint(event){
            var temp = {};
            // console.log(event.latlng.lng);
            temp.lat = event.latlng.lat;
            temp.lng = event.latlng.lng;
            $.ajax({
                type: 'post',
                async: false,
                url: '/readPointName',
                contentType: 'application/json;charest = utf-8',
                data: JSON.stringify(temp),
                dataType: 'json',
                success: function(msgn) {
                    pointName = msgn.pointdataName.name;
                    pointID= msgn.pointdataName.ID;
                },
                error: function(msgn) {
                    console.log(err);
                }
            });
        }

    //加载图层
    function addLayers(layers, name, map, maplayers) {
        layers[name].addTo(map);
        maplayers.push(name);
    }

    function setXY(map) {
        var latlng = L.latLng(31.24445, 120.1694);
        map.setView(latlng, 9);
    }

 //string转换成object
    function stringToObject(json) {
        return eval("(" + json + ")");
    }

    function initMap() {
        var normalm = L.tileLayer.chinaProvider('TianDiTu.Normal.Map', {
                maxZoom: 18,
                minZoom: 5
            }),
            normala = L.tileLayer.chinaProvider('TianDiTu.Normal.Annotion', {
                maxZoom: 18,
                minZoom: 5
            }),
            imgm = L.tileLayer.chinaProvider('TianDiTu.Satellite.Map', {
                maxZoom: 18,
                minZoom: 5
            }),
            imga = L.tileLayer.chinaProvider('TianDiTu.Satellite.Annotion', {
                maxZoom: 18,
                minZoom: 5
            });
        var normal = L.layerGroup([normalm, normala]),
            image = L.layerGroup([imgm, imga]);

        //leaflet中选择影像和正常
        var baseLayers = {
            "地图": normal,
            "影像": image
        };
        var overlayLayers = {};
        //加载底图
        var map = L.map("map", {
            center: [31.24445, 120.1694],
            zoom: 7,
            layers: [normal, image],
            zoomControl: true
        });
        //加载控制面板
        control = L.control.layers(baseLayers).addTo(map);
        return map;
    }
});