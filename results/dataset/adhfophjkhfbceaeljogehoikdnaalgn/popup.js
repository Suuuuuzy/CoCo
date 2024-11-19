/* global $, chrome */
$(() => {
    $('#step1').show();
    $('#step2').hide();

    $('#btn-login').click(() => {
        const userid = $('#userid').val();
        const userpw = $('#userpw').val();

        if (!userid || !userpw) {
            return;
        }
        procLogin({
            userid,
            userpw
        });
    });

    $('#btn-logout').click(procLogout);

    $('#btn-exclude').click(() => {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true
            },
            function(tabs) {
                const tab = tabs[0];
                const url = tab.url;
                const patt = /(http(s)?:\/\/)?\w+(\.\w+)+/gi;
                const ret = url.match(patt);

                if (ret && ret.length > 0) {
                    const realUrl = ret[0].replace('http://', '').replace('https://', '');

                    chrome.storage.sync.get(['urlExcludeList'], function(data) {
                        // console.log('data urlExcludeList', data)
                        const arr = data.urlExcludeList || [];
                        if (!arr.includes(realUrl)) {
                            arr.push(realUrl);
                        }
                        setUrlList(arr);
                    });
                }
            }
        );
    });

    $('body').on('click', '.btn-delete', async function() {
        // 삭제버느
        console.log('?????', $(this), $(this).attr('key'));

        const items = await getUrlList();
        console.log('items', items);

        const i = items.indexOf($(this).attr('key'));

        if (i >= 0) {
            items.splice(i, 1);
            setUrlList(items);
        }
    });

    init();

    function renderUrlList(items) {
        $('#url-list').html(items.map((url, key) => `<div class='item' ><a class='btn-delete' key='${url}'>X</a>${url}</div>`).join(''));
    }
    function getUrlList() {
        return new Promise((resolve) => {
            chrome.storage.sync.get(['urlExcludeList'], function(data) {
                resolve(data.urlExcludeList || []);
            });
        });
    }
    function setUrlList(arr) {
        chrome.storage.sync.set({ urlExcludeList: arr }, function() {
            // console.log('Save User Login')
            renderUrlList(arr);
        });
    }

    function init() {
        chrome.storage.sync.get(['userkey', 'urlExcludeList'], function(data) {
            // console.log('data', data)
            if (data && data.userkey) {
                procLogin({
                    key: data.userkey
                });
            }

            if (data && data.urlExcludeList) {
                $('#url-list').html(
                    data.urlExcludeList
                        .map((url, key) => `<div class='item' ><a class='btn-delete' key='${url}'>X</a>${url}</div>`)
                        .join('')
                );
            }
        });
    }

    function procLogin(params) {
        $.ajax({
            method: 'POST',
            url: 'https://chrome.einfomax.co.kr/apis/user/login',
            dataType: 'json',
            data: params
        }).done(function(data) {
            // console.log('Sample of data:', data)

            if (data.msg === 'success' && data.key) {
                $('#btn-settings').attr('href', `https://chrome.einfomax.co.kr/settings/${data.key}`);
                chrome.storage.sync.set({ userkey: data.key }, function() {
                    // console.log('Save User Login')
                    $('#step1').hide();
                    $('#step2').show();
                });
            }
        });
    }
});

function procLogout() {
    chrome.storage.sync.set({ userkey: null }, function() {
        $('#step1').show();
        $('#step2').hide();
    });
}
