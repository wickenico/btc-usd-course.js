/* --------------------------------------------------------------
Script: btc-usd-course.js
Author: Nico Wickersheim
Version: 1.0.0

Description:
Displays the current bitcoin course in US-Dollar $ based on 
the data of coinbase API.

Changelog:

1.0.0: Initialization
-------------------------------------------------------------- */
const url = `https://api.coinbase.com/v2/prices/spot?currency=USD`
const req = new Request(url)
const res = await req.loadJSON()
const amount = res.data.amount;
const currency = res.data.currency;
const i = new Request('https://icons.iconarchive.com/icons/froyoshark/enkel/96/Bitcoin-icon.png')
const img = await i.loadImage()


let widget = createWidget(amount, currency, img)
if (config.runsInWidget) {
  // create and show widget
  Script.setWidget(widget)
  Script.complete()
}
else {
  widget.presentSmall()
}

// Assemble widget layout 
function createWidget(amount, currency, img) {
  let w = new ListWidget()
  w.backgroundColor = new Color("#1A1A1A")

  let image = w.addImage(img)
  image.imageSize = new Size(45, 45)
  image.centerAlignImage()

  w.addSpacer(8)

  let staticText = w.addText("Bitcoin - Dollar:")
  staticText.textColor = Color.white()
  staticText.font = Font.boldSystemFont(12)
  staticText.centerAlignText()

  w.addSpacer(8)

  let amountTxt = w.addText(amount + ' ' + currency)
  amountTxt.textColor = Color.orange()
  amountTxt.font = Font.systemFont(16)
  amountTxt.centerAlignText()

  //   let currencyTxt = w.addText(currency)
  //   currencyTxt.textColor = Color.gray()
  //   currencyTxt.font = Font.systemFont(10)
  //   currencyTxt.centerAlignText()

  w.addSpacer(8)

  // Show current date in format Day. Month Year
  let currentDate = new Date();
  let lastDate = w.addDate(currentDate);
  lastDate.textColor = Color.gray()
  lastDate.font = Font.mediumSystemFont(10)
  lastDate.centerAlignText();

  w.setPadding(0, 0, 0, 0)
  return w
}