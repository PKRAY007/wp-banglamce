/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function banglakb(obj_id,bkb_layout){
    if(!obj_id) obj_id = 'content';
    if(!bkb_layout) layout = phonetic;
    jQuery('#'+obj_id).bnKb({
        'switchkey': {
            "webkit":"k",
            "mozilla":"y",
            "safari":"k",
            "chrome":"k",
            "msie":"y"
        },
        'driver': bkb_layout
    });
}
function makeAvroEditor(textAreaId) {
    activeTextAreaInstance = document.getElementById(textAreaId);
    activeTextAreaInstance.onfocus = function() { activeta = textAreaId; };
    addTranslit(null, activeTextAreaInstance);
    switched = false;
    //confirm("All makeAvroEditor done");
}
function makeUnijoyEditor(textAreaId)
{activeTextAreaInstance=document.getElementById(textAreaId);activeTextAreaInstance.onkeypress=parseunijoy;
activeTextAreaInstance.onkeydown=checkKeyDown;activeTextAreaInstance.onkeyup=checkKeyUp;
activeTextAreaInstance.onfocus=function(){activeta=textAreaId;};
}


function banglakb_public_comment(layout){
    banglakb('comment',layout);
}
function banglakb_admin_phonetic(){
    banglakb('content',phonetic);

}
function banglakb_admin_probhat(){
    banglakb('content',probhat);
}

function banglakb_toggle(){
    jQuery(this).bnKb.toggle();
}

function banglakb_addpostbuttons(){
    if(swiToolbar = document.getElementById('ed_toolbar')){
        var swiLength, swiBut, swiStart, swiEnd;

        swiLength = edButtons.length;
        edButtons[swiLength] = new edButton('ed_swiPhonetic','Phonetic','', '','');
        var swiBut = swiToolbar.lastChild;
        while (swiBut.nodeType != 1){
            swiBut = swiBut.previousSibling;
        }
        swiBut = swiBut.cloneNode(true);
        swiToolbar.appendChild(swiBut);
        swiBut.value = 'Phonetic';
        swiBut.title = 'Phonetic';
        swiBut.onclick = banglakb_admin_phonetic;
        swiBut.id = 'ed_wpphonetic';


        swiLength = edButtons.length;
        edButtons[swiLength] = new edButton('ed_swiProbhat','Probhat','', '','');
        var swiBut = swiToolbar.lastChild;
        while (swiBut.nodeType != 1){
            swiBut = swiBut.previousSibling;
        }
        swiBut = swiBut.cloneNode(true);
        swiToolbar.appendChild(swiBut);
        swiBut.value = 'Probhat';
        swiBut.title = 'Probhat';
        swiBut.onclick = banglakb_admin_probhat;
        swiBut.id = 'ed_wpprobhat';

        swiLength = edButtons.length;
        edButtons[swiLength] = new edButton('ed_swiEnglish','English','', '','');
        var swiBut = swiToolbar.lastChild;
        while (swiBut.nodeType != 1){
            swiBut = swiBut.previousSibling;
        }
        swiBut = swiBut.cloneNode(true);
        swiToolbar.appendChild(swiBut);
        swiBut.value = 'Toggle';
        swiBut.title = 'Toggle between Bangla and English';
        swiBut.onclick = banglakb_toggle;
        swiBut.id = 'ed_wptoggle';

    }
}
