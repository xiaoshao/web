/**
 * 定义全局变量
 */
var $cookieName_navigation = 'A2_LastNavigationHid';

var img_done = "<img src='" + STATIC_CDN + "/panel/img/ico-done.gif' border='0' />";
var img_delete = "<img src='" + STATIC_CDN + "/panel/img/ico-delete.gif' border='0' />";
var img_warning = "<img src='" + STATIC_CDN + "/panel/img/ico-warning.gif' border='0' />";
var img_loading_small = "<img src='" + STATIC_CDN + "/panel/img/loading-small.gif' border='0' />";
var back_listing = false; // 编辑表单提交处理完毕后，是否返回列表管理

$(document).ready(function() {
	/**
	 * 载入导航轨迹
	 */
	loadNavigation();
	
	/**
	 * 基于 html5 的 ajax + pushState 实现无刷新加载内容，并同时修改 URL 地址栏
	 */
	$.pjax({
        selector: 'a.load-content',
        container: '#content', //内容替换的容器
        show: 'fade',  //展现的动画，支持默认和fade, 可以自定义动画方式，这里为自定义的function即可。
        cache: false,  //是否使用缓存
        storage: false,  //是否使用本地存储
        titleSuffix: '', //标题后缀
        filter: function(){},
        callback: function(){}
    });
    
	/**
	 * 选择地区
	 */
	$("select.region").change(function(){
		var obj = $(this);
		var i = obj.index();
		var region_id_now = $(this).val();
		var region_son_str = '';
		
		/* 清空后面元素的选项 */
		obj.parent().find('select:gt(' + i + ')').find("option:gt(0)").remove();
		
		$.ajax({
	    	type:'post',
	        url:'/helper/region/getregionsbypid',
	        data:'pid=' + region_id_now,
	        dataType:'json',
	        timeout:60000,
	        success:function(data){
	    		if (data.status == 0 && data.data != '' && obj.next('select.region').size() > 0) {
	    			var d = data.data;
	    			for (var i in d) {
	    				region_son_str += '<option value="' + d[i]['region_id'] + '">' + d[i]['region_name'] + '</option>';
	    			}
	    			obj.next('select.region').append(region_son_str);
	    		}
	    		return false;
	    	}
	    });
	});
	
	/**
	 * 整页刷新
	 */
	$('.action-refresh-allpage').click(function(){
		window.location.reload();
    });
});


/**
 * 载入导航轨迹
 */
function loadNavigation() {
	var url_now = window.location.href;
	var url_now_arr = url_now.split(STORE_URL.substr(7));
	var url_now_arr2 = url_now_arr[1].split('?');
	var link_now = url_now_arr2[0];
	var length_temp = link_now.length;
	if (link_now.substr(length_temp - 1) == '/') {
		link_now = link_now.substr(0, length_temp - 1);
	}
	
	var if_hit = loadNavigationCss(link_now);
	
	if (! if_hit) {
		var link_now_arr = link_now.split('/');
		if (link_now_arr.length == 4) {
			link_now = '/' + link_now_arr[1];
			loadNavigationCss(link_now);
		}
	}
}

/**
 * 载入导航轨迹 - 加载样式
 */
function loadNavigationCss(link_now) {
	var if_hit = false
	$('#left_nav').find('.load-content').each(function(){
		var href = $(this).attr('href');
		var href_arr = href.split('?');
		if (href_arr[0] == link_now) {
			$(this).parent().addClass('active');
			$(this).parent().parent().show();
			$(this).parent().parent().parent().addClass('active');
			if_hit = true;
		}
	});
	
	return if_hit;
}

/**
 * Ajax 加载页面 - 适用于局部，或者使用 js 进行页面跳转
 */
function loadingAjax(href, obj) {
    if (href != '' && href != '#' && href != './') {
    	if (! obj) {
    		obj = $("#content");
    	}
        obj.load(href, function() {
        	history.pushState({}, null, href);
        });
    }
}

/**
 * 提示信息处理，可定时清除
 * 
 * @param string obj_id 提示信息对象 ID
 * @param string msg 提示信息内容
 * @param boolean clear 是否自动清除
 * @param integer delayTime 延迟时间
 */
function notice(obj_id, msg, clear, delayTime) {
	$("#" + obj_id).html(msg);
	if (clear) {
		if (! delayTime) {
			delayTime = 5000;
		}
		setTimeout(function() {
			$("#" + obj_id).empty();
	    }, delayTime);
	}
}

/**
 * 更新 CKEDITOR 的状态，即值
 * 适用版本：4.0以上
 */
function CKupdate() {
    for (instance in CKEDITOR.instances)
        CKEDITOR.instances[instance].updateElement();
}

/**
 * ajaxError
 */
function ajaxError(XMLHttpRequest, textStatus, errorThrown) {
    alert('Ooops!Encountered error while connecting to the server.There might be something wrong with your network.Please check your network connection!');
    $('#edit_notice').empty();
    $(".input-submit").removeAttr('disabled');
}