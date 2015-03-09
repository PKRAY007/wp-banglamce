/*
from now on the conversion table will be set up as an array of arrays
[translit string, cyrillic letter, guess case (optional)]
if translit string is caseless, cyrillic letter is treated literally, otherwise it is toUpperCase()/toLowerCase().
if translit string is caseless and guess is present, figure out case based on context (for ' or `)

order tuples in order of translit preference
*/

var switched = true;
var pbId=0;

// default latinica - russian-oriented customized tranlit readable both ways
// for compatibility with bookmarklets
function cyr_translit(src) {
	return to_cyrillic(src);
}

var conversionHash = undefined;
var maxcyrlength = 0;

function getConversionHash() {
	if (conversionHash == undefined) {
		conversionHash = new Array();
		for (var i = 0; i < conversionTable.length; i++) {
			conversionHash[conversionTable[i][0]] = conversionTable[i].slice(1);
			maxcyrlength = 20;
                //maxcyrlength = Math.max(maxcyrlength, conversionTable[i][0].length);
		}
	}
	return conversionHash;
}



// split string on HTML tags, return array containing both the matches and the pieces of string between them, matches always in even positions - since IE does not support this in String.split
function splitHtmlString(string) {
	var re = /<[\/]?[!A-Z][^>]*>/ig;
	var result = new Array();
	var lastIndex = 0;
	var arr = null;
	while ( (arr = re.exec(string)) != null) {
		result[result.length] = string.substring(lastIndex, arr.index);
		result[result.length] = string.substring(arr.index, re.lastIndex);
		lastIndex = re.lastIndex;
	}
	result[result.length] = string.substr(lastIndex);
	
	return result;
}

/* convert cyrillic to translit using to_translit-- similar to from_translit.... */
function to_translit_ext (src, skipHtml) {
	return convertWithSkip(src, skipHtml, to_translit);
}

/* convert translit to cyrillic (using ToCyrillic.to_cyrillic above) */
function to_cyrillic_ext (src, skipHtml) {
	return convertWithSkip(src, skipHtml, to_cyrillic);
}


function convertWithSkip(src, skipHtml, converter) {
    if (src == "" || src == null)
        return src;
    if (!skipHtml)
        return converter(src);
    else {
        var arr = splitHtmlString(src);
        
        for (var i = 0; i < arr.length; i++) {
            if ( (i % 2) == 0)
                arr[i] = converter(arr[i]);
        }

        return arr.join("");
    }
}

var translitHash = undefined;

function initTranslit() {
	if (translitHash == undefined) {
		translitHash = new Array();

		for (var i = 0; i < conversionTable.length; i++) {
			var ch = conversionTable[i][1];
			// if the translit string is not caseless, convert cyr string to upper case
			// otherwise maintain its case
			if (conversionTable[i][0].toUpperCase() != conversionTable[i][0].toLowerCase())
				ch = ch.toUpperCase();
				
			if (translitHash[ch] == undefined)
				translitHash[ch] = conversionTable[i][0];
		}
	}
}


/* convert cyrillic to translit */
function getTranslitString(ch) {
	initTranslit();
		
	var value = translitHash[ch];
	if (value == undefined)
		value = translitHash[ch.toUpperCase()];
	return value;
}

function to_cyrillic(src, output, chunks) {
	if (src == undefined || src == "" || src == null)
		return src;
	if (output == undefined)
		output = new String();

	var hash = getConversionHash();
	
	var location = 0;
	
	while (location < src.length) {
		var len = Math.min(maxcyrlength, src.length - location);
		var arr = undefined;
		var sub;
		while (len > 0) {
			sub = src.substr(location, len);
			arr = hash[sub];
			if (arr != undefined) 
				break;
			else 
				len--;
		}
		
		// need this for translit on the fly
		if (chunks != undefined)
			chunks[chunks.length] = sub;
			
		if (arr == undefined) {
			output += sub;
			location ++;
		}
		else {
			// case analysis
			var newChar = arr[0];
			output += newChar;
            location += len;
		}
		
	}
	
	return output;
}

//-- translit on-the-fly -- 

function replaceValue(node, value, stepback) {
	if (stepback == undefined)
		stepback = 0;
		
	if (isExplorer()) {
		var range = document.selection.createRange();
		range.moveStart("character", -stepback);
		range.text = value;
		range.collapse(false);
		range.select();
	}
	else {
		var scrollTop = node.scrollTop;
		var cursorLoc =  node.selectionStart;
		node.value = node.value.substring(0, node.selectionStart - stepback) + value + 
                node.value.substring(node.selectionEnd, node.value.length);
		node.scrollTop = scrollTop;
		node.selectionStart = cursorLoc + value.length - stepback;
		node.selectionEnd = cursorLoc + value.length - stepback;
	}
}


// compare positions
function positionIsEqual(other) {
	if (isExplorer())
		return this.position.isEqual(other.position);
	else
		return this.position == other.position;
  
}

function Position(node) {
  if (node.selectionStart != undefined)
	this.position = node.selectionStart;
  else if (document.selection && document.selection.createRange())
    this.position = document.selection.createRange();
    
  this.isEqual = positionIsEqual;
}

function resetState() {
	this.position = new Position(this.node);
	this.transBuffer = "";
	this.cyrBuffer = "";
}

function StateObject(node) {
	this.node = node;
	this.reset = resetState;
	this.cyrBuffer = "";
	this.transBuffer = "";
	this.position = new Position(node);
}


var stateHash = new Array();

function isExplorer() {
  return (document.selection != undefined && document.selection.createRange().isEqual != undefined);
}

function pressedKey(event) {
  if (isExplorer())
	return event.keyCode;
  else
    return event.which;
}

function translitonkey(event) {
     /*
	if ((event.keyCode == 255 && event.charCode > 0) || event.keyCode == 8) {
		return;
	}
    */
    //confirm("Entered processing...");
    if (event == undefined)
		event = window.event;
    
	var node = null;
	if (event.target)
		node = event.target;
	else if (event.srcElement)
		node = event.srcElement;
		
	
	
	// initialize state
	var state = stateHash[node];
	if (state == null) {
		state = new StateObject(node);
		stateHash[node] = state;
	}
	if ( (pressedKey(event) > 20) && !event.ctrlKey && !event.altKey && !event.metaKey) {

		var c = String.fromCharCode(pressedKey(event));

		// process input
		var result = process_translit(state, c);
		// finish up
		if (c != result.out || result.replace != 0) {
		  if (isExplorer())
			event.returnValue = false;
		  else
		    event.preventDefault();
		  
		  replaceValue(node, result.out, result.replace);
		  
		  state.position = new Position(node);

		}
	}
	
}

function TranslitResult() {
	this.out = "";
	this.replace = 0;
}

function process_translit(state, c) {
	// reset state if position changed
	if (!state.position.isEqual(new Position(state.node)))
		state.reset();
		
	var result = new TranslitResult();
	
	// initial backbuffer. Add to it as characters are converted
	var backbuffer = getBackBuffer(state.node, state.cyrBuffer.length, 2);
	var chunks = new Array();
	
	state.transBuffer = state.transBuffer + c

	var str = to_cyrillic(state.transBuffer, backbuffer, chunks);

	// remove backbuffer from output
	str = str.substr(backbuffer.length);
	result.out = str; 
	/* str is now left alone - it has the output matching contents of chunks and 
	   will be used to reinitialize backbuffers, along with chunks and state.transBuffer
	*/
	
	// get the difference between state.cyrBuffer and output
	for (var i = 0; i < Math.min(state.cyrBuffer.length, result.out.length); i++) {
		if (state.cyrBuffer.substr(i, 1) != result.out.substr(i, 1)) {
			result.replace = state.cyrBuffer.length - i;
			result.out = result.out.substr(i);
			break;
		}
	}
	if (result.replace == 0) {
		result.out = result.out.substr(Math.min(state.cyrBuffer.length, result.out.length));
	}
	
	// update state: backbuffer, bufferArray
	if (chunks.length > 0 && chunks[chunks.length - 1] == result.out.substr(result.out.length - 1)) {
		// no convertion took place, reset state
		state.reset();
	}
	else {
		while (state.transBuffer.length > maxcyrlength) {
			state.transBuffer = state.transBuffer.substr(chunks[0].length);
			chunks.shift();
			str = str.substr(1);
		}
		state.cyrBuffer = str;
	}
	return result;
}

function getBackBuffer(node, offset, count) {
		
	if (isExplorer()) { //.tagName.toUpperCase() == "EDITOR") {
	
		var range = document.selection.createRange();
		range.moveStart("character", -offset);
		var result = range.text.substr(-count);
		if (!result)
			result = "";
			
		return result;

	} else {
		return node.value.substring(0, node.selectionStart - offset).substr(-count);
	}
}

// need this for bookmarklets
function getSelectedNode() {
  if (document.activeElement)
	return document.activeElement;
  else
    if (window.getSelection && window.getSelection() && window.getSelection().rangeCount > 0) {
		var range = window.getSelection().getRangeAt(0);
		if (range.startContainer && range.startContainer.childNodes && range.startContainer.childNodes.length > range.startOffset)
			return range.startContainer.childNodes[range.startOffset]
    }
  return null;
}

function toggleCyrMode() {
	var node = getSelectedNode();
	if (node) {
		if (stateHash[node]) {
			if (removeKeyEventListener(node))
				delete stateHash[node];
		}
		else {
			if (addKeyEventListener(node))
				stateHash[node] = new StateObject(node);
		}
	}
}

function addKeyEventListener(node) {
	if (node.addEventListener)
		node.addEventListener("keypress", translitonkey, false);
	else if (node.attachEvent)
	    node.attachEvent("onkeypress", translitonkey);
	else return false;
	return true;
}
function removeKeyEventListener(node) {
	if (node.removeEventListener)
		node.removeEventListener("keypress", translitonkey, false);
	else if (node.detachEvent)
		node.detachEvent("onkeypress", translitonkey);
	else return false;
	return true;
}

function getSelectedText() {
	if (isExplorer()) {
		return document.selection.createRange().text;
	}
	else {
		var node = getSelectedNode();
		if (node && node.value && node.selectionStart != undefined && node.selectionEnd != undefined)
			return node.value.substring(node.selectionStart, node.selectionEnd);
	}
	return "";
}


function bmkToCyrillic() {
	batchConverter(to_cyrillic_ext);
}
function bmkToTranslit() {
	batchConverter(to_translit_ext);
	
}


function RangeConversionState(range, converter) {
	this.range = range;
	this.convert = converter;
	this.started = false;
	this.finished = false;
	this.toString = function() {
		return "started : " + this.started + ", finished: " + this.finished;
	};
}

function convertRangeNode(node, state) {
	if (state.started && state.finished)
		return;

	if (!state.started && 
		( ( (state.range.startContainer.nodeType == node.TEXT_NODE || 
			 state.range.startContainer.nodeType == node.PROCESSING_INSTRUCTION_NODE || 
			 state.range.startContainer.nodeType == node.COMMENT_NODE	)
		    && node == state.range.startContainer) 
			||
		  ( state.range.startContainer.childNodes && node == state.range.startContainer.childNodes[state.range.startOffset])
		))
		state.started = true;

	if (node.nodeType == node.TEXT_NODE || node.nodeType == node.PROCESSING_INSTRUCTION_NODE || node.nodeType == node.COMMENT_NODE) {
		if (state.started && !state.finished) {
			// convert text
			var start = (node == state.range.startContainer) ? state.range.startOffset : 0;
			var end   = (node == state.range.endContainer) ? state.range.endOffset : node.nodeValue.length;
			var remainder = (node == state.range.endContainer) ? node.nodeValue.length - state.range.endOffset : 0;
			node.nodeValue = 
				node.nodeValue.substring(0, start) +
				state.convert(node.nodeValue.substring(start, end)) +
				node.nodeValue.substr(end);
			
			if (node == state.range.endContainer)
				state.range.setEnd(node, node.nodeValue.length - remainder);
			if (node == state.range.startContainer)
				state.range.setStart(node, start);
		}
	}
	else if (node.childNodes)
		// walk the tree
		for (var i = 0; i < node.childNodes.length; i++) {
			convertRangeNode(node.childNodes[i], state);
			if (state.started && state.finished)
				break;
		}
		
	if (!state.finished && 
		( ((state.range.endContainer.nodeType == node.TEXT_NODE || 
			 state.range.endContainer.nodeType == node.PROCESSING_INSTRUCTION_NODE || 
			 state.range.endContainer.nodeType == node.COMMENT_NODE	)
		     && node == state.range.endContainer) 
			||
		  ( (state.range.endContainer.childNodes.length > 0) && node == state.range.endContainer.childNodes[state.range.endOffset - 1])
		))
		state.finished = true;
		
}

function convertSelection (selection, converter) {
	if (selection == null) return;
	for(var i = 0; i < selection.rangeCount; i++) {
		convertRangeNode(selection.getRangeAt(i).commonAncestorContainer, new RangeConversionState(selection.getRangeAt(i), converter));
	}
	selection.collapseToEnd();
}


function batchConverter(convert) {
	if (isExplorer()) {
		var range = document.selection.createRange();
		try {
			range.pasteHTML(convert(range.htmlText, true));
		}
		catch (err) {
			range.text = convert(range.text, true);
		}
	}
	else if (window.getSelection) {
		var node = getSelectedNode();
		var sel = window.getSelection();

		if (node && node.value && node.selectionStart != undefined && node.selectionEnd != undefined)
			replaceValue(node, convert(node.value.substring(node.selectionStart, node.selectionEnd), true));
		else if(sel && sel.toString() != "")
			convertSelection(sel, convert);
	}
}    

// Start experimental phonetic transliterator

//document.write('<script type="text/javascript" src="' + 'http://bn.wikipedia.org/w/index.php?title=User:Zaheen/translitnew.js&action=raw&ctype=text/javascript&dontcountme=s"' + '&action="raw"></script>');
 
function addLoadEvent(func) 
{
if (window.addEventListener) 
    window.addEventListener("load", func, false);
else if (window.attachEvent) 
    window.attachEvent("onload", func);
}

function addTranslit(editForm,textBox){

        /*if (textBox.addEventListener) 
            textBox.addEventListener("keypress", processKeys, false);
        else if (textBox.attachEvent) 
            textBox.attachEvent("onkeypress", processKeys);*/
        textBox.onkeypress = processKeys; 
}

function addTextEvent() {
        var allForms, thisForm,allElements, thisElement;
        allForms = document.getElementsByTagName('form');
        for (var i = 0; i < allForms.length; i++) {
            thisForm = allForms[i];
            //if(thisForm.id=="") thisForm.setAttribute("id","pb" + pbId++);
            allElements=thisForm.elements;
            for (var j = 0; j < allElements.length; j++) {
            	thisElement = allElements[j];     	
            	if(thisElement.type=="text"||thisElement.type=="textarea"){ 
                        //if(thisElement.id=="") thisElement.setAttribute("id","pbVirtualId" + pbId++);                    	                                                           
                        addTranslit(thisForm,thisElement);
                }  
            }       
        } 
}

function processKeys(event) {
    //confirm("Key processing");
 if (switched) return true;
 translitonkey(event); 
}

function switchMode() {
switched = !switched;
try { 
        //Providing Keyboard mode info to the webpage and calling an undefined function that can be defined by the web site.
        //document.getElementById("chkbangla").checked = switched;
        modeChanged();
} catch (error) {
        //Do nothing
}
}

function makeAvroEditor(textAreaId) {
    activeTextAreaInstance = document.getElementById(textAreaId);
    activeTextAreaInstance.onfocus = function() { activeta = textAreaId; };
    addTranslit(null, activeTextAreaInstance);
    switched = false;
    //confirm("All makeAvroEditor done");
}


var rtsupported = false;
var error;
var activeta; //active text area

