window.onload = function() {
    const DOMAIN = 'https://abcdpdf.com/';
    const temp = '<li>' +
                    '<a href="%url%" target="_blank">' +
                        '<img src="%img%" />' +
                        '<span>%name%</span>' +
                    '</a>' +
                '</li>';
    const itemList = [
        'merge_pdf',
        'split_pdf',
        'pdf_to_word',
        'pdf_to_excel',
        'pdf_to_ppt',
        'pdf_to_jpg',
        'pdf_to_png',
        'word_to_pdf',
        'excel_to_pdf',
        'ppt_to_pdf',
        'jpg_to_pdf',
        'png_to_pdf'
    ];
    
    const ul = document.getElementById('item-list');
    for (let i in itemList) {
        let item = itemList[i];
        let elTemp = document.createElement('div');
        let html = temp;
        html = html.replace('%url%', DOMAIN + item.replace(/_/g, '-') + '.html');
        html = html.replace('%img%', '../images/pdf/' + item + '.svg');
        html = html.replace('%name%', chrome.i18n.getMessage(item));
        elTemp.innerHTML = html;
        ul.append(elTemp.firstChild);
    }
}