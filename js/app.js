    var defaultDuration = 1000 // ms
    var edgeOffset = 10 // px
    zenscroll.setup(defaultDuration, edgeOffset)

    $(document).ready(function(){
        var kaomoji=0;
				$(".table").click(function(){
					kaomoji++;
					if(kaomoji == 5){
		      	kaomoji=1;
					}
					if(kaomoji == 1){
					  $(".table").html("(¬‿¬)");
					}
					if(kaomoji == 2){
					  $(".table").html("(-‿◦)");
					}
					if(kaomoji == 3){
					  $(".table").html("(＠＾◡＾)");
					}
					if(kaomoji == 4){
					  $(".table").html("(＾▽＾)");
					}
				});
      $("#open-menu-btn").click(function(){
        $("#menu-cnt")
        .removeClass("lg1:-right-20/100 sm1:-right-25/100 -right-1/3")
        .addClass("right-0");
      });
      $("#close-menu-btn, #menu-cnt li").click(function(){
        $("#menu-cnt")
        .removeClass("right-0")
        .addClass("lg1:-right-20/100 sm1:-right-25/100 -right-1/3");
      });
        if(window.innerWidth >= 700){
          $(".windows-group > div:nth-child(1), .windows-group > div:nth-child(2),      .info-odd-bg, .info-even-bg")
          .removeAttr("style");
        }
        if(window.innerWidth < 700){
          $(".windows-group > div:nth-child(1)")
          .css({"width": `${$(window).width()*20/100}px`
               ,"height": `${$(window).width()*20/100}px`});
          $(".windows-group > div:nth-child(2)")
          .css({"width": `${$(window).width()*13.34/100}px`
               ,"height": `${$(window).width()*13.34/100}px`});
          $(".info-odd-bg")
          .css({"height": `${$(".info-odd-bg").outerWidth()*2/3}px`});
          $(".info-even-bg")
          .css({"height": `${$(".info-even-bg").outerWidth()*45/100}px`});
        }
      $(window).resize(function(){
        if(window.innerWidth >= 700){
          $(".windows-group > div:nth-child(1), .windows-group > div:nth-child(2),      .info-odd-bg, .info-even-bg")
          .removeAttr("style");
        }
        if(window.innerWidth < 700){
          $(".windows-group > div:nth-child(1)")
          .css({"width": `${$(window).width()*20/100}px`
               ,"height": `${$(window).width()*20/100}px`});
          $(".windows-group > div:nth-child(2)")
          .css({"width": `${$(window).width()*13.34/100}px`
               ,"height": `${$(window).width()*13.34/100}px`});
          $(".info-odd-bg")
          .css({"height": `${$(".info-odd-bg").outerWidth()*2/3}px`});
          $(".info-even-bg")
          .css({"height": `${$(".info-even-bg").outerWidth()*45/100}px`});
        }
      });
      $("#open-puzzle-menu-btn").click(function(){
        $("#puzzle-menu-cnt")
        .removeClass("lg1:-right-20/100 sm1:-right-25/100 -right-1/3")
        .addClass("right-0");
      });
      $("#close-puzzle-menu-btn, #puzzle-menu-cnt li").click(function(){
        $("#puzzle-menu-cnt")
        .removeClass("right-0")
        .addClass("lg1:-right-20/100 sm1:-right-25/100 -right-1/3");
      });
      $("#open-modal-btn, #puzzle-menu-cnt li:first-child").click(function(){
        $("body").addClass('overflow-hidden');
        $("#modal-cnt").removeClass("hidden");
        $("#modal-cnt").addClass("block");
      });
      $("#close-modal-btn").click(function(){
        $("body").removeClass('overflow-hidden');
        $("#modal-cnt").removeClass("block");
        $("#modal-cnt").addClass("hidden");
      });	

    });