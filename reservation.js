var rp = require('request-promise');

var options = {
    method: 'GET',
    uri: 'http://finalyearproject.southindia.cloudapp.azure.com:8080/api/parking/58d388afa6e3d7355ce81aa9'
    };

rp(options)
    .then(function (parsedBody) {
                data = JSON.parse(parsedBody);
                if(data.isReserved==true){
                    console.log("iamhere");
                    setTimeout(myFunction, 10000)
                }
            })
    .catch(function (err) {
                console.log(err);
            });

function myFunction() {
    var options = {
    method: 'PUT',
    uri: 'http://finalyearproject.southindia.cloudapp.azure.com:8080/api/parking/58d388afa6e3d7355ce81aa9',
    body: {
        isReserved : false
    },
    json: true // Automatically stringifies the body to JSON
    };

        rp(options)
            .then(function (parsedBody) {
                console.log(parsedBody);
                // POST succeeded...
            })
            .catch(function (err) {
                console.log(err);
            });
    };
