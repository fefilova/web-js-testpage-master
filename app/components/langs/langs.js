class Language {
  constructor($element) {

    this.$element = $element;

    $(window).on('change-language', this.editLang);

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

    })
  }

  onClickDropDown = (e) => {
    const $items = this.$element.find('.langs')
    const isActive = $items.hasClass("langs_active")
    $items.toggleClass("langs_active", !isActive)
  }

  editLang = (e) => {
    const $items = this.$element.find('.langs')
   //$items.data("key")
    console.log($(e.currentTarget).text())
    $('.langs p').text($(e.currentTarget).text())
    $items.toggleClass("langs_active", false)
  }
}

$('.header__right').each((index, element) => {
  new Language($(element));
});
