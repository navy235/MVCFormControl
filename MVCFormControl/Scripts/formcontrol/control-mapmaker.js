(function ($) {
  $.extend($.fn, {
    mapMaker:
    function (setting) {
      if (!setting) {
        setting = {};
      }
      var ps = $.extend({
        containerId: '_container',
        windowId: '_window',
        selectId: '_select',
        mapcontrolId: '_mapcontrol',
        keywordsId: '_keywords',
        searchId: '_search',
        markerId: '_marker',
        iconUrl: '',
        lat: 0,
        lng: 0
      }, setting);

      var that = this,
          map,
          local,
          options = {
            onSearchComplete: function (results) {
              if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                // 判断状态是否正确   
                var s = [];
                map.clearOverlays();
                for (var i = 0; i < results.getCurrentNumPois() ; i++) {
                  var x = results.getPoi(i).lng;
                  var y = results.getPoi(i).lat;
                  s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
                  if (i == 0) {
                    map.setCenter(results.getPoi(i).point);
                    addMarker(results.getPoi(i).point);
                  }
                }
              }
              else {
                alert('没有搜索到该地！');
              }
            }
          },
          infoOptions = {
            width: 100,     // 信息窗口宽度   
            height: 50,     // 信息窗口高度  
            title: "提示："  // 信息窗口标题   
          },
          infoWinContent = "请移动此图标到您需要标记的位置<br/>点击图标即可标记!",
          id = that.attr('id');


      //function load() {
      //  var script = document.createElement("script");
      //  script.src = "http://api.map.baidu.com/api?v=2.0&ak=B838095fbcc8a5a3f49d7a215d31ea36&callback=binding";
      //  document.body.appendChild(script);
      //}

      function binding() {
        var point = new BMap.Point(116.404, 39.915);
        if (ps.lng != 0 && ps.lng != 0) {
          point = new BMap.Point(new Number(ps.lng), new Number(ps.lat));
        }
        map = new BMap.Map(id + ps.containerId);
        map.centerAndZoom(point, 12);
        map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件
        map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件
        map.addControl(new BMap.OverviewMapControl());
        map.enableScrollWheelZoom();//添加缩略地图控件
        local = new BMap.LocalSearch(map, options);
        bindingControl();
        $("#" + id + ps.selectId).on('click', mapShow);
        $('#' + id + ps.markerId).on('click', mapMarker);
        $('#' + id + ps.keywordsId).on('keydown', seachkeydown);
        $('#' + id + ps.searchId).on('click', seach);
        setCityName();
      }

      function bindingControl() {
        $("#" + id + ps.containerId).append($('#' + id + ps.mapcontrolId).show());
      }

      function setCityName() {
        var myCity = new BMap.LocalCity();
        myCity.get(function (result) {
          var cityName = result.name;
          $('#' + id + ps.keywordsId).val(cityName);

        })
      }

      function mapShow() {
        $("#" + id + ps.windowId).data("kendoWindow").center().open();
        if (ps.lng == 0 && ps.lng == 0) {
          seach();
        }
      }

      function seachkeydown(e) {
        if (e.keyCode === 13) {
          seach();
        }
      }

      function seach(e) {
        var keywords = $("#" + id + ps.keywordsId).val();
        if (keywords === '') {
          return;
        }
        local.search(keywords);
      }

      function mapMarker() {
        map.clearOverlays();
        addMarker(map.getCenter());
      }

      function addMarker(point) {
        var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
          offset: new BMap.Size(0, 0),
          imageOffset: new BMap.Size(0, 0 - 10 * 25)
        });
        var marker = new BMap.Marker(point, { icon: myIcon });
        map.clearOverlays();
        map.addOverlay(marker);
        marker.enableDragging();
        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
        var infoWindow = new BMap.InfoWindow(infoWinContent, {});  // 创建信息窗口对象
        marker.addEventListener("mouseover", function () {
          if (!this.firstOpen) {
            this.firstOpen = true;
            marker.setAnimation(null);
            this.openInfoWindow(infoWindow);      // 打开信息窗口 
          }
        })
        marker.addEventListener("click", function (e) {
          if (confirm("确认选择该坐标？")) {
            $('#' + id).val(e.point.lat + '|' + e.point.lng);
            $('#' + id).parents('form:first').validate().element('#' + id);
            $("#" + id + ps.windowId).data("kendoWindow").close();
          }
        });
        return marker;
      }

      binding();
    }
  });
})(jQuery)