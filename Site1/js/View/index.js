"use strict";
$(function () {
    $("#index_Header").load("../MainPageHeader.html");
    let includes = $('[data-include]');
    $.each(includes, function () {
        let file = 'views/MainPageView/' + $(this).data('include') + '.html';
        $(this).load(file);
    });
});
