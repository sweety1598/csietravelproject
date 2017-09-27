var timeOutEvent=0;//定时器
//开始按   
function gtouchstart(){   
    timeOutEvent = setTimeout("longPress()",500);//这里设置定时器，定义长按500毫秒触发长按事件，时间可以自己改，个人感觉500毫秒非常合适   
    return false;   
};   
//手释放，如果在500毫秒内就释放，则取消长按事件，此时可以执行onclick应该执行的事件   
function gtouchend(){   
    clearTimeout(timeOutEvent);//清除定时器   
    if(timeOutEvent!=0){   
        //这里写要执行的内容（尤如onclick事件）   
        alert("你这是点击，不是长按");   
    }   
    return false;   
};   
//如果手指有移动，则取消所有事件，此时说明用户只是要移动而不是长按   
function gtouchmove(){   
    clearTimeout(timeOutEvent);//清除定时器   
    timeOutEvent = 0;   
      
};



function longPress(){
	timeOutEvent = 0;   
    //执行长按要执行的内容
   console.log(sort.options.disabled);
   //sort.options.disabled=false;
};

(function () {

	var byId = function (id) { return document.getElementById(id); }

	sort = Sortable.create(byId('foo'), {
		group: "words",
		animation: 150,
		delay: 500,
		disabled: false,
		scroll: true,

		onRemove: function (evt){ console.log('onRemove.foo:', [evt.item, evt.from]); },
		onStart:function(evt){ console.log('onStart.foo:', [evt.item, evt.from]);},
		onEnd: function(evt){ 
			console.log('onEnd.foo:', [evt.item, evt.from]);
			console.log(evt.from.children[0].id);
			console.log(evt.from.children[1].id);
			console.log(evt.from.children[2].id);
			console.log(evt.from.children[3].id);
			console.log(evt.from.children[4].id);
			console.log(sort.options.disabled);
			//sort.options.disabled=true;
			//console.log(sort.options.disabled);
			//sort.destroy();
		}
	});

})();