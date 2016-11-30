$(function(){
	console.log(localStorage.getItem("list_data"));
	var list_data = localStorage.getItem("list_data") ? JSON.parse(localStorage.getItem("list_data")) : {};
	var list_num = localStorage.getItem("list_num")|| 0;
	var idx = 0;
	var editable = false;
	


	function init(){
         $(".search_list").find("span").addClass("none");
         $('.pop').addClass("none");
         init_list(list_data);//初始化渲染导航列表
         init_item(list_data);
    }
    init();//初始化

    function init_list(obj){//初始化渲染导航列表
    	$(".search_list").empty()
    	for (key1 in obj){
    		console.log(key1);
    		$('<li data-order="'+ key1 +'"><span class="del icon-del1"></span><a href="'+ obj[key1].url +'" class="link_name"><span class="modify icon-modify"></span>'+ obj[key1].name +'</a></li>').appendTo($(".search_list"));
    	}
    	$(".search_list").find('span').addClass("none");
    }

    function init_item(obj){
    	//此处渲染分类列表
    	var des_arr = [];
    	for(key in obj){
    		var keystr = obj[key].des;
    		$.each(keystr, function(idx, val){    			
    			if(des_arr.indexOf(val) == -1)des_arr.push(val);
    		})
    	}
    	if(des_arr.length!=0){
    		$(".item_list").empty();
    		$.each(des_arr, function(idx, val){
	    		$('<li><a href="###" class="item_name">'+ val +'</a></li>').appendTo($(".item_list"));
	    	})
	    	console.log(des_arr);
    	}  	
    }

    $(".pop").on("click", ".confirm", confirm_mod)
    		 .on("click", ".cancel", cancel_mod)
    		 .on("focus", "#description", function(){
    		 	if($(this).val() == "请输入关键字")$(this).val("");	            		        
		    }).on("blur", "#description", function(){
		    	if(!$("#description").val())$(this).val("请输入关键字");       
		    });

	$(document).on('click', ".del", del_list)
               .on("click", ".modify", modify_list)	
               .on("click", ".add_list", add_list)
               .on("click", ".edit_list", edit_list)
               .on("click", ".complete", hide_operate)
               .on("click", ".search_btn",search)
               .on("keydown", "#MySearch", MySearch);  	    

    function confirm_mod(){//确认按钮

    	var order = editable ? $(".search_list li").eq(idx).data("order") : "order"+list_num;
    	list_data[order] = {};
    	var name = $("#name").val();
    	var url = $("#url").val();
    	var des = $("#description").val();
    	var oli = null;   	

    	if(!name || !url){
    		$(".pop").addClass("none");
    		return 
    	};	//保证名字和地址
    	
    	list_data[order].name = name;
    	list_data[order].url = url;
    	list_data[order].des = des.split(' ');
    	console.log(list_data[order].des,des);
    	oli = '<span class="del icon-del1"></span><a href="'+ url +'" class="link_name"><span class="modify icon-modify"></span>'+ name +'</a>'

    	if(!editable){
	    	$('<li data-order="order'+ list_num +'">'+oli+'</li>').appendTo($(".search_list"));
	    	$(".search_list").find("span").addClass("none");
	    	list_num++;
	    	localStorage.setItem("list_num", list_num);
    	}else{

    		$(".search_list").find("li").eq(idx).empty();
    		$(oli).appendTo($(".search_list").find("li").eq(idx));
    	}

    	localStorage.setItem("list_data",JSON.stringify(list_data));
    	init_item(list_data);
    	setDefault();
    	console.log(list_data, localStorage.getItem("list_data"));
    }  

    function cancel_mod(){//取消按钮
    	$(".pop").addClass("none");
    	setDefault();
    }   

    function del_list(){//删除本条
    	var order = $(this).parent("li").data("order");
    	delete list_data[order];
    	localStorage.setItem("list_data",JSON.stringify(list_data));
		$(this).parent("li").remove();
		console.log(list_data, localStorage.getItem("list_data"));
    }   

    function modify_list(e){//修改本条
    	e.preventDefault();
    	editable = true;
    	idx = $(".search_list .modify").index($(this));
    	console.log(idx);
    	$(".pop").removeClass("none");
    	var order = $(this).parent().parent("li").data("order");
        $("#name").val(list_data[order].name);
    	$("#url").val(list_data[order].url);
    	$("#description").val(list_data[order].des);
    }   

    function add_list(){//添加一条
    	$(".pop").removeClass("none");
    }

    function edit_list(){//编辑    	
    	$(".search_list").find("span").removeClass("none");
        $(this).parent().parent(".mod_list").addClass("none").siblings("a").removeClass("none");
    }

    function hide_operate(){//修改完毕
    	$(".search_list").find("span").addClass("none");
        $(this).addClass("none").siblings().removeClass("none");
    }

    function setDefault(){
    	$(".pop").addClass("none");
        $("#name").val("");
        $("#url").val("");
        $("#description").val("请输入关键字");
    }

    function search(){
    	window.location.href="https://www.baidu.com/s?wd="+$("#MySearch").val();
    }

    function MySearch(e){
    	if(e.keyCode == 13){
    		$(".search_btn").trigger("click");
    	}
    }
})