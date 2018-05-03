<textarea id="con" cols="30" name="" rows="10">@phpvar:</textarea>
<script type="text/javascript">// <![CDATA[
var temStr="",
         insertStr="\r\n",
         isIE = !(!document.all);//双重否定，即肯定
     function posCursor(){
        var obj=document.getElementById("con");
        var len=obj.value.length;
        var start=len,end=len;
        if(isIE){
            tmpStr=obj.value;
            obj.value="";
            obj.focus();
            // ie都支持document.selection
            var sTextRange= document.selection.createRange();
            //ie中实现：将光标自动定位到字符串后面，可用“先清空原输入框内容，再用document.selection.createRange().text属性重新给输入框赋值”的方法即可
            sTextRange.text=tmpStr+insertStr;
            obj.focus();
        }else{
            // Firefox，Chrome,Safari以及Opera都有selectionStart和selectionEnd属性
            // obj.select();
            obj.selectionStart=start;
            obj.selectionEnd=end;
            tmpStr=obj.value;
            cursorPos=start;
            //将要被插入的字符串插入光标所在位置，并将原光标左右两边的字符串拼接起来
            obj.value=tmpStr.slice(0, start)+insertStr+tmpStr.slice(end,tmpStr.length);
            cursorPos+=insertStr.length-1;//换行符占1个字符
            obj.selectionStart=obj.selectionEnd=cursorPos;
        }
     }
     posCursor();
// ]]></script>
