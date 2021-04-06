class Menu {
  constructor($element) {

    this.$element = $element;

    $(window).on('page-changed', this.editMenu);

    $(window).on('change-language', this.editLanguage);

    $(window).on('main:ready', (e, data) => {

      this.texts = data.texts;
      this.elements = data.menu.list;
      const $list = this.$element.find(".menu-inner__item")
      const lastLang = this.$element.find('.langs p').text();
      this.elements.forEach(element => {
        const $menuItem = $(`<li class="menu-inner__item"><a href="${element.href}"
        data-use-city="${element.data}"data-trnslt="${element.text}" data-lang="${lastLang}"></a></li>`)
        $menuItem.insertBefore($list)
        $menuItem.find('a').on("click", this.onClick);
      });

      const $linksButton = this.$element.find(".menu-inner__download-button-text")
      const $menuItem = $(`<div class="menu-inner__download-button-text" data-trnslt="${data.menu.downloadButton}"
        data-lang="${lastLang}"></div>`)
      $menuItem.insertBefore($linksButton)

      const $footer = this.$element.find(".menu-inner__footer")
      const $menuFoot = $(`<p class="menu-inner__footer" data-trnslt="${data.menu.footer}" data-lang="${lastLang}"></p>`)
      $menuFoot.insertBefore($footer)
    });
  }

  onClick = (e) => {
    const $currentTarget = $(e.currentTarget);
    e.preventDefault();
    $currentTarget.trigger("change-page", $currentTarget.text());
  }

  editMenu = (e, text) => {
    const $items = this.$element.find('.menu-inner__item')
    $items.each((index) => {
      const $item = $items.eq(index)
      const isActive = $item.find('a').text() === text;
      $item.toggleClass("menu-inner__item_choosed", isActive)
    })
  }
  editLanguage = (e, lang) => {
    const $dataElements = this.$element.find('[data-trnslt]');
    const texts = this.texts;

    $dataElements.each((index) => {
      const $element = $dataElements.eq(index)
      const attr = $element.data('trnslt')
      const text = texts[attr][lang]
      $element.text(text)
    })
  }
}

$('.menu-inner').each((index, element) => {
  new Menu($(element));
});
