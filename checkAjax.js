
// Using Javascript, this is equvalient to jquery ajaxComplete()
var interceptor = (function(open) {

    var activeXhr = [];
    
    XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {

        this.addEventListener('readystatechange', function() {
            
            switch(this.readyState){
                case 1:
                    activeXhr.push(this);
                    break;

                case 3:
                    console.log('Ajax request is still loading');
                    // call a function required to do something while the request is still loading
                    break;
                    
                case 4:
                    var i = activeXhr.indexOf(this);
                    
                    if(i > -1)
                        activeXhr.splice(i ,1);
                    
                    if(!activeXhr.length)
                        console.log('ajax complete');
                      // call a function to assert/run next step since the ajax request is completed
                    
                    break;
            }
            
        }, false);

        open.call(this, method, url, async, user, pass);
    };

})(XMLHttpRequest.prototype.open);


// Using jquery
$( document ).ajaxStop(function() {
   $( ".log" ).text( "Triggered ajaxStop handler." );
});
