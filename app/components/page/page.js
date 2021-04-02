$(function () {
  $.getJSON("../data/data.json", function (data) {
    $(window).trigger("main:ready", data);
  });
})

class Page {
  constructor($element) {
    $(window).on('main:ready', this.onReady)
    $element.on('change-page', this.onChangePage)

  }
  onReady = (e, data) => {
    const $phone = $(".header__phone")
    const $headerPhone = $(`<a class="header__phone" href="tel:+7-495-662-7677">${data.headerPhone}</a>`)
    $headerPhone.insertBefore($phone)

    const $maintext = $(".inner-part__title")
    const $partContent = $(`<div class="inner-part__title">${data.partContent}</div>`)
    $partContent.insertBefore($maintext)

    const $text = $(".inner-part-column")
    const $partColumn = $(`<div class="inner-part-column">${data.partColumn}</div>`)
    $partColumn.insertBefore($text)

  }

  onChangePage = (e, text) => {
    $('title').text(text);
    $(window).trigger("page-changed", text);
  }

}
new Page($('body'));

