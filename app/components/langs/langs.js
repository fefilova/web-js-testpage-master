class Language {
  constructor($element) {

    this.$element = $element;

    $(window).on('change-language');

    $(window).on('main:ready', (e, data) => {

      const $langsItems = this.$element.find(".langs__items");
      const languages = Object.keys(data.texts[0]);
      const $dropdown = this.$element.find('p')

      languages.forEach(key => {
        const $langsItem = $(`<li class="langs__item" data-key="${key}">${key}</li>`)
        $langsItems.append($langsItem)
        $langsItem.on("click", this.editLang)
      });
      $dropdown.on("click", this.onClickDropDown);

      //TODO: сделать сохранение в localstorage requestAnimationFrame
      $(window).trigger("change-language","ru");
    })
  }

  onClickDropDown = (e) => {
    const $items = this.$element.find('.langs')
    const isActive = $items.hasClass("langs_active")
    $items.toggleClass("langs_active", !isActive)
  }

  editLang = (e) => {
    const $items = this.$element.find('.langs')
    const lang = $(e.currentTarget).data("key");
    this.$element.find('.langs p').text(lang);
    $items.toggleClass("langs_active", false)
    $(window).trigger("change-language",lang);
  }
}

$('.header__right').each((index, element) => {
  new Language($(element));
});
