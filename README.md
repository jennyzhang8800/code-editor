# code-editor
在线代码编辑器的代码仓库

一、文件说明：

1.xblock-codeeditor包含在线代码编辑器xblock。

  （1）setup.py：xblock的安装文件
  
  （2）jennystart文件夹中
  
       jennystart.py：定义了student_view函数以及若干XBlock.json_handler
       
       lib_util.py:定义了加载资源的函数load_resource(),以及日志函数uc_logger()
       
       _init_.py:xblock自动生成的初始化脚本
       
       static文件夹中：
       
           css文件夹：codemirror.css:是codemirror的css文件;
           
                      fullscreen.css:是实现按快捷键F7把编辑框全屏的css文件;
                      
                      jennystart.css:是在线代码编辑器xblock的css文件.
                      
            html文件夹：jennystart.html:是在线代码编辑器主页面的html文件.
            
            js/src文件夹：jennystart.js:是在线代码编辑器的javascript文件，定义了事件的处理函数以及codemirror实例的生成;
            
                          fullscreen.js:是实现按快捷键F7把编辑框全屏的javascript脚本；
                          
                          codemirror.js:是codemirror的javascript脚本;
                          
                          clike.js:是对c/c++ 语言实现语法高亮的javascript脚本;
                          
                          active-line.js:是实现激活鼠标所在行的javascript脚本；
                          
                          matchbrackets.js：是实现括号匹配的javascritp脚本；
                          
                          
2.xblock-script包含把更改提交到gitlab的shell脚本:pushToGit.sh

  pushToGit.sh脚本被jennystart.py中的commit_to_gitlab函数调用。

二、xblock安装说明：

1.把在线代码编辑器xblock克隆到edx服务器
  
     sudo git clone https://github.com/jennyzhang8800/code-editor
  
2.安装xblock
 
     sudo -u edxapp /edx/bin/pip.edxapp install /home/zyni/code-editor/xblock-codeeditor/
  
3.把puToGit.sh脚本放到下面的目录下
  
     /edx/var/edxapp/staticfiles/xblock-script


4.使xblock可用

  1）edx-platform/lms/envs/common.py中去掉注释：
  
     # from xmodule.x_module import prefer_xmodules
     # XBLOCK_SELECT_FUNCTION = prefer_xmodules
     
  2）edx-platform/cms/envs/common.py,中去掉注释：
   
     # from xmodule.x_module import prefer_xmodules
     # XBLOCK_SELECT_FUNCTION = prefer_xmodules、
     
  3）edx-platform/cms/envs/common.py中把
  
    'ALLOW_ALL_ADVANCED_COMPONENTS': False,
     改成：
    'ALLOW_ALL_ADVANCED_COMPONENTS': True,

5.在Studio中把在线代码编辑器block添加到课程的高级设置中。

    1）登录到Studio,打开你的课程
    2）settings->Advanced Setting
    3)把键”advanced_modules”的值改为jennystart.
    
6.把在线代码编辑器block添加到课程，在studio中

    1）Edit编辑一个单元
    2）Advanced->jennystart

7.重启edx服务

      sudo /edx/bin/supervisorctl -c /edx/etc/supervisord.conf restart edxapp:
  
安装好之后就可以在cms中看到并使用在线代码编辑器课件组件


   
  
三、其他命令：

1.卸载xblock的命令：

     sudo -u edxapp /edx/bin/pip.edxapp uninstall jennystart-xblock
     
2.如需修改xblock可以直接在下面的路径下修改，然后重启服务

     /edx/app/edxapp/venvs/edxapp/lib/python2.7/site-packages/jennystart
  
  
  

  
