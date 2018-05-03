# PrintText-DEMO

> * webpack4.0
> * webpack-dev-server     
> 




* keydown 事件
在监听keydown事件时是能够获取到当前的按键信息，但是在`input`元素中如果监听keydown事件来获取当前键入的`按键`字符是不可行的，在目前的JS中当你按键后input在监听该事件时回调函数最先执行，然后再录入当前按键信息。

例如当我们监听`keydown`事件为直接获取`input`元素中的值，那么第一次执行获取的值一定为空，
当你按下A键时，事件回调会首先执行就是读取当前`input`的值，然后回调执行完毕后，将A键信息写入`input`元素。

所以当你要获取完整的`input`的值就应该监听`keyup`事件，但当你需要优先处理已经录入的信息那么就必须写入`keydown`中