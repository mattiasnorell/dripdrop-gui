export class RouteMetaData {
}

export class RouteLink {
    public name: string = '';
    public path: string = '';
    public component?: any;
    public components?: any;
    public props?: boolean | Function = false;
    public meta: RouteMetaData = new RouteMetaData();
    public children?: RouteLink[] = [];
}