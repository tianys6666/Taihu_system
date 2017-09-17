$(function () {
    $("#serch").mousedown(function () {
        if ($("#test1").length > 0) {
            $("#test1").remove();
            $("#example1").prepend("<div id='test1'></div>")
        } else {
            $("#example1").prepend("<div id='test1'></div>")
        }
    });
    $("#serch").mouseup(function () {
        var getYear = $("#Syear").val();
        var getMonth = $("#Smonth").val();
        var getPoint = $("#Spoint").val();
        var getOption = $("#mySelect option:selected").text();
        var getOptionid = $("#mySelect option:selected").val();
        if (getOptionid == "0") {
            if (getYear != "") {
                if (getMonth != "") {
                    if (getPoint != "") {
                        serchDatepoint()
                    } else {
                        serchDate()
                    }
                } else {
                    if (getPoint != "") {
                        serchYearpoint()
                    } else {
                        serchYear()
                    }
                }
            } else {
                if (getMonth != "") {
                    if (getPoint != "") {
                        serchMonthpoint()
                    } else {
                        serchMonth()
                    }
                } else {
                    if (getPoint != "") {
                        serchPoint()
                    } else {
                        alert("请输入查找条件！")
                    }
                }
            }
        } else {
            if (getYear != "") {
                if (getMonth != "") {
                    if (getPoint != "") {
                        serchDateoption()
                    } else {
                        serchYMoption()
                    }
                } else {
                    if (getPoint != "") {
                        serchYPoption()
                    } else {
                        serchYoption()
                    }
                }
            } else {
                if (getMonth != "") {
                    if (getPoint != "") {
                        serchMPoption()
                    } else {
                        serchMoption()
                    }
                } else {
                    if (getPoint != "") {
                        serchPoption()
                    } else {
                        serchoption()
                    }
                }
            }
        }
        function serchoption() {
            var tempArray = {};
            tempArray.option = getOptionid;
            $.ajax({
                type: "post",
                async: false,
                url: "/readoptionX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getoptionX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchPoption() {
            var tempArray = {};
            tempArray.point = getPoint;
            tempArray.option = getOptionid;
            $.ajax({
                type: "post",
                async: false,
                url: "/readPoptionX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getPoptionX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchMoption() {
            var tempArray = {};
            tempArray.month = getMonth;
            tempArray.option = getOptionid;
            $.ajax({
                type: "post",
                async: false,
                url: "/readMoptionX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getMoptionX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchMPoption() {
            var tempArray = {};
            tempArray.month = getMonth;
            tempArray.point = getPoint;
            tempArray.option = getOptionid;
            $.ajax({
                type: "post",
                async: false,
                url: "/readMPoptionX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getMPoptionX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchYoption() {
            var tempArray = {};
            tempArray.year = getYear;
            tempArray.option = getOptionid;
            $.ajax({
                type: "post",
                async: false,
                url: "/readYoptionX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getYoptionX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchYPoption() {
            var tempArray = {};
            tempArray.year = getYear;
            tempArray.point = getPoint;
            tempArray.option = getOptionid;
            $.ajax({
                type: "post",
                async: false,
                url: "/readYPoptionX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getYPoptionX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchYMoption() {
            var tempArray = {};
            tempArray.year = getYear;
            tempArray.month = getMonth;
            tempArray.option = getOptionid;
            $.ajax({
                type: "post",
                async: false,
                url: "/readYMoptionX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getYMoptionX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchDateoption() {
            var tempArray = {};
            tempArray.year = getYear;
            tempArray.month = getMonth;
            tempArray.point = getPoint;
            tempArray.option = getOptionid;
            $.ajax({
                type: "post",
                async: false,
                url: "/readDateoptionX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getdateoptionX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchPoint() {
            var tempArray = {};
            tempArray.point = getPoint;
            $.ajax({
                type: "post",
                async: false,
                url: "/readPointX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getpointX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchMonth() {
            var tempArray = {};
            tempArray.month = getMonth;
            $.ajax({
                type: "post",
                async: false,
                url: "/readMonthX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getmonthX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchMonthpoint() {
            var tempArray = {};
            tempArray.month = getMonth;
            tempArray.point = getPoint;
            $.ajax({
                type: "post",
                async: false,
                url: "/readMonthpointX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getmonthpointX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchYear() {
            var tempArray = {};
            tempArray.year = getYear;
            $.ajax({
                type: "post",
                async: false,
                url: "/readYearX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getyearX)
                    console.log(typeof (msget.getyearX));
                    console.log(msget.getyearX);
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchYearpoint() {
            var tempArray = {};
            tempArray.year = getYear;
            tempArray.point = getPoint;
            $.ajax({
                type: "post",
                async: false,
                url: "/readYearpointX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getyearpointX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function serchDate() {
            var tempArray = {};
            tempArray.year = getYear;
            tempArray.month = getMonth;
            $.ajax({
                type: "post",
                async: false,
                url: "/readDateX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msgetD) {
                    drawChart(msgetD.getdateX)
                },
                error: function (msgetD) {
                    console.log(err)
                }
            })
        }

        function serchDatepoint() {
            var tempArray = {};
            tempArray.year = getYear;
            tempArray.month = getMonth;
            tempArray.point = getPoint;
            $.ajax({
                type: "post",
                async: false,
                url: "/readDatepointX",
                contentType: "application/json;charest = utf-8",
                data: JSON.stringify(tempArray),
                dataType: "json",
                success: function (msget) {
                    drawChart(msget.getdatepointX)
                },
                error: function (msget) {
                    console.log(err)
                }
            })
        }

        function drawChart(json) {
            $(document).ready(function () {
                $("#test1").columns({data: json})
            })
        }
    })
});