$(document).ready(function() {
	/**
	 * 父级用户组处理
	 */
	$(".group-parent").click(function(event){
		event.preventDefault();
        event.stopPropagation();
        
		var href = $(this).attr("href");
		
		$.history.load(href);
		return false;
	});
	
	/**
	 * 添加按钮处理
	 */
	$("#group_add").click(function(event){
		// 防止点击穿透
		event.preventDefault();
        event.stopPropagation();
        
		var href = "/admin/group/add?loadtype=ajax";
		$.history.load(href);
	});
	
	/**
	 * 编辑按钮处理
	 */
	$(".operate-edit").click(function(){
		var groupid = $(this).parent().parent().attr("groupid");
		var href = "/admin/group/edit?loadtype=ajax&groupid=" + groupid;
		$.history.load(href);
	});
	
	/**
	 * 设置权限
	 */
	$(".operate-permission-assign").click(function(){
		var groupid = $(this).parent().parent().attr("groupid");
		var href = "/admin/permissionassign/assign?loadtype=ajax&groupid=" + groupid;
		$.history.load(href);
	});
	
	/**
	 * 删除用户组
	 */
	$(".operate-delete").click(function(){
		var obj_tr = $(this).parent().parent();
		var groupid = obj_tr.attr('groupid');
		var del_user = $(this).attr('del_user');
		
		var str_confirm = '确定要删除该用户组吗？';
		if (del_user == 1) {
			str_confirm = '确定要删除该用户组，并同时删除该用户组下的所有用户吗？';
		}
		if (! confirm(str_confirm)) {
			return false;
		}
		
		$.ajax({
	    	type:'post',
	        url:'/admin/group/deleteGroup',
	        data:'groupid=' + groupid + '&del_user=' + del_user,
	        dataType:'json',
	        timeout:60000,
	        success:function(data){
	    		if (data.status == 0) {
	    			obj_tr.remove();
	    			alert('删除成功');
	    		} else {
	    			alert('删除失败，请稍后重试');
	    		}
	    		return false;
	    	},
	        error:ajaxError
	    });
	});
	
	/**
	 * 提交按钮处理
	 */
	$("input.input-submit").click(function(){
		var submit_id = $(this).attr("id");
		switch (submit_id) {
			case 'submit_cancel' : group_cancel(); break;
			case 'submit_save_back' : back_listing = true; group_submit(); break;
			case 'submit_save_continue' : back_listing = false; group_submit(); break;
		}
	});
});


/**
 * 取消处理
 */
function group_cancel() {
	history.go(-1);
}

/**
 * 用户组表单提交处理
 */
function group_submit() {
	notice('edit_notice', img_loading_small, false);
	
	if (! $("input[name=groupname]").val()) {
		notice('edit_notice', img_delete + ' 请填写完所带红色星号的内容', true, 5000);
		return false;
	}
	
	var groupid = $("#groupid").val();
	
	var saveCallBack;
	if (groupid == '' || groupid == 0) {
		saveCallBack = group_save_added;
	} else {
		$("#edit_form").attr("action", "/admin/group/edit");
		saveCallBack = group_save_edited;
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
 * 添加用户组成功，返回处理
 */
function group_save_added(data, textStatus) {
    if(data.status === 0) {
        notice('edit_notice', img_done + ' 添加用户组成功!', true, 5000);
        
        // 判断是否返回用户组列表管理
        if (back_listing == true) {
        	history.back(-1);
        }
    } else {
    	notice('edit_notice', img_delete + " " + data.error, true, 5000);
    }
}

/**
 * 编辑用户组成功，返回处理
 */
function group_save_edited(data, textStatus) {
    if (data.status === 0) {
        notice('edit_notice', img_done + ' 编辑成功!', true, 5000);
        history.back(-1);
    } else {
    	notice('edit_notice', img_delete + " " + data.error, true, 5000);
    }
}