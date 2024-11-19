let endCurrPage = false;
let endNextPage = false;
let outClass = '';
let inClass = '';



$(function () {
    init().then((bg) => {
        account = bg.account;
        gmail = account.gmail;
        Gmail.flushMails();

        let source = getUrlParam('source');
        if (source == 'dy1') {
            if (typeof (gmail) == 'undefined') {
                chrome.runtime.sendMessage({
                    cmd: CMD_GET_BG
                }, (response) => {
                    for (let i in response.account.gmail) {
                        let g = response.account.gmail[i];
                        gmail[i] = new Gmail();
                        gmail[i].id = g.id;
                        gmail[i].account = g.account;
                        gmail[i].unreadCount = g.unreadCount;
                        gmail[i].baseLink = g.baseLink;
                        gmail[i].detailUrl = g.detailUrl;
                        gmail[i].composeUrl = g.composeUrl;
                        gmail[i].setMails(g.mails);
                        gmail[i].connect = g.connect;
                        gmail[i].token = g.token;
                    }
                    openGmailPopup(true);
                });
            } else {
                openGmailPopup(true);
            }
        }
    });
});

function changeView(newView, currPage, type) {
    if (type) {
        outClass = 'pt-page-moveToLeft';
        inClass = 'pt-page-moveFromRight';
    } else {
        outClass = 'pt-page-moveToRight';
        inClass = 'pt-page-moveFromLeft';
    }
    let $currPage = $(currPage);
    let $nextPage = $(newView);
    $currPage.removeClass('no-js');
    $(".pt-page").each(function () {
        $(this).attr('class', $(this).data('originalClassList'));
    });
    $currPage.addClass("pt-page-current");
    $nextPage.addClass("pt-page-current");

    $currPage.addClass(outClass).on('animationend', function () {
        $currPage.off('animationend');
        endCurrPage = true;
        if (endNextPage) {
            onEndAnimation($currPage, $nextPage);
        }
    });

    $nextPage.addClass(inClass).on('animationend', function () {
        $nextPage.off('animationend');
        endNextPage = true;
        if (endCurrPage) {
            onEndAnimation($currPage, $nextPage);
        }
    });
}

function onEndAnimation($outpage, $inpage) {
    endCurrPage = false;
    endNextPage = false;
    $outpage.attr('class', $outpage.data('originalClassList'));
    $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current');
}

function openGmailPopup(append) {
    let selectedGmailAccount = localStorage.getItem('selected_gmail_account');
    if (!selectedGmailAccount) {
        selectedGmailAccount = 0;
    }

    if (gmail.length <= 0) {
        return;
    }

    if (!gmail[selectedGmailAccount]) {
        selectedGmailAccount = 0;
    }

    let selectedGmailObj = gmail[selectedGmailAccount];

    let content = $(tmpGmail.body);
    if (selectedGmailObj) {
        content.find('.mail-account').text(selectedGmailObj.account);
        content.find('.gmail_unread_count').text(selectedGmailObj.unreadCount);
        content.find('#account-url').attr('href', selectedGmailObj.baseLink);
        content.find('.gmail_item').attr('data-account-index', selectedGmailAccount);
    }

    let mailItems = [];
    let isHide = true;
    for (let n in gmail) {
        let g = gmail[n];

        let ignoreAccount = $(tmpGmail.ignoreAccount);
        ignoreAccount.find('.name_img').text(g.account.substr(0, 1));
        ignoreAccount.find('.gmail_name').text(g.account);
        content.find('#ignore_account_list').append(ignoreAccount);

        if (g.mails.length > 0) {
            mailItems[n] = [];
            for (let i in g.mails) {
                let item = $(tmpGmail.item);
                let mail = g.mails[i];
                let date = mail.issued.split('T')[0].split('-');
                item.attr('data-mail-index', i);
                item.attr('data-account-index', n);
                item.find('.author').text(mail.author);
                item.find('.mail-title').text(mail.title);
                item.find('.mail-summary').html('<span>&nbsp;-&nbsp;</span>' + mail.summary);
                item.find('.mail-date').text(chrome.i18n.getMessage('mail_date', [date[1], date[2]]));

                if (n != selectedGmailAccount) {
                    item.hide();
                }
                content.find('#mail-list').append(item);

                mailItems[n].push(item);
            }
        }
        let accountItem = $(tmpGmail.accountItem);
        accountItem.attr('data-account-index', n);
        accountItem.attr('data-account', g.account);
        accountItem.find('.mail-account').text(g.account);
        if (g.unreadCount > 0) {
            accountItem.find('.unread_count').text(g.unreadCount).show();
        } else {
            accountItem.find('.unread_count').hide();
        }
        accountItem.find('.name_img').text(g.account.substr(0, 1));
        accountItem.click(function () {
            localStorage.setItem('selected_gmail_account', n);
            $('#mail-list').find('.gmail_item[data-account-index!="' + n + '"]').hide();
            $('#mail-list').find('.gmail_item[data-account-index="' + n + '"]').show();
            content.find('.emai_name .mail-account').text(g.account);
            $('#account-url').attr('href', g.baseLink);
            $('.gmail_account[data-account-index!="' + n + '"]').removeClass('active');
            $(this).addClass('active');
            Gmail.setUnreadText(g.unreadCount);
            $('#gmail_compose').attr('data-compose-url', g.composeUrl);
            $('#gmail_compose').attr('data-account', g.account);
        });
        if (n == selectedGmailAccount) {
            accountItem.addClass('active');
        }
        content.find('#account-item').append(accountItem);

        if (Gmail.ignoreAccounts().indexOf(g.account) >= 0) {
            accountItem.hide();
            ignoreAccount.find('.iconfont').addClass('iconxuanzhong');
            ignoreAccount.find('.ignore_account').data('checked', 1);
            continue;
        } else {
            isHide = false;
        }
    }

    if (isHide) {
        content.find('.gmail_l_list').hide();
    }

    if (!append) {
        layer.closeAll();
        layer.open({
            type: 1,
            id: 'gmail',
            area: ['780px', '598px'],
            skin: 'pop_up_mask',
            shadeClose: true,
            content: content
        });
    } else {
        $('body').append(content);
    }

    $('.ignore_account').click(function() {
        let account = $(this).parent().find('.gmail_name').text();
        let index = Gmail.ignoreAccounts().indexOf(account);
        if (!$(this).data('checked')) {
            if (index < 0) {
                Gmail.ignoreAccounts(account);
                $('#account-item [data-account="'+ account +'"]').hide();
            }
        } else {
            let ignoreAccounts = Gmail.ignoreAccounts();
            if (index >= 0) {
                ignoreAccounts.splice(index, 1);
                Gmail.setIgnoreAccounts(ignoreAccounts);
                $('#account-item [data-account="'+ account +'"]').show();
            }
        }
        if ($('#account-item .gmail_account:visible')[0]) {
            $('#account-item .gmail_account:visible')[0].click();
            $('.gmail_l_list').show();
        } else {
            $('.gmail_l_list').hide();
        }
    });

    $('#gmail-settings-btn').click(function() {
        $('#gmail-settings-layout').toggleClass('none');
        $('#gmail-settings').toggleClass('none');
    });

    $('#gmail-settings-layout').click(function(e) {
        $('#gmail-settings-layout').toggleClass('none');
        $('#gmail-settings').toggleClass('none');
    });

    if (selectedGmailObj) {
        $('#gmail_compose').attr('data-compose-url', selectedGmailObj.composeUrl);
        $('#gmail_compose').attr('data-account', selectedGmailObj.account);
    }
    $('#gmail_compose').click(function () {
        Gmail.openCompose($(this).attr('data-compose-url'), $(this).attr('data-account'));
    });

    $('.open-mail-detail').click(async function () {
        $('.pop_up_details .gmail_detail').empty();
        changeView(".pop_up_details", ".pop_up_main", true);
        let mailItem = $(this).parents('.gmail_item');
        let accountIndex = mailItem.attr('data-account-index');
        let mailIndex = mailItem.data('mail-index');
        let mail = gmail[accountIndex].mails[mailIndex];

        $('.pop_up_details.gmail_item').attr('data-mail-index', mailIndex);

        await mail.markAsRead();
        mailItem.addClass('already_read');
        mailItem.find('.gmail_tools[data-action="read"]').addClass('hidden');
        mailItem.find('.gmail_tools[data-action="unread"]').removeClass('hidden');
        Gmail.setUnreadText(gmail[accountIndex].unreadCount);
        $('.gmail_account[data-account-index="' + accountIndex + '"]').find('.unread_count').text(gmail[accountIndex].unreadCount);

        chrome.runtime.sendMessage({
            cmd: Gmail.Action.FLUSH_RESULT,
            unread: Gmail.unreadCount()
        });

        let detail = tmpGmail.detail;
        detail = detail.replace(/__mail_title__/g, mail.title);
        await mail.getDetail();
        let messages = '';
        mail.messages.forEach((msg) => {
            messages += "<div class='mail_content_w'>";
            messages += "<div class='mail_content_title'><div> " + msg.date + "</div><div>from : " + msg.from.email + "</div>";
            msg.to.forEach(function (item) {
                messages += "<div> to : " + item.email + "</div>";
            });
            messages += "</div>";
            messages += msg.content;
            messages += "</div>"
        });
        detail = detail.replace(/__mail_content__/, messages);
        detail = detail.replace(/__mail_to__/, mail.author + "&lt;" + mail.author_email + "&gt;");

        $('.pop_up_details .gmail_detail').html(detail);

        $("#mail_content").scroll(function () {
            $("#mail_content").scrollTop() >= 10 ? $(".details_title").addClass("box_shadow") : $(".details_title").removeClass("box_shadow");
        });

        $('#gmail_send_mail').click(function () {
            let value = $('#gmail_content').val();
            if (value == '') {
                return false;
            }
            let btn = $('#gmail_send_mail');
            btn.attr('disabled', true);
            btn.removeClass('btn_active').addClass('prohibit');

            mail.reply(value, () => {
                $('#gmail_content').val('');
                btn.attr('disabled', false);
                btn.removeClass('prohibit').addClass('btn_active');
                layer.msg(chrome.i18n.getMessage("send_success"));
            }, () => {
                btn.attr('disabled', false);
                btn.removeClass('prohibit').addClass('btn_active');
            });
        });

        $('#gmail_content').keyup(function () {
            let textarea = $(this).get(0);
            let pre = document.getElementById('fit1');
            pre.innerHTML = textarea.value;
            textarea.style.height = pre.offsetHeight + 'px';
        });

        $('#gmail_content').keydown(function () {
            let pre = document.getElementById('fit1');
            pre.innerHTML = textarea.value;
            textarea.style.height = pre.offsetHeight + 'px';
        });

        if (mail.star) {
            changeStarStatus($('.pop_up_details .checkbox-star'));
        }
        $('.pop_up_details .checkbox-star').click(async function () {
            let mailItem = $(this).parents('.gmail_item');
            let accountIndex = mailItem.attr('data-account-index');
            let mailIndex = mailItem.data('mail-index');
            let mail = gmail[accountIndex].mails[mailIndex];
            let mainPageItem = $('.pop_up_main .gmail_item[data-mail-index="' + mailIndex + '"]').find('.checkbox-star');
            changeStarStatus(mainPageItem.get(0));

            if ($(this).data('star')) {
                await mail.removeStar();
            } else {
                await mail.markAsStar();
            }
        });
        return true;
    });

    $('.checkbox-star').click(async function () {
        let mailItem = $(this).parents('.gmail_item');
        let accountIndex = mailItem.attr('data-account-index');
        let mailIndex = mailItem.data('mail-index');
        let mail = gmail[accountIndex].mails[mailIndex];
        if ($(this).data('star')) {
            await mail.removeStar();
        } else {
            await mail.markAsStar();
        }
    });

    $('.gmail_tools').click(async function () {
        let mailItem = $(this).parents('.gmail_item');
        let accountIndex = mailItem.attr('data-account-index');
        let mailIndex = mailItem.data('mail-index');
        let mail = gmail[accountIndex].mails[mailIndex];
        let action = $(this).data('action');

        switch (action) {
            case 'archive':
                await mail.archive();
                break;
            case 'spam':
                await mail.markAsSpam();
                break;
            case 'delete':
                await mail.delete();
                break;
            case 'read':
                await mail.markAsRead();
                if ($('.pop_up_details').hasClass('pt-page-current')) {
                    let item = $('.pop_up_main .gmail_item[data-mail-index="' + mailIndex + '"]');
                    item.addClass('already_read');
                    item.find('.gmail_tools[data-action="read"]').addClass('hidden');
                    item.find('.gmail_tools[data-action="unread"]').removeClass('hidden');
                } else {
                    $(this).addClass('hidden');
                    mailItem.addClass('already_read');
                    mailItem.find('.gmail_tools[data-action="unread"]').removeClass('hidden');
                }
                break;
            case 'unread':
                await mail.markAsUnread();
                if ($('.pop_up_details').hasClass('pt-page-current')) {
                    let item = $('.pop_up_main .gmail_item[data-mail-index="' + mailIndex + '"]');
                    item.removeClass('already_read');
                    item.find('.gmail_tools[data-action="unread"]').addClass('hidden');
                    item.find('.gmail_tools[data-action="read"]').removeClass('hidden');
                } else {
                    $(this).addClass('hidden');
                    mailItem.removeClass('already_read');
                    mailItem.find('.gmail_tools[data-action="read"]').removeClass('hidden');
                }
                break;
        }
        if ($('.pop_up_details').hasClass('pt-page-current')) {
            $('.js_back').trigger('click');
        } else {
            if (action == 'archive' || action == 'spam' || action == 'delete') {
                mailItem.remove();
            }
        }

        Gmail.setUnreadText(gmail[accountIndex].unreadCount);
        $('.gmail_account[data-account-index="' + accountIndex + '"]').find('.unread_count').text(gmail[accountIndex].unreadCount);
        chrome.runtime.sendMessage({
            cmd: Gmail.Action.FLUSH_RESULT,
            unread: Gmail.unreadCount()
        });
        return true;
    });

    $('#btn_change_view').click(function () {
        if ($('#gmail_default').hasClass('hidden')) {
            $("#btn_change_view .iconfont").removeClass('iconyoujian-').addClass('icongongneng01');
            $('#gmail_default').removeClass('hidden');
            $('#gmail_mobile').addClass('hidden');

        } else {
            $("#btn_change_view .iconfont").removeClass('icongongneng01').addClass('iconyoujian-');
            $('#gmail_default').addClass('hidden');
            if ($('#gmail_mobile iframe').length == 0) {
                $('#gmail_mobile').html('<iframe src="' + GMAIL_MOBILE_URL + '"></iframe>');
            }
            $('#gmail_mobile').removeClass('hidden');
        }
    });

    $(".pt-page").each(function () {
        let $page = $(this);
        $page.data('originalClassList', $page.attr('class'));
    });

    $(".pt-page").eq(0).addClass('pt-page-current');


    $("#cen_main").scroll(function () {
        $("#cen_main").scrollTop() >= 10 ? $(".my_main").addClass("box_shadow") : $(".my_main").removeClass("box_shadow");
    });

    $('.js_back').click(function () {
        changeView(".pop_up_main", ".pop_up_details", false);
    });

    $('.gmail-tools-all').click(function () {
        let action = $(this).data('action');
        $('.gmail_l_list .checkbox:not([data-checkbox-all])').each(function () {
            if ($(this).data('checked')) {
                $(this).parents('.gmail_item').find('.gmail_tools[data-action="' + action + '"]').trigger('click');
            }
        });
    });

    $('#gmail_flush_mails').click(function () {
        Gmail.flushMails(function (response) {
            let msg = chrome.i18n.getMessage("refresh_success");
            // if (!response.connect) {
            //     msg = chrome.i18n.getMessage("refresh_fail");
            // }
            layer.msg(msg);
        });
    });

    // tips text
    $(".js_hover_tips_text .bqX").hover(function () {
        $(this).children('.tips_text_w').addClass("hover");
    }, function () {
        $(this).children('.tips_text_w').removeClass("hover");
    });
}