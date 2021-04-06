$(function () {
  $.getJSON("../data/data.json", function (data) {
    $(window).trigger("main:ready", data);
  });
})

class Page {
  constructor($element) {
    this.$element = $element;
    $(window).on('main:ready', this.onReady)
    $element.on('change-page', this.onChangePage)
    $(window).on('change-language', this.editLanguage);
  }
  onReady = (e, data) => {

    const lastLang = this.$element.find('.langs p').text();

    this.texts = data.texts;
    const $phone = $(".header__phone")
    const $headerPhone = $(`<a class="header__phone" href="tel:+7-495-662-7677">${data.headerPhone}</a>`)
    $headerPhone.insertBefore($phone)

    const $mainText = $(".inner-part__title")
    const $partContent = $(`<div class="inner-part__title" data-trnslt="${data.partContent}"
        data-lang="${lastLang}"></div>`)
    $partContent.insertBefore($mainText)

    const $text = $(".inner-part-column")
    const $partColumn = $(`<div class="inner-part-column" data-trnslt="${data.partColumn}"
        data-lang="${lastLang}"></div>`)
    $partColumn.insertBefore($text)
  }

  onChangePage = (e, text) => {
    $('title').text(text);
    $(window).trigger("page-changed", text);
  }
  editLanguage = (e, lang) => {
    const $dataElements = this.$element.find('[data-trnslt]');
    const texts = this.texts;
    //const $lastLang = $('body').find('[data-lang]');

    $dataElements.each((index) => {
      const $element = $dataElements.eq(index)
      const attr = $element.data('trnslt')
      console.log(lang,attr);
      const text = texts[attr][lang]
      $element.text(text)
    })
    }

}
new Page($('body'));

