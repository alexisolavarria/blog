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

});
