  function invader(pattern) {
    //Breaking down the pattern entered into an array and spliting them by each line
    this.lines = pattern.split('\n');
    this.length = this.lines.length;
  }

  //Getting a specific line in the Invader array
  invader.prototype.getLine = function(i) {
    return this.lines[i];
  }

  function Radar(radar) {
    this.lines = radar.split('\n');
  }

  //Checking through the radar pattern with each line in the invader pattern
  Radar.prototype.elementExist = function(line){
    var _arr=[];
  	for(var i=0; i<this.lines.length; i++) {
      var l = this.lines[i].indexOf(line)
  		if( l != -1 )
  			_arr.push({line:i,char:l});
  	}
  	return _arr;
  }

  /*Filtering through the data leaving only the invader
  pattern in the radar signal that matches the invader pattern*/
  Radar.prototype.findInvaderPatternSequences = function(hits,invader){
    if(!hits)
      return [];
  	var firstLineMatches=hits[0];
  	var _matched=[];
  	for(var i=0; i<firstLineMatches.length; i++){
  		var _found=this.checkPatternSequence(firstLineMatches[i],hits);
  		var allInvader=this.checkAllInvader(_found, invader.length);
  		if(allInvader)
  			_matched.push(_found[0]);
  	}
  	return _matched;
  }
  //Setting up the condition on with the matching is based on
  Radar.prototype.checkPatternSequence = function(elm,hits){
    var matched=[];
  	for(var i = 1; i < hits.length; i++) {
  		var _hit=hits[i];
  		for(var j=0;j<_hit.length;j++){
        /* This condition can be modified
        based on the distortion coming from radar signal*/
  			if(elm.line+i == _hit[j].line && elm.char == _hit[j].char){
  				matched.push({
  					i:i,
  					line:elm.line,
  					char:elm.char,
  				});
  			}
  		}
  	}
    /*This step can also be modified based on the amount of distortion,
    basically how much lines do we need to exist in the figure in the radar
    siganl to match it with the known invader pattern*/
    Radar.prototype.checkAllInvader = function(found,l) {
      if(!found) return false;
    	if(found.length+1!=l)
    		return false;
    	return true;
    }

  	return matched.length>0 ? matched : false;
  }

  // Searching for invader entry point.
  Radar.prototype.invaderExist = function(invader) {
    /*_hits will have an array of arrays,
    each array contains an object that contains the line number
    and the position of the pattern in
    the line that matches one line of the invader text
    */
    var _hits=[];
  	for(var i =0; i<invader.length; i++) {
  		var line=invader.getLine(i);
  		var _output=this.elementExist(line);
  		if(_output.length==0)
  			return false;
  		_hits.push(_output);
  	}
  	return this.findInvaderPatternSequences(_hits, invader);
  }


module.exports = {Radar , invader}
