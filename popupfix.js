var links = $('td[onclick$="linkFilePreview\').onclick()"]');
$.each(links, function(){
	var obj = $(this);
	var data = obj.attr('onclick');
	obj.attr('onclick',	data.replace(/onclick\(\)$/, 'click()'));
});
