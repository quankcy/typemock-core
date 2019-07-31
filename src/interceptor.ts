import {Request} from 'puppeteer';
import HttpMethod from "./http-method";

export class Interceptor{
    private _httpMethods: HttpMethod[];
    private _condition: MatchCondition;
    private _mock: Mock;

    get httpMethods(): HttpMethod[] {
        return this._httpMethods;
    }

    get condition(): MatchCondition {
        return this._condition;
    }
    get mock(): Mock {
        return this._mock;
    }

    constructor(httpMethods: HttpMethod[], condition: MatchCondition, mock: Mock) {
        this._httpMethods = httpMethods;
        this._condition = condition;
        this._mock = mock;
    }
}

interface MatchCondition {
    (request: Request): boolean;
}

interface Mock{
    (request: Request): void;
}