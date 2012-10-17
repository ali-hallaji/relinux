latesttweetid = "#latest-tweet";
twitterusername = "relinux";

// === CODE COPIED FROM TWITTER ===
function twitterCallback2(twitters)
{
	var statusHTML = [];
	console.log("WORKING")
	for ( var i = 0; i < twitters.results.length; i++)
	{
		var username = twitters.results[i].from_user;
		var status = twitters.results[i].text
				.replace(
						/((https?|s?ftp|ssh)\:\/\/[^"\s\<\>]*[^.,;'">\:\s\<\>\)\]\!])/g,
						function(url)
						{
							return '<a href="' + url + '">' + url + '</a>';
						}).replace(
						/\B@([_a-z0-9]+)/ig,
						function(reply)
						{
							return reply.charAt(0)
									+ '<a href="http://twitter.com/'
									+ reply.substring(1) + '">'
									+ reply.substring(1) + '</a>';
						});
		statusHTML.push('<p>&ldquo;' + status + '&rdquo; &ndash; <small>'
				+ relative_time(twitters.results[i].created_at) + '</small></p>');
	}
	//$(".loading").hide()
	console.log(statusHTML)
	//$(latesttweetid).append(statusHTML.join(''));
	$(".loading").fadeOut(750, function() {
		$(latesttweetid).append($(statusHTML.join('')).hide().fadeIn(750));
	})
}

function relative_time(time_value)
{
	var values = time_value.split(" ");
	//time_value = values[1] + " " + values[2] + ", " + values[5] + " "
	//		+ values[3];
	var parsed_date = Date.parse(time_value);
	var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
	delta = delta + (relative_to.getTimezoneOffset() * 60);

	if (delta < 60)
	{
		return 'less than a minute ago';
	} else if (delta < 120)
	{
		return 'about a minute ago';
	} else if (delta < (60 * 60))
	{
		return (parseInt(delta / 60)).toString() + ' minutes ago';
	} else if (delta < (120 * 60))
	{
		return 'about an hour ago';
	} else if (delta < (24 * 60 * 60))
	{
		return 'about ' + (parseInt(delta / 3600)).toString() + ' hours ago';
	} else if (delta < (48 * 60 * 60))
	{
		return '1 day ago';
	} else
	{
		return (parseInt(delta / 86400)).toString() + ' days ago';
	}
}

// === END CODE COPIED FROM TWITTER ===

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
	$.getScript('http://search.twitter.com/search.json?q=from:' + twitterusername
			+ '&callback=twitterCallback2&rpp=5');
}

$(document).ready(start);

function showhide(el)
{
	hidden = true;
	if (!($(el + " .hideme").hasClass("hidden")))
	{
		hidden = false;
	}
	$(el + " .hideme").toggleClass("hidden");
	if (hidden)
	{
		$(el + " .showhide").html("&laquo; Show less");
	} else
	{
		$(el + " .showhide").html("Show more &raquo;")
	}
}
