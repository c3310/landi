import './src/css/index.less'

//轮播图
function animate(dom, dom2, indexs, duration, interval
){
	var dom = dom.nodeType === 1 ? dom : document.getElementsByClassName(dom)[0];
	var dom2 = dom2.nodeType === 1 ? dom2 : document.getElementsByClassName(dom2)[0];
	var indexs = indexs.nodeType === 1 ? indexs : document.getElementsByClassName(indexs)[0].children;
	var width = dom.offsetWidth;
	var run = null;
	var current = 1;
	var mode = dom.getAttribute('data-mode')
	dom2.style.left = current* width + "px";
	clearInterval(run)
	run = setInterval(go, interval);
	dom.onmouseover= function(){
		console.log('stop')
		clearInterval(run)
	}
	dom.onmouseleave = function(){
		console.log('run')
		run = setInterval(go, interval);
	}

	for (var i = 0; i < indexs.length; i++) {
		indexs[i].onmouseover = function(e){
			clearInterval(run)
			var start = -current* width
			var target = -this.innerText* width
			indexs[current-1].className = indexs[current-1].className.replace('on', '')
			this.className += ' on'
			current = this.innerText
			anim(dom2, 'left', start, target, duration)
		}
	}

	function go(){
		var start = -current* width;
		var cls = indexs[current-1].className
		indexs[current-1].className = cls.replace('on', '')
		if(current>=mode){
			current = 0;
			dom2.style.left = 0 +'px';
			start = current*width
		}
		current++;
		var target = -current* width;
		anim(dom2, 'left', start, target, duration)
		indexs[current-1].className += ' on'
	}

	
}
//运动
function anim(dom, attr, start, target, duration){
		var per = (target - start) / duration;
		var t = new Date()
		var time = null;
		function run() {
			var t1 = new Date() - t;
			if(t1 >= duration){
				t1 = duration;
				clearInterval(time)
			}
			var current = start + per*t1 
			if(attr === 'scrollTop'){
				dom['scrollTop'] = current;
			}else{
				dom.style[attr] = current +'px';
			}
			
		}
		time = setInterval(run, 1000/16);

	}

function scroll(dom){
	var dom = dom.nodeType === 1 ? dom : document.getElementsByClassName(dom)[0];
	window.addEventListener('scroll', throttle(function(e){
		var top ;
		var targetNode;
		if (document.body.scrollTop){
			top=document.body.scrollTop;
			targetNode = document.body
		}
		if (document.documentElement.scrollTop){
			top=document.documentElement.scrollTop;
			targetNode = document.documentElement
		}
		if(top >300){
			dom.style.visibility="visible"
			 dom.style.opacity = 1;
		}else{
			 dom.style.opacity = 0;
			dom.style.visibility="hidden"
		}

		dom.onclick = function(){
			anim(targetNode, 'scrollTop', top, 0, 500)
		}
	}, 100))
}
//节流
function throttle(fn, wait){
	var ctx, args;
	var previous = 0;

	return function () {
		var now = + new Date();
		ctx = this;
		args = arguments;
		console.log(previous)
		if(now - previous > wait){
			fn.apply(ctx, args)
			previous = now;
		}
	}
}
animate('banner', 'b-ul', 'indicate-box', 500, 2000)
animate('solution-items', 'items-wrap', 'solution-indicate', 500, 2000)
scroll('item3')

/*.solution-items{
	width: 1168px;
	margin: 0 auto;
	overflow: hidden;

	.items-wrap{*/