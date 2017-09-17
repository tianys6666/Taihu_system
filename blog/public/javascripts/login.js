$(function () {
   $('#mylogin').click(function(){

    var tem={};
    tem.username=$("#usernamelogin").val();
   tem.password=$("#passwordlogin").val();
    console.log("gfajkdhfa");
    // var ee=JSON.stringify(temp);
    // alert(ee);
        $.ajax({
            type:"post",
            url:"/login",
            async:true,
            data:JSON.stringify(tem),
            contentType: "application/json",
            dataType:"json",
            success:function(data){
            	console.log(data);
                /* if(data){
               if(data.message=="false"){
                  // alert('密码错误，请重新输入');
                   //window.location.href="login";
               }else{
                  console.log(data);
                   //alert('登陆成功');
                   //window.location.href="index";
               }
            }*/
            },
            error:function(err){
                console.log(err);
            },
        });
    });
});
