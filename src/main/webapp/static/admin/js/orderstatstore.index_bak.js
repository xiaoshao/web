$(document).ready(function() {
	refreshListing();
	
    /**
     * 刷新或搜索
     */
    $(".action-refresh, #action_search").on('click', function(){
    	$('#content_listing').datagrid('reload');
    });
    
    /**
	 * 关键字搜索 - 支持回车
	 */
    $("input[name=key]").on('keypress', function (event) {
	    if (event.which == '13') {
	    	$('#content_listing').datagrid('reload');
	    }
	});
});


/**
 * datagrid 加载列表
 */
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
	        var url = '/admin/orderStatStore';
	        var self = this;
	        
	        setTimeout(function () {
	        	
	            var data = $.extend(true, [], self._data);
	            //alert(data);
	            $.ajax(url, {
	                data: {
	                	rstype:"json",
	                	pageIndex: options.pageIndex,
	                    pageSize: options.pageSize,
	                    key:$("input[name='key']").val(),
	                    ctime_start:$("input[name='ctime_start']").val(),
	                    ctime_end:$("input[name='ctime_end']").val(),
	                    order_type:2,
	                    order_status:$("select[name='order_status']").val(),
	                    pay_status:$("select[name='pay_status']").val()
	                },
	                dataType: 'json',
	                async: true,
	                type: 'GET'
	            }).done(function (response) {
	            	//alert("success ajax");
	            	var data = response.data.stores;
	            	//alert(data);
                    if (! data) {
                    	//alert("sucess ajax data is null");
                    	return false;
                    }

                    var count=response.data.count;//设置data.total
                    var total_amount=response.data.total_amount;//设置data.total_amount
                    // PAGING
                    var startIndex = options.pageIndex * options.pageSize;
                    var endIndex = startIndex + options.pageSize;
                    var end = (endIndex > count) ? count : endIndex;
                    var pages = Math.ceil(count / options.pageSize);
                    var page = options.pageIndex + 1;
                    var start = startIndex + 1;

                    if (self._formatter) self._formatter(data);

                    callback({ data: data, start: start, end: end, count: count, pages: pages, page: page,total_amount:total_amount });
                }).fail(function (e) {
                	//alert("ajax错误！");
                });
	            
	        }, self._delay);
	    }
	};
	
	$('#content_listing').datagrid({
	    dataSource: new DataGridDataSource({
	        // Column definitions for Datagrid
	        columns: [
	            {
	                property: 'store_name',
	                label: '店铺名称',
	                sortable: false
	            },
	            {
	                property: 'ctime_start',
	                label: '起始时间',
	                sortable: false
	            },
	            {
	                property: 'ctime_end',
	                label: '结束时间',
	                sortable: false
	            },
	            {
	                property: 'pay_status',
	                label: '支付状态',
	                sortable: false
	            },
	            {
                property: 'order_status',
                label: '订单状态',
                sortable: false
	    		},
	            {
	                property: 'tel',
	                label: '联系方式',
	                sortable: false
	            },
	            {
	            	property: 'total_amount',
	            	label: '订单金额',
	            	sortable: false
	            }
//	            {
//	            	property: 'operate',
//	                label: '操作'
//	            }
	        ],
	        formatter: function (items) {
	        	/* 定义订单状态 */
	        	var order_status = new Array();
	        	order_status[0] = '待审核';
	        	order_status[1] = '已完成';
	        	order_status[2] = '已关闭';
	        	order_status[3] = '待付款';
	        	order_status[4] = '待送餐';
	        	order_status[5] = '已送餐';
	        	order_status[6] = '待退款';
	        	order_status[7] = '已退款';
	        	
	            $.each(items, function (index, item) {
	            	item.order_type = item.order_type == 1 ? '订餐' : '外卖';
	            	//alert(item.order_status);
	            	var order_status_val = item.order_status;
	            	item.order_status = order_status[order_status_val];
	            	
	            	item.pay_status = item.pay_status == 1 ? '<i class="fa fa-check text-success"></i>' : '<i class="fa fa-ban text-danger"></i>';
	            	/*
	            	var str_operate = '';
	            	if (order_status_val == 0 || order_status_val == 3) {
	            		str_operate += '<a href="javascript:;" class="operate-close" id="operate_close_' + item.order_id + '" order_id="' + item.order_id + 
            					'" data-toggle="modal" data-target="#modal" title="关闭"><i class="fa fa-ban"></i></a>&nbsp;&nbsp;';
	            	}
	            	if (order_status_val == 0 || order_status_val == 2 || order_status_val == 3) {
	            		str_operate += '<a href="javascript:;" class="operate-delete" order_id="' + item.order_id + '" title="删除"><i class="fa fa-trash-o"></i></a>';
	            	}*/
//	            	item.operate = str_operate ? str_operate : '无';
	            });
	        }
	    }),
	    loadingHTML: '<span><img src="/static/panel/img/loading.gif"><i class="fa fa-info-sign text-muted" "></i>正在加载……</span>',
	    itemsText: '项',
	    itemText: '项',
	    dataOptions: { pageIndex: 0, pageSize: 15 }	
	});
}