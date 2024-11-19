const tmpGmail = {
    login: `
        <div style="display: none;"  class="eject_wrapper">
            <div class="cen_main">
                <div class="title">
                    <span class="title_text">Must login</span>  
                    <font class="iconfont iconshuaxin"></font>
                </div>
                <h4>You haven't signed in to Gmail yet,Please login and authorize first.</h4>
                <div class="btn_p">Login Gmail</div>
            </div>
        </div>
    `,
    auth: `
        <div style="display: none;"  class="eject_wrapper">
            <div class="cen_main">
                <div class="title">
                    <span class="title_text">Manage your Gmail account</span>  
                    <font class="eject_iconfont iconfont iconguanbi "></font>
                </div>
            
                <div class="eject_mail_user">
                    <div class="gmail_user_li">
                        <span class="ignore_account checkbox"><font class="iconfont iconkuang"></font></span>  <div class="name_img">8</div> <div class="gmail_name">810853875cl@gmail.com</div>
                    </div>
                    <div class="gmail_user_li">
                        <span class="ignore_account checkbox"><font class="iconfont iconkuang"></font></span>  <div class="name_img">8</div> <div class="gmail_name">810853875cl@gmail.com</div>
                    </div>
                    <div class="gmail_user_li">
                        <span class="ignore_account checkbox"><font class="iconfont iconkuang"></font></span>  <div class="name_img">8</div> <div class="gmail_name">810853875cl@gmail.com</div>
                    </div>
                    <div class="gmail_user_li">
                        <span class="ignore_account checkbox"><font class="iconfont iconkuang"></font></span>  <div class="name_img">8</div> <div class="gmail_name">810853875cl@gmail.com</div>
                    </div>
                    <div class="gmail_user_li">
                        <span class="ignore_account checkbox"><font class="iconfont iconkuang"></font></span>  <div class="name_img">8</div> <div class="gmail_name">810853875cl@gmail.com</div>
                    </div>
                </div>
                <div class="btn_p mail_user_btn">OK</div>
            </div>
        </div>
    `,
    body: `
        <div class="views_wrapper">
            <div id="gmail-settings-layout" class="js_select_user select_user_w none"></div>
            <div id="gmail-settings" class="select_user_box none">
                <div class="cen_box">
                    <div class="overflow_y">
                        <div class="user_title">Ignore account</div>
                        <div id="ignore_account_list"></div>
                    </div>
                </div>
            </div>
            <div class="pop_up_main pt-page">
                <div class="user_list_flex">
                    <div class="user_list">
                        <ul id="account-item"></ul>
                        <div class="add_user js_hover_tips_text bqX_10">
                            <span class="bqX bq_x_iconfont">
                                <a href="https://accounts.google.com/signin/v2/identifier?hl=zh-CN&continue=https%3A%2F%2Fmail.google.com%2Fmail&service=mail&flowName=GlifWebSignIn&flowEntry=AddSession" style="color:#5a6576" target="_blank"><i class=" iconfont iconaddTodo-nav"></i></a>
                                <span class="tips_text_w user_list_text">
                                    <p class="gmail_tips_text">Add another account</p>
                                </span>
                            </span>
                        </div>

                        <div class="add_user js_manage_account bqX_10">
                            <span class="bqX bq_x_iconfont">
                                <i id="gmail-settings-btn" class=" iconfont iconshezhi1"></i>
                            </span>
                        </div>
                    </div>
                    <div class="gmail_l_list">
                        <div class="emai_name">
                            <span class="text_16"><a id="account-url" href="" target="_blank"><span class="mail-account"></span> (<span class="gmail_unread_count">0</span>)</a></span>
                            <div class="tools js_hover_tips_text bqX_17 margin_right_20" style="display:none">
                                <span id="btn_change_view" class="bqX bq_x_iconfont">
                                    <i class=" iconfont icongongneng01"></i>
                                    <span class="tips_text_w">
                                        <p class="tips_text">`+ chrome.i18n.getMessage('switch_view') + `</p>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div id="gmail_mobile" class="gmail-iframe hidden"></div>
                        <div id="gmail_default" class="my_main_wrapper">
                            <div class="my_main">
                                <div class="my_main_w">
                                    <div class="tools js_hover_tips_text">
                                        <div class="tool_library margin_right_11">
                                            <div class="tool_library_l bq_k checkbox" data-checkbox-all="1">
                                                <i class=" iconfont iconkuang"></i>
                                            </div>
                                        </div>

                                        <div class="tools_s margin_right_11">
                                            <span class="bqX bq_x_iconfont margin_right_11 gmail-tools-all" data-action="archive"> 
                                                <i class="iconfont iconguidang"></i>
                                                <span class="tips_text_w">
                                                    <p class="tips_text">`+ chrome.i18n.getMessage('archive') + `</p>
                                                </span>
                                            </span>

                                            <span class="bqX bq_x_iconfont margin_right_11 gmail-tools-all" data-action="spam"> 
                                                <i class="iconfont iconjinggao"></i>
                                                <span class="tips_text_w">
                                                    <p class="tips_text">`+ chrome.i18n.getMessage('mark_as_spam') + `</p>
                                                </span>
                                            </span>

                                            <span class="bqX bq_x_iconfont margin_right_11 gmail-tools-all" data-action="delete"> 
                                                <i class="iconfont iconshanchu"></i>
                                                <span class="tips_text_w">
                                                    <p class="tips_text">`+ chrome.i18n.getMessage('delete') + `</p>
                                                </span>
                                            </span>
                                        </div>

                                        <div class="tools_s margin_right_11">
                                            <span class="bqX bq_x_iconfont margin_right_11 gmail-tools-all" data-action="read"> 
                                                <i class="iconfont iconyoujian"></i>
                                                <span class="tips_text_w">
                                                    <p class="tips_text">`+ chrome.i18n.getMessage('mark_as_read') + `</p>
                                                </span>
                                            </span>
                                        </div>

                                        <span id="gmail_flush_mails" class="bqX bq_x_iconfont margin_right_11"> 
                                            <i class=" iconfont iconshuaxin"></i>
                                            <span class="tips_text_w">
                                                <p class="tips_text">`+ chrome.i18n.getMessage("refresh") + `</p>
                                            </span>
                                        </span>
                                    </div>
                            </div>
                            </div>
                            <div class="cen_main" id="cen_main">
                                <ul id="mail-list">
                                    
                                </ul>
                                <div class="compose_wrapper">
                                    <div id="gmail_compose" class="compose">
                                        <i class="iconfont iconaddTodo-nav"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pt-page pop_up_details gmail_item" data-account-index="" data-mail-index="">
                <div class="nav">
                    <div class="js_back nav_back pointer">
                        <i class=" iconfont  iconfangxiangjiantou-you"></i>
                    </div>
                    <div class="tools js_hover_tips_text bqX_17 margin_right_20">
                        <span class="bqX bq_x_iconfont gmail_tools" data-action="archive"> 
                            <i class=" iconfont iconguidang"></i>
                            <span class="tips_text_w">
                                <p class="tips_text">`+ chrome.i18n.getMessage('archive') + `</p>
                            </span>
                        </span>
                        <span class="bqX bq_x_iconfont gmail_tools" data-action="spam"> 
                            <i class="iconfont iconjinggao"></i>
                            <span class="tips_text_w">
                                <p class="tips_text">`+ chrome.i18n.getMessage('mark_as_spam') + `</p>
                            </span>
                        </span>
                        <span class="bqX bq_x_iconfont gmail_tools" data-action="delete"> 
                            <i class=" iconfont iconshanchu"></i>
                            <span class="tips_text_w ">
                                <p class="tips_text">`+ chrome.i18n.getMessage('delete') + `</p>
                            </span>
                        </span>
                        <span class="bqX bq_x_iconfont gmail_tools" data-action="unread">
                            <i class=" iconfont iconyoujian-"></i>
                            <span class="tips_text_w">
                                <p class="tips_text">`+ chrome.i18n.getMessage('mark_as_unread') + `</p>
                            </span>
                        </span>
                    </div>
                </div>
                <div class="gmail_detail">
                
                </div>
            </div>
        </div>
        `,
    accountItem: `
        <li class="gmail_account" data-account-index="" data-account="">
            <div class="name_img">m</div>
            <font class="tips unread_count"></font>
            <span class="user_list_name">
                <p class="gmail_tips_text mail-account"></p>
            </span>
        </li>
    `,
    ignoreAccount: `
        <div class="gmail_user_li">
            <span class="ignore_account checkbox"><font class="iconfont iconkuang"></font></span>  <div class="name_img"></div> <div class="gmail_name"></div>
        </div>
    `,
    item: `
        <li class="gmail_item" data-account-index="" data-mail-index="">
            <div class="let">
                <span class="bqX checkbox"> <i class="iconfont iconkuang "></i></span>
                <span class="bqX checkbox-star"> <i class="iconfont iconuninterested"></i></span>
            </div>
            <div class="js_open in_open inaline">
                <div class="name inaline author">
                </div>
                <div class="open-mail-detail in inaline">
                    <span class="zt mail-title"></span><span class="mail-summary yt"><span>&nbsp;-&nbsp;</span>__mail_summary__</span>
                </div>
            </div>
            <div class="rig rig_time">
                <span class="time mail-date"></span>
            </div>
            <div class="js_hover_tips_text rig rig_tools">
                <span class="bqX gmail_tools" data-action="archive"> 
                    <i class=" iconfont iconguidang"></i>
                    <span class="tips_text_w">
                        <p class="tips_text">`+ chrome.i18n.getMessage('archive') + `</p>
                    </span>
                </span>
                <span class="bqX gmail_tools" data-action="spam"> 
                    <i class="iconfont iconjinggao"></i>
                    <span class="tips_text_w">
                        <p class="tips_text">`+ chrome.i18n.getMessage('mark_as_spam') + `</p>
                    </span>
                </span>
                <span class="bqX gmail_tools" data-action="delete"> 
                    <i class=" iconfont iconshanchu"></i>
                    <span class="tips_text_w ">
                        <p class="tips_text">`+ chrome.i18n.getMessage('delete') + `</p>
                    </span>
                </span>
                <span class="bqX gmail_tools" data-action="read">
                    <i class=" iconfont iconyoujian"></i>
                    <span class="tips_text_w">
                        <p class="tips_text">`+ chrome.i18n.getMessage('mark_as_read') + `</p>
                    </span>
                </span>
                <span class="bqX gmail_tools hidden" data-action="unread">
                    <i class=" iconfont iconyoujian-"></i>
                    <span class="tips_text_w">
                        <p class="tips_text">`+ chrome.i18n.getMessage('mark_as_unread') + `</p>
                    </span>
                </span>
            </div>
        </li>
    `,
    detail: `
        <div class="details_title">
            <div class="title inaline">__mail_title__</div>
            <div class="js_hover_tips_text bqX_17" style="margin-top: 4px;">
                <span class="bqX bq_x_iconfont margin_right_11 checkbox-star"> 
                    <i class=" iconfont iconuninterested"></i>
                </span>
            </div>
        </div>
        <div id="mail_content" class="in">
            __mail_content__
        </div>
        <div class="reply">
            <div class="lef">
            <i class="iconfont icongerenzhongxinxuanzhong"></i>
            </div>
            <div class="in_input">
                <div class="name">`+ chrome.i18n.getMessage('send_to') + ` __mail_to__</div>
                <pre id="fit1" class="hide"></pre>
                <textarea id="gmail_content"></textarea>
            </div>
            <div class="rig">
                <div id="gmail_send_mail" class="btn btn_active pointer">`+ chrome.i18n.getMessage('send') + `</div>
            </div>
        </div>
    `
};
