var activeta;var unijoy=new Array();unijoy['0']='\u09e6';unijoy['1']='\u09e7';unijoy['2']='\u09e8';unijoy['3']='\u09e9';unijoy['4']='\u09ea';unijoy['5']='\u09eb';unijoy['6']='\u09ec';unijoy['7']='\u09ed';unijoy['8']='\u09ee';unijoy['9']='\u09ef';unijoy['j']='\u0995';unijoy['d']='\u09BF';unijoy['gd']='\u0987';unijoy['D']='\u09C0';unijoy['gD']='\u0988';unijoy['c']='\u09C7';unijoy['gc']='\u098F';unijoy['gs']='\u0989';unijoy['s']='\u09C1';unijoy['S']='\u09C2';unijoy['gS']='\u098A';unijoy['v']='\u09B0';unijoy['a']='\u098B';unijoy['f']='\u09BE';unijoy['gf']='\u0986';unijoy['F']='\u0985';unijoy['n']='\u09B8';unijoy['t']='\u099f';unijoy['J']='\u0996';unijoy['b']='\u09A8';unijoy['B']='\u09A3';unijoy['k']='\u09A4';unijoy['K']='\u09A5';unijoy['e']='\u09A1';unijoy['E']='\u09A2';unijoy['h']='\u09AC';unijoy['H']='\u09AD';unijoy['p']='\u09DC';unijoy['P']='\u09DD';unijoy['o']='\u0997';unijoy['O']='\u0998';unijoy['i']='\u09B9';unijoy['I']='\u099E';unijoy['u']='\u099C';unijoy['U']='\u099D';unijoy['y']='\u099A';unijoy['Y']='\u099B';unijoy['T']='\u09A0';unijoy['r']='\u09AA';unijoy['R']='\u09AB';unijoy['l']='\u09A6';unijoy['L']='\u09A7';unijoy['w']='\u09AF';unijoy['W']='\u09DF';unijoy['q']='\u0999';unijoy['Q']='\u0982';unijoy['V']='\u09B2';unijoy['m']='\u09AE';unijoy['M']='\u09B6';unijoy['N']='\u09B7';unijoy['gx']='\u0993';unijoy['X']='\u09CC';unijoy['gX']='\u0994';unijoy['gC']='\u0990';unijoy['\\']='\u0983';unijoy['|']='\u09CE';unijoy["G"]="\u0964";unijoy['g']=' ';unijoy['&']='\u0981';unijoy['Z']='\u09CD'+'\u09AF';unijoy['gh']='\u09CD'+'\u09AC';unijoy['ga']='\u098B';unijoy['a']='\u09C3';unijoy['vZ']=unijoy['v']+'\u200d'+'\u09CD'+'\u09AF';unijoy['z']='\u09CD'+unijoy['v'];unijoy['x']='\u09CB';unijoy['C']='\u09C8';var carry='';var old_len=0;var ctrlPressed=false;var first_letter=false;var lastInserted;isIE=document.all?1:0;var switched=false;function checkKeyDown(ev)
{var e=(window.event)?event.keyCode:ev.which;if(e=='17')
{ctrlPressed=true;}}
function checkKeyUp(ev)
{var e=(window.event)?event.keyCode:ev.which;if(e=='17')
{ctrlPressed=false;}}
function parseunijoy(evnt)
{var t=document.getElementById(activeta);var e=(window.event)?event.keyCode:evnt.which;if(e=='113')
{if(ctrlPressed){switched=!switched;return true;}}
if(switched)return true;if(ctrlPressed)
{e=0;}
var char_e=String.fromCharCode(e);if(e==8||e==32)
{carry=" ";old_len=1;return;}
lastcarry=carry;carry+=""+char_e;bangla=parseunijoyCarry(carry);tempBangla=parseunijoyCarry(char_e);if(tempBangla==".."||bangla=="..")
{return false;}
if(char_e=="g")
{if(carry=="gg")
{insertConjunction('\u09CD'+'\u200c',old_len);old_len=1;return false;}
insertAtCursor("\u09CD");old_len=1;carry="g";return false;}
else if(old_len==0)
{insertConjunction(bangla,1);old_len=1;return false;}
else if(char_e=="A")
{newChar=unijoy['v']+'\u09CD';insertAtCursor(newChar);old_len=1;return false;}
else if((bangla==""&&tempBangla!=""))
{bangla=tempBangla;if(bangla=="")
{carry="";return;}
else
{carry=char_e;insertAtCursor(bangla);old_len=bangla.length;return false;}}
else if(bangla!="")
{insertConjunction(bangla,old_len);old_len=bangla.length;return false;}}
function parseunijoyCarry(code)
{if(!unijoy[code])
{return'';}
else
{return(unijoy[code]);}}
function insertAtCursor(myValue){lastInserted=myValue;var myField=document.getElementById(activeta);if(document.selection){myField.focus();sel=document.selection.createRange();sel.text=myValue;sel.collapse(true);sel.select();}
else if(myField.selectionStart||myField.selectionStart==0){var startPos=myField.selectionStart;var endPos=myField.selectionEnd;var scrollTop=myField.scrollTop;startPos=(startPos==-1?myField.value.length:startPos);myField.value=myField.value.substring(0,startPos)
+myValue
+myField.value.substring(endPos,myField.value.length);myField.focus();myField.selectionStart=startPos+myValue.length;myField.selectionEnd=startPos+myValue.length;myField.scrollTop=scrollTop;}else{var scrollTop=myField.scrollTop;myField.value+=myValue;myField.focus();myField.scrollTop=scrollTop;}}
function insertConjunction(myValue,len){lastInserted=myValue;var myField=document.getElementById(activeta);if(document.selection){myField.focus();sel=document.selection.createRange();if(myField.value.length>=len){sel.moveStart('character',-1*(len));}
sel.text=myValue;sel.collapse(true);sel.select();}
else if(myField.selectionStart||myField.selectionStart==0){myField.focus();var startPos=myField.selectionStart-len;var endPos=myField.selectionEnd;var scrollTop=myField.scrollTop;startPos=(startPos==-1?myField.value.length:startPos);myField.value=myField.value.substring(0,startPos)
+myValue
+myField.value.substring(endPos,myField.value.length);myField.focus();myField.selectionStart=startPos+myValue.length;myField.selectionEnd=startPos+myValue.length;myField.scrollTop=scrollTop;}else{var scrollTop=myField.scrollTop;myField.value+=myValue;myField.focus();myField.scrollTop=scrollTop;}}
function makeUnijoyEditor(textAreaId)
{activeTextAreaInstance=document.getElementById(textAreaId);activeTextAreaInstance.onkeypress=parseunijoy;activeTextAreaInstance.onkeydown=checkKeyDown;activeTextAreaInstance.onkeyup=checkKeyUp;activeTextAreaInstance.onfocus=function(){activeta=textAreaId;};}
var activeta;var probhat=new Array();probhat['`']='\u200d';probhat['~']='~';probhat['1']='\u09e7';probhat['2']='\u09e8';probhat['3']='\u09e9';probhat['4']='\u09ea';probhat['5']='\u09eb';probhat['6']='\u09ec';probhat['7']='\u09ed';probhat['8']='\u09ee';probhat['9']='\u09ef';probhat['0']='\u09e6';probhat['-']='-';probhat['=']='=';probhat['!']="!";probhat['@']='@';probhat['#']='#';probhat['$']='\u09f3';probhat['%']='%';probhat['^']='^';probhat['&']='\u099e';probhat['*']='\u09ce';probhat['(']='(';probhat[')']=')';probhat['_']='_';probhat['+']='+';probhat['q']='\u09a6';probhat['Q']='\u09a7';probhat['w']='\u09c2';probhat['W']='\u098a';probhat['e']='\u09c0';probhat['E']='\u0988';probhat['r']='\u09b0';probhat['R']='\u09dc';probhat['t']='\u099f';probhat['T']='\u09a0';probhat['y']='\u098f';probhat['Y']='\u0990';probhat['u']='\u09c1';probhat['U']='\u0989';probhat['i']='\u09bf';probhat['I']='\u0987';probhat['o']='\u0993';probhat['O']='\u0994';probhat['p']='\u09aa';probhat['P']='\u09ab';probhat['[']='\u09c7';probhat['{']='\u09c8';probhat[']']='\u09cb';probhat['}']='\u09cc';probhat['\\']='\u200C';probhat['|']='\u0965';probhat['a']='\u09be';probhat['A']='\u0985';probhat['s']='\u09b8';probhat['S']='\u09b7';probhat['d']='\u09a1';probhat['D']='\u09a2';probhat['f']='\u09a4';probhat['F']='\u09a5';probhat['g']='\u0997';probhat['G']='\u0998';probhat['h']='\u09b9';probhat['H']='\u0983';probhat['j']='\u099c';probhat['J']='\u099d';probhat['k']='\u0995';probhat['K']='\u0996';probhat['l']='\u09b2';probhat['L']='\u0982';probhat[';']=';';probhat[':']=':';probhat['z']='\u09df';probhat['Z']='\u09af';probhat['x']='\u09b6';probhat['X']='\u09dd';probhat['c']='\u099a';probhat['C']='\u099b';probhat['v']='\u0986';probhat['V']='\u098b';probhat['b']='\u09ac';probhat['B']='\u09ad';probhat['n']='\u09a8';probhat['N']='\u09a3';probhat['m']='\u09ae';probhat['M']='\u0999';probhat[',']=',';probhat['<']='\u09c3';probhat['.']='\u0964';probhat[".."]='\u0965';probhat['>']='\u0981';probhat['/']='\u09cd';probhat['?']='?';var carry='';var old_len=0;var ctrlPressed=false;var first_letter=false;var carry2="";isIE=document.all?1:0;var switched=false;function checkKeyDown(ev)
{var e=(window.event)?event.keyCode:ev.which;if(e=='17')
{ctrlPressed=true;}}
function checkKeyUp(ev)
{var e=(window.event)?event.keyCode:ev.which;if(e=='17')
{ctrlPressed=false;}}
function parseProbhat(evnt)
{var t=document.getElementById(activeta);var e=(window.event)?event.keyCode:evnt.which;if(e=='112')
{if(ctrlPressed){switched=!switched;return true;}}
if(switched)return true;if(ctrlPressed)
{e=0;}
var char_e=String.fromCharCode(e);if(e==8||e==32)
{carry=" ";old_len=1;return;}
lastcarry=carry;carry+=""+char_e;bangla=parseProbhatCarry(carry);tempBangla=parseProbhatCarry(char_e);if(tempBangla==".."||bangla=="..")
{return false;}
if(char_e=="/")
{if(carry=="//")
{insertJointAtCursor("/",old_len);old_len=1;return false;}
insertAtCursor("\u09CD");old_len=1;carry2=carry;carry="/";return false;}
else if(old_len==0)
{insertJointAtCursor(bangla,1);old_len=1;return false;}
else if(char_e=='Z'&&carry2=="r/")
{insertJointAtCursor('\u200d'+probhat['/']+probhat['Z'],1);old_len=1;return false;}
else if((bangla==""&&tempBangla!=""))
{bangla=tempBangla;if(bangla=="")
{carry="";return;}
else
{carry=char_e;insertAtCursor(bangla);old_len=bangla.length;return false;}}
else if(bangla!="")
{insertJointAtCursor(bangla,old_len);old_len=bangla.length;return false;}}
function parseProbhatCarry(code)
{if(!probhat[code])
{return'';}
else
{return(probhat[code]);}}
function insertAtCursor(myValue){var myField=document.getElementById(activeta);if(document.selection){myField.focus();sel=document.selection.createRange();sel.text=myValue;sel.collapse(true);sel.select();}
else if(myField.selectionStart||myField.selectionStart==0){var startPos=myField.selectionStart;var endPos=myField.selectionEnd;var scrollTop=myField.scrollTop;startPos=(startPos==-1?myField.value.length:startPos);myField.value=myField.value.substring(0,startPos)
+myValue
+myField.value.substring(endPos,myField.value.length);myField.focus();myField.selectionStart=startPos+myValue.length;myField.selectionEnd=startPos+myValue.length;myField.scrollTop=scrollTop;}else{var scrollTop=myField.scrollTop;myField.value+=myValue;myField.focus();myField.scrollTop=scrollTop;}}
function insertJointAtCursor(myValue,len){var myField=document.getElementById(activeta);if(document.selection){myField.focus();sel=document.selection.createRange();if(myField.value.length>=len){sel.moveStart('character',-1*(len));}
sel.text=myValue;sel.collapse(true);sel.select();}
else if(myField.selectionStart||myField.selectionStart==0){myField.focus();var startPos=myField.selectionStart-len;var endPos=myField.selectionEnd;var scrollTop=myField.scrollTop;startPos=(startPos==-1?myField.value.length:startPos);myField.value=myField.value.substring(0,startPos)
+myValue
+myField.value.substring(endPos,myField.value.length);myField.focus();myField.selectionStart=startPos+myValue.length;myField.selectionEnd=startPos+myValue.length;myField.scrollTop=scrollTop;}else{var scrollTop=myField.scrollTop;myField.value+=myValue;myField.focus();myField.scrollTop=scrollTop;}}
function makeProbhatEditor(textAreaId)
{activeTextAreaInstance=document.getElementById(textAreaId);activeTextAreaInstance.onkeypress=parseProbhat;activeTextAreaInstance.onkeydown=checkKeyDown;activeTextAreaInstance.onkeyup=checkKeyUp;activeTextAreaInstance.onfocus=function(){activeta=textAreaId;};}
var activeta;var phonetic=new Array();var shift=false;phonetic['k']='\u0995';phonetic['0']='\u09e6';phonetic['1']='\u09e7';phonetic['2']='\u09e8';phonetic['3']='\u09e9';phonetic['4']='\u09ea';phonetic['5']='\u09eb';phonetic['6']='\u09ec';phonetic['7']='\u09ed';phonetic['8']='\u09ee';phonetic['9']='\u09ef';phonetic['i']='\u09BF';phonetic['I']='\u0987';phonetic['ii']='\u09C0';phonetic['II']='\u0988';phonetic['e']='\u09C7';phonetic['E']='\u098F';phonetic['U']='\u0989';phonetic['u']='\u09C1';phonetic['uu']='\u09C2';phonetic['UU']='\u098A';phonetic['r']='\u09B0';phonetic['WR']='\u098B';phonetic['a']='\u09BE';phonetic['A']='\u0986';phonetic['ao']='\u0985';phonetic['s']='\u09B8';phonetic['t']='\u099f';phonetic['K']='\u0996';phonetic['kh']='\u0996';phonetic['n']='\u09A8';phonetic['N']='\u09A3';phonetic['T']='\u09A4';phonetic['Th']='\u09A5';phonetic['d']='\u09A1';phonetic['dh']='\u09A2';phonetic['b']='\u09AC';phonetic['bh']='\u09AD';phonetic['v']='\u09AD';phonetic['R']='\u09DC';phonetic['Rh']='\u09DD';phonetic['g']='\u0997';phonetic['G']='\u0998';phonetic['gh']='\u0998';phonetic['h']='\u09B9';phonetic['NG']='\u099E';phonetic['j']='\u099C';phonetic['J']='\u099D';phonetic['jh']='\u099D';phonetic['c']='\u099A';phonetic['ch']='\u099B';phonetic['C']='\u099B';phonetic['th']='\u09A0';phonetic['p']='\u09AA';phonetic['f']='\u09AB';phonetic['ph']='\u09AB';phonetic['D']='\u09A6';phonetic['Dh']='\u09A7';phonetic['z']='\u09AF';phonetic['y']='\u09DF';phonetic['Ng']='\u0999';phonetic['ng']='\u0982';phonetic['l']='\u09B2';phonetic['m']='\u09AE';phonetic['sh']='\u09B6';phonetic['S']='\u09B7';phonetic['O']='\u0993';phonetic['ou']='\u099C';phonetic['OU']='\u0994';phonetic['Ou']='\u0994';phonetic['OI']='\u0990';phonetic['oI']='\u09C8';phonetic['tt']='\u09CE';phonetic['H']='\u0983';phonetic["."]="\u0964";phonetic[".."]=".";phonetic['HH']='\u09CD'+'\u200c';phonetic['NN']='\u0981';phonetic['Y']='\u09CD'+'\u09AF';phonetic['w']='\u09CD'+'\u09AC';phonetic['W']='\u09C3';phonetic['wr']='\u09C3';phonetic['x']="\u0995"+'\u09CD'+'\u09B8';phonetic['rY']=phonetic['r']+'\u200D'+'\u09CD'+'\u09AF';phonetic['L']=phonetic['l'];phonetic['Z']=phonetic['z'];phonetic['P']=phonetic['p'];phonetic['V']=phonetic['v'];phonetic['B']=phonetic['b'];phonetic['M']=phonetic['m'];phonetic['V']=phonetic['v'];phonetic['X']=phonetic['x'];phonetic['V']=phonetic['v'];phonetic['F']=phonetic['f'];phonetic['vowels']='aIiUuoiiouueEiEu';var carry='';var old_len=0;var ctrlPressed=false;var len_to_process_oi_kar=0;var first_letter=false;var carry2="";isIE=document.all?1:0;var switched=false;function checkKeyDown(ev)
{var e=(window.event)?event.keyCode:ev.which;if(e=='17')
{ctrlPressed=true;}
else if(e==16)
shift=true;}
function checkKeyUp(ev)
{var e=(window.event)?event.keyCode:ev.which;if(e=='17')
{ctrlPressed=false;}}
function parsePhonetic(evnt)
{var t=document.getElementById(activeta);var e=(window.event)?event.keyCode:evnt.which;if(e=='113')
{if(ctrlPressed){switched=!switched;return true;}}
if(switched)return true;if(ctrlPressed)
{e=0;}
if(shift)
{var char_e=String.fromCharCode(e).toUpperCase();shift=false;}
else
var char_e=String.fromCharCode(e);if(e==8||e==32)
{carry=" ";old_len=1;return;}
lastcarry=carry;carry+=""+char_e;if((phonetic['vowels'].indexOf(lastcarry)!=-1&&phonetic['vowels'].indexOf(char_e)!=-1)||(lastcarry==" "&&phonetic['vowels'].indexOf(char_e)!=-1))
{if(carry=='ii'||carry=='uu')
{carry=lastcarry+char_e;}
else
{char_e=char_e.toUpperCase();carry=lastcarry+char_e;}}
bangla=parsePhoneticCarry(carry);tempBangla=parsePhoneticCarry(char_e);if(tempBangla==".."||bangla=="..")
{return false;}
if(char_e=="+"||char_e=="="||char_e=="`")
{if(carry=="++"||carry=="=="||carry=="``")
{insertConjunction(char_e,old_len);old_len=1;return false;}
insertAtCursor("\u09CD");old_len=1;carry2=carry;carry=char_e;return false;}
else if(old_len==0)
{insertConjunction(bangla,1);old_len=1;return false;}
else if(carry=="Ao")
{insertConjunction(parsePhoneticCarry("ao"),old_len);old_len=1;return false;}
else if(carry=="ii")
{insertConjunction(phonetic['ii'],1);old_len=1;return false;}
else if(carry=="oi")
{insertAtCursor('\u09C8',0);return false;}
else if(char_e=="o")
{old_len=1;insertAtCursor('\u09CB');carry="o";return false;}
else if(carry=="oU")
{insertConjunction("\u09CC",old_len);old_len=1;return false;}
else if((bangla==""&&tempBangla!=""))
{bangla=tempBangla;if(bangla=="")
{carry="";return;}
else
{carry=char_e;insertAtCursor(bangla);old_len=bangla.length;return false;}}
else if(bangla!="")
{insertConjunction(bangla,old_len);old_len=bangla.length;return false;}}
function parsePhoneticCarry(code)
{if(!phonetic[code])
{return'';}
else
{return(phonetic[code]);}}
function insertAtCursor(myValue){var myField=document.getElementById(activeta);if(document.selection){myField.focus();sel=document.selection.createRange();sel.text=myValue;sel.collapse(true);sel.select();}
else if(myField.selectionStart||myField.selectionStart==0){var startPos=myField.selectionStart;var endPos=myField.selectionEnd;var scrollTop=myField.scrollTop;startPos=(startPos==-1?myField.value.length:startPos);myField.value=myField.value.substring(0,startPos)
+myValue
+myField.value.substring(endPos,myField.value.length);myField.focus();myField.selectionStart=startPos+myValue.length;myField.selectionEnd=startPos+myValue.length;myField.scrollTop=scrollTop;}else{var scrollTop=myField.scrollTop;myField.value+=myValue;myField.focus();myField.scrollTop=scrollTop;}}
function insertConjunction(myValue,len){var myField=document.getElementById(activeta);if(document.selection){myField.focus();sel=document.selection.createRange();if(myField.value.length>=len){sel.moveStart('character',-1*(len));}
sel.text=myValue;sel.collapse(true);sel.select();}
else if(myField.selectionStart||myField.selectionStart==0){myField.focus();var startPos=myField.selectionStart-len;var endPos=myField.selectionEnd;var scrollTop=myField.scrollTop;startPos=(startPos==-1?myField.value.length:startPos);myField.value=myField.value.substring(0,startPos)
+myValue
+myField.value.substring(endPos,myField.value.length);myField.focus();myField.selectionStart=startPos+myValue.length;myField.selectionEnd=startPos+myValue.length;myField.scrollTop=scrollTop;}else{var scrollTop=myField.scrollTop;myField.value+=myValue;myField.focus();myField.scrollTop=scrollTop;}}
function makePhoneticEditor(textAreaId)
{activeTextAreaInstance=document.getElementById(textAreaId);activeTextAreaInstance.onkeypress=parsePhonetic;activeTextAreaInstance.onkeydown=checkKeyDown;activeTextAreaInstance.onkeyup=checkKeyUp;activeTextAreaInstance.onfocus=function(){activeta=textAreaId;};}