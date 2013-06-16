var file_selectors = ['a[id$="_lnkFile"]', 'a[id$="_linkFilePreview"]'];
var disable_download_popup = function(){
	for(var i=0; i<file_selectors.length; ++i)
		disable_download_popup_sel(file_selectors[i]);
};
var disable_download_popup_sel = function(selector){
	var links = $(selector);
	$.each(links, function(){
		var obj = $(this);
		var data = obj.attr('onclick');
		if(!data || !data.length || !data.match(/^openDialog_hWin/))return;
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