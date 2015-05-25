/* Javascript for JennystartXBlock. */
function JennystartXBlock(runtime, element) {

    function updateCount(result) {
        $('.count', element).text(result.count);


    }

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');
    var editor
    $('p', element).click(function(eventObject) {
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success: updateCount
        });
    });

    $('.cancel',element).click(function(eventObject){
        editor.setValue("");
    });
    $('.save',element).click(function(eventObject){
        alert( editor.getValue());
    });

    $(function ($) {
        /* Here's where you'd do things on page load. */
        editor = CodeMirror.fromTextArea(document.getElementById("code"), {
            lineNumbers: true,
            styleActiveLine: true,
            matchBrackets: true,
            mode: "text/x-c++src",
            extraKeys: {
                "F11": function(cm) {
                    cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                },
                "Esc": function(cm) {
                    if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                }
            }


        });

        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"hello": "world"}),
            success:function(data){editor.setValue(data.codeData);}
        });

    });
}

