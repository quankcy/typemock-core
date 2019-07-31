import {Page} from "puppeteer";
import {Interceptors} from "./interceptor-builder";

async function pageOnRequest(page: Page, interceptors: Interceptors) {
    await page.setRequestInterception(true);

    page.on('request', request => {
        interceptors.getFirstByRequest(request)
    })
}