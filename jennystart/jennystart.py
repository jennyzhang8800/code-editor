__author__ = 'zhangyanni'
"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String
from xblock.fragment import Fragment

from lib_util import Util


class JennystartXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    codeData = String(default="", scope=Scope.user_state, help="codeData")
    file_path=String(default="", scope=Scope.user_state, help="file_path")
    real_path=String(default="", scope=Scope.user_state, help="real_path")
    logger = Util .uc_logger()


    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the JennystartXBlock, shown to students
        when viewing courses.
        """


        context_dict={"file":self.file_path}

        fragment = Fragment()
        fragment.add_content(Util.render_template("static/html/jennystart.html",context_dict) )
        fragment.add_css(Util.load_resource("static/css/jennystart.css"))
        fragment.add_css(Util.load_resource("static/css/codemirror.css"))
        fragment.add_css(Util.load_resource("static/css/night.css"))
        fragment.add_javascript(Util.load_resource("static/js/src/jennystart.js"))
        fragment.add_javascript(Util.load_resource("static/js/src/codemirror.js"))
        fragment.add_javascript(Util.load_resource("static/js/src/active-line.js"))
        fragment.add_javascript(Util.load_resource("static/js/src/clike.js"))
        fragment.add_javascript(Util.load_resource("static/js/src/matchbrackets.js"))
        fragment.initialize_js('JennystartXBlock')
        return fragment

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        
        self.file_path = data['file_path']
        student_id = data['student_id']
        base_path="/edx/var/edxapp/staticfiles/ucore/"
        self.real_path=base_path+student_id+self.file_path

        output=open(self.real_path)
        self.codeData =output.read()
        output.close()
        return {"codeData":self.codeData}

    @XBlock.json_handler
    def save_file(self, data, suffix=''):
        """
        save_file handler, which save the changed data on codemirror.
        """
        # save the changed datd to file...
        self.logger.info("save_file_invoke")
        self.codeData=data['codeData']

        output=open(self.real_path,"wb")
        output.write(self.codeData)
        output.close()
        return True


    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("JennystartXBlock",
             """<vertical_demo>
               <jennystart/>
               <jennystart/>
               <jennystart/>
               </vertical_demo>
            """),
            ]





