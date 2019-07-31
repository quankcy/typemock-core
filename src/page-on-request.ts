import {Page} from "puppeteer";
import {Interceptors} from "./interceptor-builder";
import {Interceptor} from "./interceptor";

async function pageOnRequest(page: Page, interceptors: Interceptors) {
    await page.setRequestInterception(true);

    page.on('request', request => {
        const interceptor: Interceptor = interceptors.getFirstByRequest(request);

        if(!interceptor)
            request.continue();
    })
}