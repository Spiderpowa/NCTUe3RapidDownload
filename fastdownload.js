var disable_download_popup = function(){
	var links = $('a[id$="_lnkFile"]')
	$.each(links, function(){
		var obj = $(this);
		var data = obj.attr('onclick');
		if(!data || !data.length)return;
		var id_regex = /(\=[a-z0-9\-]+)/;
		var ids = ['AttachMediaId', 'CourseId'];
		var url = 'common_get_content_media_attach_file.ashx?StudyLog=1';
		for(var i=0; i<ids.length; ++i){
			var extract_id = id_regex.exec(data)[1];
			url += '&' + ids[i] + extract_id;
		}
		obj.attr('href', url);
		obj.attr('onclick', null);
	});
}
disable_download_popup();
$('body').bind("DOMSubtreeModified", function() {
    disable_download_popup();
});