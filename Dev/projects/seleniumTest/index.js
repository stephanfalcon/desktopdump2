const {Builder, By, Key, until} = require('selenium-webdriver');

const clickButt = (driver) => {
  applyButt = 1
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


async function signIn(driver){

  await driver.get('https://secure.indeed.com/account/login')

  await driver.findElement(By.name('__email')).sendKeys('hoobaloob999@gmail.com')
  await driver.findElement(By.name('__password')).sendKeys('fzymx2525')
  await driver.findElement(By.xpath('//*[@id="login-submit-button"]')).click()

  // await driver.get('https://indeed.com')

  return
}

async function apply(driver){


  delay(3000) 
  await driver.findElement(By.id('text-input-what')).sendKeys('fullstack', Key.RETURN);
  delay(3000)
  let results = await driver.findElements(By.className('result'))
  console.log(results)
  for (let i = 0; i < results.length; i++) {
    if(i==0){
      const ele = results[i];
      let url = await ele.getAttribute('href')
      await driver.executeScript(`window.open("${url}");`);
      console.log("poop")
    }
  } 

    let tabs = await driver.getAllWindowHandles()



    await driver.switchTo().window(tabs[1])

    delay(3000)

    let apply = await driver.wait(until.elementsLocated(By.className('jobsearch-IndeedApplyButton-newDesign')))

    await driver.wait(until.elementIsVisible(apply[1])).click()

    return
}



(async function example() {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    // await driver.get('http://indeed.com');
    // await driver.findElement(By.id('text-input-what')).sendKeys('fullstack', Key.RETURN);
    // await delay(3000)

    // let results = await driver.findElements(By.className('result'))
    // for (let i = 0; i < results.length; i++) {
    //     if(i==0){
    //     const ele = results[i];
    //     let url = await ele.getAttribute('href')
    //     await driver.executeScript(`window.open("${url}");`);
    //   }
    // } 

    //   let tabs = await driver.getAllWindowHandles()

    //   await driver.switchTo().window(tabs[1])

    //   delay(3000)


    //   let apply = await driver.wait(until.elementsLocated(By.className('jobsearch-IndeedApplyButton-newDesign')))

    //   await driver.wait(until.elementIsVisible(apply[1])).click()
      
      
    //   await driver.findElement(By.name('__email')).sendKeys('hoobaloob999@gmail.com')
    //   await driver.findElement(By.name('__password')).sendKeys('fzymx2525')

    //   await driver.findElement(By.xpath('//*[@id="login-submit-button"]')).click()

    await signIn(driver)
    await driver.wait(until.titleIs('Job Search | Indeed'))
    await apply(driver)

  } catch(error){
    console.error(error)
  }finally {
    // driver.quit()

  }
})();

// const {Builder, By, Key, until} = require("selenium-webdriver")

// (async function example(){
//     let driver = await new Builder().forBrowser("firefox").build()

//     try {
//         await driver.get("http://www.google.com/ncr")
//         body = driver.find_element(By.xpath 'body')
//         body.send_keys(:control, 't')
        
//         // driver.quit
//     }finally{
//         await driver.quit()
//     }
    
// }
//     )()

// const {Builder, By, Key, until} = require('selenium-webdriver');

// (async function example() {
//   let driver = await new Builder().forBrowser('firefox').build();
//   try {
//     await driver.get('http://www.google.com/ncr');
//     await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//     await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//   } finally {
//     // await driver.quit();
//   }
// })();