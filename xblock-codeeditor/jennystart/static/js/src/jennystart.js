/* Javascript for JennystartXBlock. */
function JennystartXBlock(runtime, element) {


    

    var handlerUrl = runtime.handlerUrl(element, 'increment_count');
    var saveHandlerUrl = runtime.handlerUrl(element, 'save_file');
    var commitHandlerUrl = runtime.handlerUrl(element, 'commit_to_git');
    var editor;

    function commitCallBack(result){
     alert(result.messege);
    }
    function saveCallBack(result){

        var commit_messege=prompt("If you want to push the change to gitlab please input commit messege:","initialize commit");
        if (commit_messege!=null && commit_messege!="")

      {

        $.ajax({
            type: "POST",
            url: commitHandlerUrl,
            data: JSON.stringify({"commit_messege":commit_messege}),
            success:commitCallBack
        });

      }
    }

    $('.cancel',element).click(function(eventObject){
        editor.setValue("");
    });
    $('.save',element).click(function(eventObject){

        $.ajax({
            type: "POST",
            url: saveHandlerUrl,
            data: JSON.stringify({"codeData":editor.getValue()}),
            success:saveCallBack
        });

    });
    $('.read',element).click(function(eventObject){
        var relative_path = document.getElementById("relative_path").value;
      
        
        $.ajax({
            type: "POST",
            url: handlerUrl,
            data: JSON.stringify({"relative_path": relative_path}),
            success:function(data){editor.setValue(data.codeData);}
        });

    });
    
     $('.fullscreen',element).click(function(eventObject){
        var screen = document.getElementById("jennystart_block");
  
        if(screen.requestFullscreen){
            screen.requestFullscreen)();
         }
        else if (screen.mozRequestFullScreen){
           screen.mozRequestFullScreen();
         }
        else if (screen.webkitRequestFullscreen){
           screen.webkitRequestFullscreen();
        }

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


    });
}


