javascript:(function() {
    var iframes = document.getElementsByTagName('iframe');
    if (iframes.length === 0) {
        alert('No iframe tags found on this page.');
        return;
    }
    
    var output = '';
    var iframesProcessed = 0;

    function displayNewWindow() {
        var newWindow = window.open("", "_blank");
        newWindow.document.write('<html><head><title>Iframe Contents</title></head><body>' + output + '</body></html>');
        newWindow.document.close();
    }

    function processIframeContent(iframe, index) {
        var src = iframe.src;
        var iframeContentText = '<div><strong>Content of iframe ' + (index + 1) + ':</strong></div>';
        if (src) {
            fetch(src)
                .then(function(response) {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('Failed to load iframe content. Status: ' + response.status);
                    }
                })
                .then(function(data) {
                    output += iframeContentText;
                    output += '<iframe src="' + src + '" style="width: 100%; height: 400px; border: 1px solid black;"></iframe>';
                    output += '<pre>' + data.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre><hr>';
                    iframesProcessed++;
                    if (iframesProcessed === iframes.length) {
                        displayNewWindow();
                    }
                })
                .catch(function(error) {
                    output += iframeContentText;
                    output += '<iframe src="' + src + '" style="width: 100%; height: 400px; border: 1px solid black;"></iframe>';
                    output += '<pre>URL: ' + src + '</pre><hr>';
                    iframesProcessed++;
                    if (iframesProcessed === iframes.length) {
                        displayNewWindow();
                    }
                });
        } else {
            output += iframeContentText;
            output += '<div><strong>This iframe does not have a src attribute.</strong></div><hr>';
            iframesProcessed++;
            if (iframesProcessed === iframes.length) {
                displayNewWindow();
            }
        }
    }

    for (var i = 0; i < iframes.length; i++) {
        processIframeContent(iframes[i], i);
    }
})();
