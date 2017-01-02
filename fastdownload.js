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
    //console.log(data);
    if(!data || !data.length || !data.match(/AttachMediaId/))return;
    var ids = ['AttachMediaId', 'CourseId'];
    var url = 'common_get_content_media_attach_file.ashx?StudyLog=1';
    for(var i=0; i<ids.length; ++i){
      var id_regex = new RegExp('(' + ids[i] + '\=[a-z0-9\-]+)', 'gi');
      var extract_param = id_regex.exec(data)[1];
      url += '&' + extract_param;
    }
    obj.attr('href', url);

    // Make new object without onclick
    obj.removeAttr('onclick');
    var newObj = obj.clone();
    obj.after(newObj);
    obj.remove()
  });
}

disable_download_popup();
setTimeout(disable_download_popup, 1000);
var b = document.getElementsByTagName('body')[0];
var observer = new window.MutationObserver(function(mutationRecord, observer){
  disable_download_popup();
});
observer.observe(b, {childList:true, subtree:true});
