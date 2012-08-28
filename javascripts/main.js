function start()
{
	$(".navbar").scrollspy();
	$('[data-spy="scroll"]').each(function()
	{
		$(this).scrollspy('refresh');
	});
	$("ul.nav li a").hover(function()
	{
		$("#navbar-highlight-hover").show();
		$("#navbar-highlight-hover").css({
			"width" : $(this).outerWidth()
		});
		$("#navbar-highlight-hover").offset({
			"left" : $(this).offset().left
		});
	}, function()
	{
		$("#navbar-highlight-hover").hide();
	});
	$("ul.nav li").on("activate", function()
	{
		console.log("GOOD");
	});
	$("ul.nav li").trigger("activate");
}

$(document).ready(start);

function showhide(el)
{
	hidden = true
	if (!($(el + " .hideme").hasClass("hidden")))
	{
		hidden = false
	}
	$(el + " .hideme").toggleClass("hidden");
	if (hidden)
	{
		$(el + " .showhide").html("&laquo; Show less")
	} else
	{
		$(el + " .showhide").html("Show more &raquo;")
	}
}