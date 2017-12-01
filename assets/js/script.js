//let url = "https://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles=";
let url = "https://en.wikipedia.org/w/api.php";

$(document).ready(function () {

	const loader = $("#loader");
	const errbox = $("#error-box");

	$("#searchbutton").click(inputEnter);

	$("#searchbox").on('keyup', function (e) {
		if (e.keyCode == 13) {
			inputEnter();
		}
	});

	function inputEnter() {

		if (!$("#searchbox").val().length) {
			$("#error-mess").text("Please fill the search bar...");
			show(errbox);
			return;
		}

		hideAll();
		loader.show();
		hide(errbox);

		let data = {
			action: "query",
			format: "json",
			prop: "revisions",
			rvprop: "content",
			titles: $("#searchbox").val()
		};

		$.ajax({
			url: url,
			type: 'GET',
			crossDomain: true,
			dataType: 'jsonp',
			data: data,
			success: handleData,
			error: function (xhr, status, error) {
				$("#error-mess").text(error);
				show(errbox);
				loader.hide();
			}
		});
	}

	function hideAll() {
		$("#main-content").hide();
	}

	function showAll() {
		$("#main-content").show();
	}

	function handleData(data) {
		const title = data.query.pages[Object.keys(data.query.pages)[0]].title;
		$("#main-content").html('');
		$("#main-content").append(`<div class="content">
		<a href="http://wikipedia.org/wiki/${title}">${title}</a></div>
		<iframe id="my-frame" src="http://wikipedia.org/wiki/${title}"  />`);
		showAll();
		document.getElementById("my-frame").onload = function(){
			loader.hide();
		};
	}

	function hide(elem) {
		elem.css('visibility', 'hidden');
	}

	function show(elem) {
		elem.css('visibility', 'visible');
	}
});