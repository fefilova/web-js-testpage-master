class Language {
  constructor($element) {

    this.$element = $element;

    $(window).on('change-language', this.editLang);

    $(window).on('main:ready', (e, data) => {

      const $langs =  this.$element.find(".langs__item")

      data.texts.forEach(element => {
        const $langItem = $(`<li class="langs__item">${element}</li>`)
        $langItem.insertBefore($langs)
      });
    })
  }

  editLang = (e) => {
    //const $items = this.$element.find('.langs__item')
    console.log(e)
  }
}


$('.langs__items').each((index, element) => {
  new Language($(element));
});



