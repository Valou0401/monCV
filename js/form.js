$(function() {
	

	var inputs = $('.input');
	var paras = $('.description-flex-container').find('p');
	inputs.click(function(){
		var t = $(this),
				ind = t.index(),
				matchedPara = paras.eq(ind);
		
		t.add(matchedPara).addClass('active');
		inputs.not(t).add(paras.not(matchedPara)).removeClass('active');
	});
	
		// Wrap every letter in a span
	var textWrapper = document.querySelector('.ml11 .letters');
	textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

	anime.timeline({loop: true})
	  .add({
		targets: '.ml11 .line',
		scaleY: [0,1],
		opacity: [0.5,1],
		easing: "easeOutExpo",
		duration: 700
	  })
	  .add({
		targets: '.ml11 .line',
		translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
		easing: "easeOutExpo",
		duration: 700,
		delay: 100
	  }).add({
		targets: '.ml11 .letter',
		opacity: [0,1],
		easing: "easeOutExpo",
		duration: 600,
		offset: '-=775',
		delay: (el, i) => 34 * (i+1)
	  }).add({
		targets: '.ml11',
		opacity: 0,
		duration: 1000,
		easing: "easeOutExpo",
		delay: 1000
	  });

	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('bg-danger');
			$(formMessages).addClass('bg-success');

			// Set the message text.
			$(formMessages).text('Your message successfully sent');

			// Clear the form.
			$('#name, #email, #message').val('');			
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('bg-success');
			$(formMessages).addClass('bg-danger');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});