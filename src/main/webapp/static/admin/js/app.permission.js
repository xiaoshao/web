$(document).ready(function() {
	/**
	 * 模块搜索处理
	 */
	$(".app-permission-appkey").click(function(event){
		event.preventDefault();
        event.stopPropagation();
        
		var page = $("input[name=page]:last").val();
		var href = $(this).attr("href") + "&page=" + page;
		
		$.history.load(href);
		return false;
	});
	
	/**
	 * 排序处理
	 */
	$(".order").click(function(){
		var href = $(this).attr("href");
		var order = "DESC";
		if ($(this).hasClass("order-asc")) {
			order = "ASC";
		}
		href += "&orderby=" + order;
		
		$.history.load(href);
		return false;
	});
	
	/**
	 * 添加按钮处理
	 */
	$("#app_permission_add").click(function(event){
		// 防止点击穿透
		event.preventDefault();
        event.stopPropagation();
        
		var href = "/admin/apppermission/add?loadtype=ajax";
		$.history.load(href);
	});
	
	/**
	 * 编辑按钮处理
	 */
	$(".operate-edit").click(function(){
		var obj_ap = $(this).parent().parent();
		var ap_appkey = obj_ap.attr("ap_appkey");
		var ap_module = obj_ap.attr("ap_module");
		var ap_controller = obj_ap.attr("ap_controller");
		var ap_action = obj_ap.attr("ap_action");
		var href = "/admin/apppermission/edit?loadtype=ajax&ap_appkey=" + ap_appkey + "&ap_module=" + ap_module + "&ap_controller=" + ap_controller + "&ap_action=" + ap_action;
		$.history.load(href);
	});
	
	/**
	 * 提交按钮处理
	 */
	$("input.input-submit").click(function(){
		var submit_id = $(this).attr("id");
		switch (submit_id) {
			case 'submit_cancel' : app_permission_cancel(); break;
			case 'submit_save_back' : back_listing = true; app_permission_submit(); break;
			case 'submit_save_continue' : back_listing = false; app_permission_submit(); break;
		}
	});
});


/**
 * 分页处理
 */
function Content_Listing_LoadPage($page) {
	var url = '/admin/apppermission/index?page=' + $page + '&perpage=' + pg_perpage;
	$.history.load(url);
}

/**
 * 取消处理
 */
function app_permission_cancel() {
	history.go(-1);
}

/**
 * 动作表单提交处理
 */
function app_permission_submit() {
	notice('edit_notice', img_loading_small, false);
	
	if (! $("select[name=ap_permission_id]").val() || ! $("input[name=ap_module]").val() || 
		! $("input[name=ap_controller]").val() || ! $("input[name=ap_action]").val() || ! $("select[name=ap_appkey]").val()) {
		notice('edit_notice', img_delete + ' 请填写完所带红色星号的内容', true, 5000);
		return false;
	}
	
	var keys = $("#keys").val();
	
	var saveCallBack;
	if (keys == '' || keys == 0) {
		saveCallBack = app_permission_save_added;
	} else {
		$("#edit_form").attr("action", "/admin/apppermission/edit");
		saveCallBack = app_permission_save_edited;
	}
	var options = {
            dataType:'json',
            timeout:60000,
            success:saveCallBack,
            error:ajaxError
    };
    $("#edit_form").ajaxSubmit(options);
    return false;
}

/**
 * 添加权限成功，返回处理
 */
function app_permission_save_added(data, textStatus) {
    if(data.status === 0) {
        notice('edit_notice', img_done + ' 添加权限成功!', true, 5000);
        
        // 判断是否返回权限列表管理
        if (back_listing == true) {
        	history.back(-1);
        }
    } else {
    	notice('edit_notice', img_delete + " " + data.error, true, 5000);
    }
}

/**
 * 编辑权限成功，返回处理
 */
function app_permission_save_edited(data, textStatus) {
    if (data.status === 0) {
        notice('edit_notice', img_done + ' 编辑成功!', true, 5000);
        history.back(-1);
    } else {
    	notice('edit_notice', img_delete + " " + data.error, true, 5000);
    }
}