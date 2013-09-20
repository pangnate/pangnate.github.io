
var ui = (function($){


	// 回到顶部
	var backTop = function(){
		$("#back_top").click(function(){
			if($("html, body").is(":animated")){
				return false;
			}
			$("html, body").animate({scrollTop:0});
		});
	};
	
	// 左侧菜单滑动
	var swipeMenu = function(){
		var swipeFlag = false;
		var navigation = $(".navigation");
		var main = $(".main");
		var icon = $(".show-menu");

		var show = function(){
			navigation.show().stop().animate({left:240}, 400);
			main.stop().animate({left:240}, 400);
			swipeFlag = true;
		};

		var close = function(){
			navigation.show().stop().animate({left:0}, 400, function(){
				navigation.hide();
			});
			main.stop().animate({left:0}, 400);
			swipeFlag = false;
		};

		icon.click(function(){
			if(!swipeFlag){
				show();
			} else {
				close();
			}
		});

		$(window).resize(function(){
			var _width = $(window).width();
			if(_width>800){
				navigation.show().stop().animate({left:0}, 400);
				main.stop().animate({left:0}, 400);
				swipeFlag = false;
			}
		});

	};

	// 翻页
	var pageNav = function(){
		$(".nav").find(".arr").hover(function(){
			console.log(1);
			$(this).siblings(".pager-title").find("a").hover();
		});
	};

	return {
		backTop : backTop,
		swipeMenu : swipeMenu,
		pageNav : pageNav
	};

})(jQuery);




$(function(){

	ui.backTop();
	ui.swipeMenu();
	ui.pageNav();

});