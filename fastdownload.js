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
		console.log(data);
		if(!data || !data.length || !data.match(/AttachMediaId/))return;
		var id_regex =  /(AttachMediaId|CourseId)(\=[a-z0-9\-]+)/gi;
		var ids = ['AttachMediaId', 'CourseId'];
		var url = 'common_get_content_media_attach_file.ashx?StudyLog=1';
		for(var i=0; i<ids.length; ++i){
			var extract_id = id_regex.exec(data)[2];
			url += '&' + ids[i] + extract_id;
		}
		obj.attr('href', url);
		obj.attr('onclick', null);

		//console.log(obj.text())
		var file_type_regex = /pdf$/i;
		if( file_type_regex.exec(obj.text()) )
		{
			$('<a>').
				attr('href', 'http://docs.google.com/viewer?url=' + 
					 encodeURIComponent( 'http://e3.nctu.edu.tw/NCTU_EASY_E3P/LMS2/' + url)).
				attr('target', '_black').
				css('margin-left', '10px').
				append('View').
				insertAfter(obj);
		}
	});
}
disable_download_popup();
var b = document.getElementsByTagName('body')[0];
var observer = new window.MutationObserver(function(mutationRecord, observer){
	disable_download_popup();
});
observer.observe(b, {childList:true, subtree:true});
