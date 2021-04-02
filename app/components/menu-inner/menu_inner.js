class Menu {
  constructor($element) {

    this.$element = $element;

    $(window).on('page-changed', this.editMenu);

    $(window).on('main:ready', (e, data) => {


      const $list = this.$element.find(".menu-inner__item")
      data.menu.list.forEach(element => {
        const $menuItem = $(`<li class="menu-inner__item"><a href="${element.href}" data-use-city="${element.data}">${element.text}</a> </li>`)
        $menuItem.insertBefore($list)
        $menuItem.find('a').on("click", this.onClick);
      });

      const $linksButton =  this.$element.find(".menu-inner__download-button-text")
      const $menuItem = $(`<div class="menu-inner__download-button-text">${data.menu.downloadButton}</div>`)
      $menuItem.insertBefore($linksButton)

      const $footer =  this.$element.find(".menu-inner__footer")
      const $menuFoot = $(`<p class="menu-inner__footer">${data.menu.footer}</p>`)
      $menuFoot.insertBefore($footer)

    });
  }

  onClick = (e) => {
    console.log(e)
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
}

$('.menu-inner').each((index, element) => {
  new Menu($(element));
});

