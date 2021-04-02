class Language {
  constructor($element) {

    this.$element = $element;

    $(window).on('change-language', this.editLang);

    $(window).on('main:ready', (e, data) => {

      const $langs_item =  this.$element.find(".langs__item")

      data.texts.forEach(element => {
        const $langItem = $(`<li class="langs__item">${element}</li>`)
        $langItem.insertBefore($langs_item)
      });

      const $dropdown = this.$element.find('p')
      $dropdown.on("click", this.onClickDropDown);
    })
  }

  onClickDropDown = (e) => {
    console.log(e)
    const $items = this.$element.find('.langs__items')
    $items.addClass("langs_active")

  }

  editLang = () => {

  }
}


$('.langs').each((index, element) => {
  new Language($(element));
});



