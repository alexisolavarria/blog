$(document).ready(function() {

	$(function () {
  	$('[data-toggle="tooltip"]').tooltip()
	});

	$(function () {
		$('#wrapper').addClass('dark');

		$("#mode_toggle").html('Dark Mode');
		$("#mode_toggle").attr('data-mode', 'dark');
		$("#mode_toggle").removeClass('btn-light').addClass('btn-dark');

		$('nav').removeClass('bg-light').removeClass('navbar-light').addClass('bg-dark').addClass('navbar-dark');

		$('.card').addClass('dark');
		$('.card-title').addClass('dark');
		$('.card-text').addClass('dark');
	});

	$("#mode_toggle").on("click", function(e) {
		var mode = $(this).attr('data-mode');

		if (mode == 'light') {
			$('#wrapper').addClass('dark');

			$(this).html('Dark Mode');
			$(this).attr('data-mode', 'dark');
			$(this).removeClass('btn-light').addClass('btn-dark');

			$('nav').removeClass('bg-light').removeClass('navbar-light').addClass('bg-dark').addClass('navbar-dark');

			$('.card').addClass('dark');
			$('.card-title').addClass('dark');
			$('.card-text').addClass('dark');
		} else {
			$('#wrapper').removeClass('dark');

			$(this).html('Light Mode');
			$(this).attr('data-mode', 'light');
			$(this).removeClass('btn-dark').addClass('btn-light');

			$('nav').removeClass('bg-dark').removeClass('navbar-dark').addClass('bg-light').addClass('navbar-light');

			$('.card').removeClass('dark');
			$('.card-title').removeClass('dark');
			$('.card-text').removeClass('dark');
		}
	});

	$(".tag_button").on("click", function(e) {
		$(".tag_button").removeClass('btn-primary').removeClass('btn-outline-primary').addClass('btn-outline-primary');
		$(".post").hide();

    var tag = $(this).attr("id");
		$("."+tag).addClass('btn-primary').removeClass('btn-outline-primary');
		$("."+tag+"_tag").show();
	});

	$("#search-box").on('keyup', function(e) {
		var content = $(this).val();
		var text_to_search = document.getElementsByClassName('text-to-search');

		$(text_to_search).each(function(index, val) {
			$(text_to_search[index]).show();
			if ($(text_to_search[index]).html().toLowerCase().indexOf(content.toLowerCase()) == -1) {
				$(text_to_search[index]).hide();
			}
		})
	});

});
