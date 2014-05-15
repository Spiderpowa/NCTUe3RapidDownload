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

    preview_link(newObj);
  });
}
var preview_link = function(obj){
  var preview_db = [
   [/pdf$/i, 'http://docs.google.com/viewer?url='],
   [/(pptx?|docx?|xlsx?)$/i, 'http://view.officeapps.live.com/op/view.aspx?src=']
  ];
  for(var i=0; i<preview_db.length; ++i){
    var file_type = preview_db[i][0].exec(obj.text());
    if(file_type === null)continue;
    $('<a>').
      attr('href', preview_db[i][1] + 
         encodeURIComponent( 'http://e3.nctu.edu.tw/NCTU_EASY_E3P/LMS2/' + obj.attr('href'))).
      attr('target', '_viewer' + Math.floor(Math.random()*10000)).
      css('margin-left', '10px').
      append('View').
      insertAfter(obj);
    break;
  }
}


disable_download_popup();
setTimeout(disable_download_popup, 1000);
var b = document.getElementsByTagName('body')[0];
var observer = new window.MutationObserver(function(mutationRecord, observer){
  disable_download_popup();
});
observer.observe(b, {childList:true, subtree:true});

