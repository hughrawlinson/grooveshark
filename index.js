var crypto = require('crypto');
var request = require('request');

module.exports = function(api_key,secret){
    var self = {};
    self.sessionID = '';
    self.baseURI = 'https://api.grooveshark.com/ws3.php';
    self.apiKey = api_key;
    self.secret = secret;
    var makeRequest = function(options,callback){
        if(options.method!=='startSession'&&self.sessionID===''){
            console.info('Starting Grooveshark Session...');
            makeRequest({
                method:'startSession'
            },function(error,response,data){
                console.info('Grooveshark Session Started');
                self.sessionID = data.result.sessionID;
                makeRequest(options,callback);
            });
            return;
        }
        var body = {
            "method":options.method,
            "header":{
                "wsKey":api_key,
            }
        }
        if(options.method==='startSession'){
            body.header.secret=secret;
        }
        else{
            body.header.sessionID=self.sessionID;
        }
        if(options.parameters){
            body.parameters = options.parameters;
        }
        var reqbody = JSON.stringify(body);
        var sig=crypto.createHmac('md5',secret).update(reqbody).digest('hex');
        request.post({
                'url':self.baseURI+'?sig='+sig,
                'body':reqbody,
                'headers':{
                    'Content-Type':'text/plain;charset=UTF-8',
                    'Accept-Type':'application/json'
                }
            },function(error,response,data){
                callback(error,response,JSON.parse(data));
            }
        );
    }
    self.makeRequest = makeRequest;
    return self;
}
