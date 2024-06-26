const puppeteer = require('puppeteer');
const readline = require('readline');

console.log("running browser");

async function startPuppet() {
    // Launch the browser and open a new blank page
const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

// used to pause before moving on;
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function ask(string) {
    return new Promise(resolve => {
        r1.question(`${string}\n`, resolve);
    })
}


// Navigate the page to a URL. 

await page.goto('https://www.linkedin.com/login');

// Set screen size 
await page.setViewport({width: 1080, height: 1024});

// Login into linkedIn.

    // Type Username
    console.log('...inserting user')
    await page.type('[name="session_key"]', 'ryan.dev6912@gmail.com', { delay: 100 } )


    await sleep(2000)
    // Type Password
    console.log('...inserting password')
    await page.type('[name="session_password"]', 'Rhino691241!$', { delay: 100 })


    await sleep(2000)
    // Click Sign In
    console.log("...signing in")
    await page.locator('.btn__primary--large').click()

    const captcha = await page.locator('#captcha-internal');

    if (captcha) {
        console.log('...captcha found');
        // Wait for a specific element that appears after CAPTCHA is solved
        await ask('Please solve the captcha and then press enter');
        console.log('captcha solved')
    }

    // go to jobs page

    await sleep(2000);
    await page.goto('https://linkedin.com/jobs/search/', { waitUntil:"load" });

    await sleep(2000);
    // input keywords for job search
    console.log('...typing job')
    await page.waitForSelector('[aria-label="Search by title, skill, or company"]', { visible: true });
    await page.type('[aria-label="Search by title, skill, or company"]', 'junior software engineer', { delay: 100 });

    await sleep(2000);
    // input location for job search
    console.log('...typing location')
    await page.waitForSelector('[aria-label="City, state, or zip code"]', { visible: true });
    const locationInput = await page.$('[aria-label="City, state, or zip code"]');
    locationInput.click({ clickCount: 3 });
    await page.keyboard.press('Backspace');
    await sleep(2000);
    await page.type('[aria-label="City, state, or zip code"]', 'Florida, United States', { delay: 100 });

    //search for jobs
    console.log('...searching for jobs')
    await page.locator('.jobs-search-box__submit-button').click();

    


await page.screenshot({
    path: `screenshot.jpg`, 
    fullPage: true
});

// setTimeout(async () => await browser.close(), 120000) //close screen after 2 minutes

}
startPuppet()