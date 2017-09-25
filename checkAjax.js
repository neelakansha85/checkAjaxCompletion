
function checkForAjaxRequest(open, callback) {
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
        callback && callback();
    };
}

function visitURL() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.readyState);
        }
    }
    // getting data from test page
    xhr.open('GET', 'load_page.php', true);
    xhr.send(null);
}

function startGuide() {
    //execute firstStep
    firstStep(function() {
        console.log("First Step completed");
        checkForAjaxRequest(XMLHttpRequest.prototype.open, function() {
            console.log("First Step Ajax request completed");
            secondStep();
        })
    });
}

//def firstStep
function firstStep(callback) {
    setTimeout(function() {
        console.log("Perform Action #1");
        // This could be anything such as get response from Google
        visitURL();
        // loadPage('#page2');
        callback && callback();
    }, 2000);
}

//def secondStep
function secondStep() {
    setTimeout(function() {
        console.log("Perform Action #2");
        // This could be anything such as get response from Google
        // callback && callback();
    }, 500);
}


