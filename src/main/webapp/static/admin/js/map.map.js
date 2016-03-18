function myrefresh(){
window.location.reload();
}
//setTimeout('myrefresh()',30000); //指定30秒刷新一次，改成你要的时间即可，30000表示30秒


//创建地图函数：
    function createMap(longi,lati,zoom){
    	//alert("111");
        var map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
       // alert("222");
        var point = new BMap.Point(longi,lati);//定义一个中心点坐标
        map.centerAndZoom(point,zoom);//设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map;//将map变量存储在全局
    }
    
    //地图事件设置函数：
    function setMapEvent(){
        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard();//启用键盘上下左右键移动地图
    }
    
    //地图控件添加函数：
    function addMapControl(){
        //向地图中添加缩放控件
	var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
	map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
	var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
	map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);
    }
    
    //标注点数组
   // var markerArr = [{title:"我的标记",content:"我的备注",point:"116.361438|39.949901",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	//	 ];
    var marker = document.getElementById("marker").value;
    marker = marker.replace(new RegExp(/(~)/g),'"');
	var markerArr=new Array();
	var markerSArr=new Array();
	var obj = new Object();
	//markerArr.push(marker);
    markerSArr = marker.split("-,");
    length = markerSArr.length-1;
    //alert(length);
    for(var i=0;i<length;i++)
    {
    	//for test markerSArr print
    	obj = eval('(' + markerSArr[i] + ')'); 
    	markerArr.push(obj); 
    }
    //var markerArr = eval('(' + marker + ')'); */
	// alert(markerArr[0].content);
		 //正确示例
	 	//var markerArr = [{title:"用户名：test04",content:"用户名：test04|真实姓名：简单4",point:"108.000000|34.000000",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}},
	//{title:"用户名：test04",content:"用户名：test04|真实姓名：简单4",point:"108.000000|34.000000",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	//					];
  //var markerArr = [{title:"卫星大厦基站，顺序：1",content:"卫星大厦基站，顺序：1",point:"108.000000|34.000000",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
	//{title:"用户名：test04",content:"用户名：test04|真实姓名：简单4",point:"108.000000|34.000000",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
						//];

    //创建marker	    
    function addMarker(){
    	
        for(var i=0;i<markerArr.length;i++){
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0,p1);
           // console.log("111");
			var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point,{icon:iconImg});
			var iw = createInfoWindow(i);
			var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
			marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                        borderColor:"#808080",
                        color:"#333",
                        cursor:"pointer"
            });
			
			(function(){
				var index = i;
				var _iw = createInfoWindow(i);
				var _marker = marker;
				_marker.addEventListener("click",function(){
				    this.openInfoWindow(_iw);
			    });
			    _iw.addEventListener("open",function(){
				    _marker.getLabel().hide();
			    })
			    _iw.addEventListener("close",function(){
				    _marker.getLabel().show();
			    })
				label.addEventListener("click",function(){
				    _marker.openInfoWindow(_iw);
			    })
				if(!!json.isOpen){
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			})()
        }
    }
    
    function addMarker1(markerArr){
        for(var i=0;i<markerArr.length;i++){
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0,p1);
			var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point,{icon:iconImg});
			var iw = createInfoWindow1(i,markerArr);
			var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
			marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                        borderColor:"#808080",
                        color:"#333",
                        cursor:"pointer"
            });
			
			(function(){
				var index = i;
				var _iw = createInfoWindow1(i,markerArr);
				var _marker = marker;
				_marker.addEventListener("click",function(){
				    this.openInfoWindow(_iw);
			    });
			    _iw.addEventListener("open",function(){
				    _marker.getLabel().hide();
			    })
			    _iw.addEventListener("close",function(){
				    _marker.getLabel().show();
			    })
				label.addEventListener("click",function(){
				    _marker.openInfoWindow(_iw);
			    })
				if(!!json.isOpen){
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			})()
        }
    }
    //创建InfoWindow
    function createInfoWindow(i){
        //alert(i);
        var json = markerArr[i];
        //var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
		//alert(json.content);
		var sContentStart =	"";
		var sContent = json.content;
		//alert(sContent);
		
		/*
		arrow_up="<img src='/maike/images/arrow_up.png' border='0'/>";
		arrow_down="<img src='/maike/images/arrow_down.png' border='0'/>";
		green="<img src='/maike/images/green.png' border='0'/>";
		
	
			contentString = json.content;
			//split content格式：$nos.';'.$sns.';'.$values.';'.$units
			contentArr = contentString.split(";");
			
			nos = contentArr[0];	
			sns = contentArr[1];
			values = contentArr[2];
			units = contentArr[3];

			noArr = nos.split(",");	
			snArr = sns.split(",");	
			for(i=0;i<snArr.length;i++)
			{
				if(snArr[i]==2) 
					snArr[i] = arrow_down; 
				else if(snArr[i]==1) 
					snArr[i]=arrow_up;
				else snArr[i]= green;	
				//alert(snArr[i]);
			}	
			
			valArr = values.split(",");			
			unitArr = units.split(",");

			for(i=0;i<noArr.length;i++)
			{								
				sContent +="<tr><td>"+noArr[i]+
					"</td><td>"+valArr[i]+
					"</td><td>"+snArr[i]+
					"</td><td>"+unitArr[i]+
					"</td></tr>";
			//alert(sContent);
			
		
			}//end for $noArr
		*/
		var sContentEnd = "</table>";
		var Content = sContent;
		//alert(Content);
		var iw = new BMap.InfoWindow(Content);
    	return iw;
    }
    
    function createInfoWindow1(i,markerArr){
        //alert(i);
        var json = markerArr[i];
        //var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
		//alert(json.content);
		var sContentStart =	"";
		var sContent = json.content;
		//alert(sContent);
		
		/*
		arrow_up="<img src='/maike/images/arrow_up.png' border='0'/>";
		arrow_down="<img src='/maike/images/arrow_down.png' border='0'/>";
		green="<img src='/maike/images/green.png' border='0'/>";
		
	
			contentString = json.content;
			//split content格式：$nos.';'.$sns.';'.$values.';'.$units
			contentArr = contentString.split(";");
			
			nos = contentArr[0];	
			sns = contentArr[1];
			values = contentArr[2];
			units = contentArr[3];

			noArr = nos.split(",");	
			snArr = sns.split(",");	
			for(i=0;i<snArr.length;i++)
			{
				if(snArr[i]==2) 
					snArr[i] = arrow_down; 
				else if(snArr[i]==1) 
					snArr[i]=arrow_up;
				else snArr[i]= green;	
				//alert(snArr[i]);
			}	
			
			valArr = values.split(",");			
			unitArr = units.split(",");

			for(i=0;i<noArr.length;i++)
			{								
				sContent +="<tr><td>"+noArr[i]+
					"</td><td>"+valArr[i]+
					"</td><td>"+snArr[i]+
					"</td><td>"+unitArr[i]+
					"</td></tr>";
			//alert(sContent);
			
		
			}//end for $noArr
		*/
		var sContentEnd = "</table>";
		var Content = sContent;
		//alert(Content);
		var iw = new BMap.InfoWindow(Content);
    	return iw;
    }
    //创建一个Icon
    function createIcon(json){
        var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
        return icon;
    }
    
    function initMap(){
        //定位地图中心
        
        var pointStr = " ";               
        var pointArr = new Array();
       
        var longiF = "";
        var latiF = "";
        var zoom = "";
        if(zoom == "")
        {
            zoom = 12;
        }
        console.log(markerArr);
        if(markerArr.length==0)
        {
        	longiF="108";
        	latiF="34";
        }
        else
        {
            
            	pointStr = markerArr[0].point;        
        		pointArr = pointStr.split("|");
                longiF = pointArr[0];
                latiF = pointArr[1];             
            
            //alert(longiF+latiF);        
        	
        }
        //创建地图
        //alert(longiF+latiF);
        //createMap(108.896002,34.238386);
        createMap(longiF,latiF,zoom);
        setMapEvent();//设置地图事件
        addMapControl();//向地图添加控件
        addMarker();//向地图中添加marker
    }
    
    
    
    initMap();//创建和初始化地图
    