var fs = require('fs');

var split;
var bank = [];

fs.readFile('corpus.txt','utf8',function(e,data){
	var mr = mapred(data);
	var tfval = tf(mr,data.length);
	//since it's only 1 document, I don't care about IDF :D
	var sortable = [];
	for(v in tfval){
		if(tfval.hasOwnProperty(v)){
			sortable.push({
				'k':v,
				'v':tfval[v]
			})			
		}
	}
	sortable.sort(function(a,b){
		return b.v - a.v;
	})
	console.log(sortable);
});

var mapred = function(data){
	var corpus = data.replace(/[^a-zA-Z ]/g, '').split(" ").reduce(function(map,word){
		word = word.toLowerCase();
		map[word] = (map[word]||0)+1;
		return map;
	},Object.create(null));
	return corpus;
}

var tf = function(tfdata,length){
	//couting terms freq
	var obj = {};
	Object.keys(tfdata).map(function(o){
		obj[o] = tfdata[o]/length;
	});
	return obj;
}