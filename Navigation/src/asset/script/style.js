$(function(){

    function init(){
         $(".search_list").find("span").addClass("none");
         $('.pop').addClass("none");
    }

    init()


    var editable = false;
    var idx = 0;
    localStorage.setItem("order",0);
    var order = localStorage.getItem("order");

    $(".confirm_box").on("click", ".confirm", confirm_mod)
                    .on("click", ".cancel",cancel_mod);


    function confirm_mod(obj){
        //可编辑状态
        $(".pop").addClass("none");
        var name = $(this).parent(".confirm_box").siblings("#name").val();
        var url = $(this).parent(".confirm_box").siblings("#url").val();
        var description = $(this).parent(".confirm_box").siblings("#description").val();
        var oli = '<span class="del icon-del1"></span><a href="'+ url +'" class="link_name"><span href="###" class="modify icon-modify"></span>'+ name +'</a>'
        if(!name || !url)return ;

        if(!editable){//添加
            $('<li data-order="'+ order +'">'+oli+'</li>').appendTo($(".search_list"));
            $(".search_list").find("span").addClass("none");
            localStorage.setItem("list"+order, description);
            order++;
        }else{//修改
            $(".search_list li").eq(idx).html(oli);
            localStorage.setItem("list"+order, description);
        }
        console.log(localStorage.getItem("list"+order),order);
        setDefault();
    }     

    function setDefault(){
        $(".pop").addClass("none");
        $("#name").val("");
        $("#url").val("");
        $("#description").val("请输入关键字");
    }

    function cancel_mod(){
        $(".pop").addClass("none");
    }        


    $(".list_set").on("click", ".add_list", add_list)
                .on("click", ".edit_list", edit_list)
                .on("click", ".complete", hide_operate)                
    //添加一项
    function add_list(e){
        $(".pop").removeClass("none");

    }
    //显示操作按钮
    function edit_list(e){
        $(".search_list").find("span").removeClass("none");
        $(this).parent().parent(".mod_list").addClass("none").siblings("a").removeClass("none");
    }

    function hide_operate(e){
        $(".search_list").find("span").addClass("none");
        $(this).addClass("none").siblings().removeClass("none");
    }

    //删除和修改按钮
    $(".search_list").on('click',".del", del_list)
                    .on("click", '.modify', modify_list);

    function del_list(){
        $(this).parent("li").remove();
    }  

    function modify_list(e){
        $(".pop").removeClass("none");
        editable = true;
        order = $(this).data("order");
        idx = $(".search_list li").index($(this).parent().parent("li"));
        $("#name").val($(this).parent("a").text());
        $("#url").val($(this).parent("a").attr("href"));
        // $("#description").val($(this).parent("a").attr("href"));
        // console.log(idx);
    }     

    $(document).on("focus", "#description", function(){
        if($(this).val() == "请输入关键字"){
            $(this).val("");
        }
    }).on("blur", "#description", function(){
        if(!$("#description").val())$(this).val("请输入关键字");       
    })          
})


















