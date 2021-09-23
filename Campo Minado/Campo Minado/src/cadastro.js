$(document).ready(function(){
    function updateText(event){
      var input=$(this);
      setTimeout(function(){
        var val=input.val();
        if(val!="")
          input.parent().addClass("floating-placeholder-float");
        else
          input.parent().removeClass("floating-placeholder-float");
      },1)
    }
    $(".floating-placeholder input").keydown(updateText);
    $(".floating-placeholder input").change(updateText);
  });