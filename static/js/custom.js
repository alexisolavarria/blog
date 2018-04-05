$(document).ready(function() {

	$(function () {
  	$('[data-toggle="tooltip"]').tooltip()
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
