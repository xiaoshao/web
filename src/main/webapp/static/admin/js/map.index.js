$(document).ready(function() {
	
	
	/**
     * 刷新或搜索
     */
    $(".action-refresh, #action_search").on('click', function(){
    	$.ajax({
            type:"POST",
            url:"/businessadmin/map/index",
            data: {
                stnId: $('select[name=stnId]').val(),
                imesi_type: $('select[name=imesi_type]').val(),
                imesi_val: $('input[name=imesi_val]').val(),
                ctime_start: $('input[name=ctime_start]').val(),
                ctime_end: $('input[name=ctime_end]').val(),
                mac: $('input[name=mac]').val(),
                local: $('input[name=local]').val(),
                phone: $('input[name=phone]').val(),
                threshold:$('input[name=threshold]').val(),
                key:$('input[name=key]').val()
            },
            datatype: "json",        
            success:function(data){
               // alert("success");
                
                //console.log(data);
                var  marker = data;
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
                //console.log(markerArr);
                if(markerArr.length >0)
                {
                	addMarker1(markerArr);
                }
               
                //initMap();
            } 
   })

    });
	
	/**
	 * 搜索对回车的支持
	 */
	$("input[name=key]").on('keypress', function (event) {
	    if (event.which == '13' && $(this).val()) {
	    	$('#content_listing').datagrid('reload');
	    	return false;
	    }
	});
	
	//根据商家获取活动名称
	function get_region(e){
	    var region_province_id=$(e).val();

	   $.ajax({
	            type:"POST",
	            url:"/activeadmin/active/addRegionCity",
	            data:{region_province_id:region_province_id},
	            datatype: "json",        
	            success:function(data){
	                data = jQuery.parseJSON(data);
	                $("#region_id").empty();//先清空下拉
	                 var html="<option value='0' >请选择市区</option>";
	                 if(data.city_list != null){
	                    var city_list = data.city_list
	                    for(var i=0;i<city_list.length;i++){  
	                        html+="<option value='"+city_list[i].region_id+"'>"+city_list[i].region_name+"</option>";
	                    }  
	                 }else{
	                     var html="<option value='0' >请选择市区</option>";
	                 }  
	                 $("#region_id").append(html);
	            } 
	   })

	}
})

