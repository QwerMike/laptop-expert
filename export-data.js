const DESCRIPTION_RGX = new RegExp(/Екран +(\d+).+(Intel|Amd) [^/]+\(.+\).+RAM (\d+) ГБ.+(?:HDD|SSD) (\d+) (?:ГБ|ТБ)/i);

let nodes = document.querySelectorAll('div[data-view_type="catalog_with_hover"]');
let result = Array.from(nodes, 
    x => {
        let price       = x.querySelector('div.g-price-uah').innerText
          , link        = x.querySelector('div.g-i-tile-i-title.clearfix a').href
          , description = DESCRIPTION_RGX.exec(x.querySelector('div.g-i-tile-desc-wrap div.short-description').innerText);
        
        price = price.split(/\s/).slice(0, 2).join('');
        let display = description[1]
          , cpu     = description[2].toLowerCase()
          , ram     = description[3]
          , drive   = description[4];
        
        return { link, price, display, cpu, ram, drive };
    }
);

/**
 * Converts array of laptops to Prolog predicates
 * @param {Array} laptops -- Array of { link, price, display, cpu, ram, drive }
 * @returns {String} -- Prolog predicates
 */
function exportToProlog(laptops) {
  return laptops.map(x => 'laptop('
                        + [x.display, x.cpu, x.ram, x.drive, x.price].join(', ')
                        + ',\n    "' + x.link + '").')
                .join('\n');
}