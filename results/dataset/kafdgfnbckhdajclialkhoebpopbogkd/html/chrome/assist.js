function removeOverlay(){
    if(document.getElementsByClassName('keep-settings-assist') != null && document.getElementsByClassName('keep-settings-assist').length > 0){
        document.getElementsByClassName('keep-settings-assist')[0].remove();
    }
    removeAssist();
}
function removeAssist(){
    if(document.getElementsByClassName('assist-overlay') != null && document.getElementsByClassName('assist-overlay').length > 0){
        document.getElementsByClassName('assist-overlay')[0].remove();
    }
}

function assistNT()
{
    var firstLoad = localStorage.getItem("assistNT");
    if(!firstLoad){
        var style = document.createElement('link');
        style.href = './skin/css/assistNT.css';
        style.rel = 'stylesheet';
        document.head.appendChild(style);
        var instructions = document.createElement('div');
        instructions.className = 'assist-instructions';
        instructions.innerHTML = 'Click "<b>Keep it</b>" to keep this Chrome Extension New Tab with Web Search.';
        var installed = document.createElement('div');
        installed.className = 'assist-extension-installed';
        installed.innerText = 'Extension Successfully Installed!';
        var checkbox = document.createElement('img');
        checkbox.className = 'assist-checkbox';
        checkbox.src = './skin/images/checkbox.png';
        var background = document.createElement('div');
        background.className = 'assist-background-area';
        background.appendChild(checkbox);
        background.appendChild(installed);
        background.appendChild(instructions);
        var arrow = document.createElement('img');
        arrow.className = 'assist-green-arrow';
        arrow.src = './skin/images/green-arrow-isolated.gif';
        var overlay = document.createElement('div');
        overlay.className = 'assist-overlay';
        if(navigator.userAgent.match(/Mac/i)) overlay.style = 'right: 50%;top: 120px;margin-right:-100px;';
        else overlay.style = 'right: 50%; top: 120px; margin-right:-240px;';
        overlay.appendChild(arrow);
        overlay.appendChild(background);
        var backdrop = document.createElement('div');
        backdrop.className = 'assist-backdrop';
        var keepsettingsassist = document.createElement('div');
        keepsettingsassist.className = 'keep-settings-assist';
        keepsettingsassist.appendChild(backdrop);
        keepsettingsassist.appendChild(overlay);
        keepsettingsassist.onclick = removeOverlay;
        document.body.appendChild(keepsettingsassist);
        localStorage.setItem("assistNT", true);
        setTimeout(removeAssist,30000);
        setTimeout(removeOverlay,31000);
    }
}



assistNT();
if(navigator.userAgent.match(/Mac/i) != null)
      {
        document.getElementById('extlinks').style.display = 'none';
		document.getElementById('extlinks2').style.display = 'none';
      }
