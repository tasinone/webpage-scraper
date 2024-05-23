javascript:(function() {
    var iframes = document.getElementsByTagName('iframe');
    if (iframes.length === 0) {
        alert('No iframe tags found on this page.');
        return;
    }

    var output = '';
    for (var i = 0; i < iframes.length; i++) {
        var iframe = iframes[i];
        var src = iframe.src;
        if (src) {
            output += '<div><strong>Content of iframe ' + (i + 1) + ':</strong></div>';
            output += '<iframe src="' + src + '" style="width: 100%; height: 400px;"></iframe>';
            output += '<div>URL: <a href="' + src + '" target="_blank">' + src + '</a></div><hr>';
        } else {
            output += '<div><strong>iframe ' + (i + 1) + ' does not have a src attribute.</strong></div><hr>';
        }
    }

    var newWindow = window.open("", "_blank");
    newWindow.document.write('<html><head><title>Iframe Contents</title></head><body>' + output + '</body></html>');
    newWindow.document.close();
})();
