$(document).ready(function() {
	refreshListing();
	
	/**
     * 定位页面导航信息 - 临时使用
     */
    navLocating(7, 0);
	
    /**
	 * 刷新或搜索
	 */
	$('body').delegate('.action-refresh', 'click', function(){
		$('#app_listing').datagrid('reload');
	});
	
	/**
	 * 搜索对回车的支持
	 */
	$("input[name=key]").on('keypress', function (event) {
	    if (event.which == '13' && $(this).val()) {
	    	$('#app_listing').datagrid('reload');
	    }
	});
	
	/**
	 * 编辑按钮处理
	 */
	$(".operate-edit").click(function(){
		var appkey = $(this).parent().parent().attr("appkey");
		var href = "/admin/app/edit?loadtype=ajax&appkey=" + appkey;
		$.history.load(href);
	});
	
	/**
	 * 设置权限
	 */
	$(".operate-permission-assign").click(function(){
		var appkey = $(this).parent().parent().attr("appkey");
		var href = "/admin/permissionassign/assign?loadtype=ajax&appkey=" + appkey;
		$.history.load(href);
	});
	
	/**
	 * 删除模块
	 */
	$(".operate-delete").click(function(){
		var obj_tr = $(this).parent().parent();
		var appkey = obj_tr.attr('appkey');
		
		var str_confirm = '确定要删除该模块吗？';
		if (! confirm(str_confirm)) {
			return false;
		}
		
		$.ajax({
	    	type:'post',
	        url:'/admin/app/deleteapp',
	        data:'appkey=' + appkey,
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
});


function refreshListing() {
	/* fuelux datagrid */
	var DataGridDataSource = function (options) {
	    this._formatter = options.formatter;
	    this._columns = options.columns;
	    this._delay = options.delay;
	};
	
	DataGridDataSource.prototype = {
	    columns: function () {
	        return this._columns;
	    },
	    data: function (options, callback) {
	        var url = '/admin/app';
	        var self = this;
	        
	        setTimeout(function () {
	
	            var data = $.extend(true, [], self._data);
	
	            $.ajax(url, {
	                data: {
	                	rstype:"json",
	                	pageIndex: options.pageIndex,
	                    pageSize: options.pageSize,
	                    key:$('input[name=key]').val()
	                },
	                dataType: 'json',
	                async: true,
	                type: 'GET'
	            }).done(function (response) {
	            	var data = response.data.apps;
                    if (! data) {
                    	return false;
                    }

                    var count=response.data.count;//设置data.total
                    // PAGING
                    var startIndex = options.pageIndex * options.pageSize;
                    var endIndex = startIndex + options.pageSize;
                    var end = (endIndex > count) ? count : endIndex;
                    var pages = Math.ceil(count / options.pageSize);
                    var page = options.pageIndex + 1;
                    var start = startIndex + 1;

                    if (self._formatter) self._formatter(data);

                    callback({ data: data, start: start, end: end, count: count, pages: pages, page: page });
                }).fail(function (e) {

                });
	        }, self._delay);
	    }
	};
	
	$('#app_listing').datagrid({
	    dataSource: new DataGridDataSource({
	        // Column definitions for Datagrid
	        columns: [
	            {
	                property: 'checkbox',
	                label: '<input type="checkbox" />'
	            },
	            {
	            	property: 'a',
	            	label: ''
	            },
	            {
	                property: 'appkey',
	                label: 'appkey',
	                sortable: true
	            },
	            {
	                property: 'name',
	                label: '模块名',
	                sortable: false
	            },
	            {
	                property: 'appsecret',
	                label: '密钥',
	                sortable: false
	            },
	            {
	            	property: 'action',
	            	label: '操作',
	            	sortable: false
	            }
	        ],
	        formatter: function (items) {
	            $.each(items, function (index, item) {
	            	item.checkbox = '<input type="checkbox" name="post[]" class="select-single" value="' + item.appkey + '">';
	            	item.a = '<a href="/casadmin/index/detail/?appkey=' + item.appkey + '" data-toggle="ajaxModal" class="modal-detail"><i class="fa fa-search-plus"></i></a>';
	                item.status = item.status == 1 ? '<i class="fa fa-check text-success" title="已激活"></i>' : '<i class="fa fa-ban text-danger" title="未激活"></i>';
	                item.setting_auth = '<a href="javascript:;" class="action-rpw" appkey="' + item.appkey + '" data-toggle="modal" data-target="#modal"><i class="fa fa-gear"></i></a>'; 
	                item.action = '<a href="/admin/app/edit?appkey=' + item.appkey + '" class="load-content" title="编辑"><i class="fa fa-pencil"></i></a>&nbsp;&nbsp;' + 
							'<a href="javascript:;" class="operate-delete" id="appkey_' + item.appkey + '" appkey="' + item.appkey + '" title="删除"><i class="fa fa-times"></i></a>';
	            });
	        }
	    }),
	    loadingHTML: '<span><img src="/static/panel/img/loading.gif"><i class="fa fa-info-sign text-muted" "></i>正在加载……</span>',
	    itemsText: '项',
	    itemText: '项',
	    dataOptions: { pageIndex: 0, pageSize: 15 }	
	});
}