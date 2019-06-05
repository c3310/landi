import './src/css/header.less'
import './src/css/footer.less'
(function(window){
	console.log('hahhah')
	console.log('============')
        let header = document.getElementById('header');
        console.log(header)
        header.onclick = function(){
          console.log(this.innerHTML)
        }
      })(window)