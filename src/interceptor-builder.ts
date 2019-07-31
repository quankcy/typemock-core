import HttpMethod from "./http-method";
import {Interceptor} from "./interceptor";
import {Request} from 'puppeteer';

export class InterceptorBuilder {
    private allInterceptors: Interceptor[];
    private httpMethodBasedMap: Map<HttpMethod, Interceptor[]>;

    constructor() {
        this.httpMethodBasedMap = this.createHttpMethodBasedMap();
        this.allInterceptors = new Array<Interceptor>();
    }

    public addInterceptor(interceptor: Interceptor): InterceptorBuilder {
        this.allInterceptors.push(interceptor);
        interceptor.httpMethods.forEach(httpMethod => {
            this.httpMethodBasedMap.get(httpMethod).push(interceptor)
        });
        return this;
    }

    public build() {
        return new Interceptors(this.allInterceptors, this.httpMethodBasedMap)
    }

    private createHttpMethodBasedMap(): Map<HttpMethod, Interceptor[]> {
        return new Map<HttpMethod, Interceptor[]>(
            Object.values(HttpMethod)
                .map(httpMethod => [httpMethod, new Array<Interceptor>()])
        )
    }
}

export class Interceptors {
    private readonly allInterceptors: Interceptor[];
    private readonly httpMethodBasedMap: Map<HttpMethod, Interceptor[]>;

    constructor(allInterceptors: Interceptor[], httpMethodBasedMap: Map<HttpMethod, Interceptor[]>) {
        this.allInterceptors = allInterceptors;
        this.httpMethodBasedMap = httpMethodBasedMap;
    }

    public getAll(): Interceptor[] {
        return this.allInterceptors;
    }

    public getByHttpMethod(httpMethod: HttpMethod): Interceptor[] {
        return this.httpMethodBasedMap.get(httpMethod);
    }

    public getFirstByRequest(request: Request): Interceptor {
        return this
            .getByHttpMethod(HttpMethod[`${request.method()}`])
            .find(interceptor => interceptor.condition(request))
    }
}