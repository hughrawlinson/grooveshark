# Grooveshark JS

A quick 'n dirty JS wrapper for the Grooveshark API, which sadly is not RESTful.

## Usage
```javascript
var gs = grooveshark(config.grooveshark.key,config.grooveshark.secret);
gs.makeRequest({
        method:'getUserIDFromUsername',
        parameters:{
            username:'hughrawlinson'
        }
    }, function(error,response,data){
        console.log(data);
    }
);
```
![Simples!](http://www.arenaswimclub.com.au/wp-content/uploads/2013/10/simples.jpg)
## License
MIT.

## Thanks
* The folks at Grooveshark for giving me an API key. Much appreciated.
* The makers of the fine packages that are Request and Crypto.
