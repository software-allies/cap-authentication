import { Injectable, Optional } from '@angular/core';
var ConfigService = /** @class */ (function () {
    function ConfigService(config) {
        if (config) {
            this.apiUrl = config.apiUrl;
            this.loginEndpoint = config.loginEndpoint;
        }
    }
    ConfigService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ConfigService.ctorParameters = function () { return [
        { type: ConfigService, decorators: [{ type: Optional },] },
    ]; };
    return ConfigService;
}());
export { ConfigService };
//# sourceMappingURL=config.service.js.map