/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "ionic-angular/components/list/list";
import * as i2 from "ionic-angular/config/config";
import * as i3 from "ionic-angular/platform/platform";
import * as i4 from "ionic-angular/gestures/gesture-controller";
import * as i5 from "ionic-angular/platform/dom-controller";
import * as i6 from "@angular/forms";
import * as i7 from "../../../../../../../node_modules/ionic-angular/components/item/item.ngfactory";
import * as i8 from "ionic-angular/components/item/item";
import * as i9 from "ionic-angular/util/form";
import * as i10 from "ionic-angular/components/item/item-reorder";
import * as i11 from "ionic-angular/components/item/item-content";
import * as i12 from "ionic-angular/components/label/label";
import * as i13 from "../../../../../../../node_modules/ionic-angular/components/input/input.ngfactory";
import * as i14 from "ionic-angular/components/input/input";
import * as i15 from "ionic-angular/components/app/app";
import * as i16 from "ionic-angular/components/content/content";
import * as i17 from "../../../../../../../node_modules/ionic-angular/components/button/button.ngfactory";
import * as i18 from "ionic-angular/components/button/button";
import * as i19 from "./login.component";
import * as i20 from "../../authentication.service";
var styles_AuthLoginComponent = [""];
var RenderType_AuthLoginComponent = i0.ɵcrt({ encapsulation: 0, styles: styles_AuthLoginComponent, data: {} });
export { RenderType_AuthLoginComponent as RenderType_AuthLoginComponent };
export function View_AuthLoginComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵeld(1, 0, null, null, 59, "ion-list", [], null, null, null, null, null)), i0.ɵdid(2, 16384, null, 0, i1.List, [i2.Config, i0.ElementRef, i0.Renderer, i3.Platform, i4.GestureController, i5.DomController], null, null), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(4, 0, null, null, 55, "form", [["novalidate", ""]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngSubmit"], [null, "submit"], [null, "reset"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("submit" === en)) {
        var pd_0 = (i0.ɵnov(_v, 6).onSubmit($event) !== false);
        ad = (pd_0 && ad);
    } if (("reset" === en)) {
        var pd_1 = (i0.ɵnov(_v, 6).onReset() !== false);
        ad = (pd_1 && ad);
    } if (("ngSubmit" === en)) {
        var pd_2 = (_co.onSubmit() !== false);
        ad = (pd_2 && ad);
    } return ad; }, null, null)), i0.ɵdid(5, 16384, null, 0, i6.ɵbf, [], null, null), i0.ɵdid(6, 540672, null, 0, i6.FormGroupDirective, [[8, null], [8, null]], { form: [0, "form"] }, { ngSubmit: "ngSubmit" }), i0.ɵprd(2048, null, i6.ControlContainer, null, [i6.FormGroupDirective]), i0.ɵdid(8, 16384, null, 0, i6.NgControlStatusGroup, [i6.ControlContainer], null, null), (_l()(), i0.ɵted(-1, null, ["\n\n            "])), (_l()(), i0.ɵeld(10, 0, null, null, 19, "ion-item", [["class", "item item-block"]], null, null, null, i7.View_Item_0, i7.RenderType_Item)), i0.ɵdid(11, 1097728, null, 3, i8.Item, [i9.Form, i2.Config, i0.ElementRef, i0.Renderer, [2, i10.ItemReorder]], null, null), i0.ɵqud(335544320, 1, { contentLabel: 0 }), i0.ɵqud(603979776, 2, { _buttons: 1 }), i0.ɵqud(603979776, 3, { _icons: 1 }), i0.ɵdid(15, 16384, null, 0, i11.ItemContent, [], null, null), (_l()(), i0.ɵted(-1, 2, ["\n                "])), (_l()(), i0.ɵeld(17, 0, null, 1, 2, "ion-label", [["primary", ""], ["stacked", ""]], null, null, null, null, null)), i0.ɵdid(18, 16384, [[1, 4]], 0, i12.Label, [i2.Config, i0.ElementRef, i0.Renderer, [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), i0.ɵted(-1, null, ["Email"])), (_l()(), i0.ɵted(-1, 2, ["\n                "])), (_l()(), i0.ɵeld(21, 0, null, 3, 7, "ion-input", [["autocapitalize", "off"], ["formControlName", "email"], ["id", "email"], ["ngDefaultControl", ""], ["spellcheck", "false"], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i0.ɵnov(_v, 22)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i0.ɵnov(_v, 22).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i0.ɵnov(_v, 22)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i0.ɵnov(_v, 22)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.credentials.email = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, i13.View_TextInput_0, i13.RenderType_TextInput)), i0.ɵdid(22, 16384, null, 0, i6.DefaultValueAccessor, [i0.Renderer2, i0.ElementRef, [2, i6.COMPOSITION_BUFFER_MODE]], null, null), i0.ɵprd(1024, null, i6.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i6.DefaultValueAccessor]), i0.ɵdid(24, 671744, null, 0, i6.FormControlName, [[3, i6.ControlContainer], [8, null], [8, null], [2, i6.NG_VALUE_ACCESSOR]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i6.NgControl, null, [i6.FormControlName]), i0.ɵdid(26, 16384, null, 0, i6.NgControlStatus, [i6.NgControl], null, null), i0.ɵdid(27, 5423104, null, 0, i14.TextInput, [i2.Config, i3.Platform, i9.Form, i15.App, i0.ElementRef, i0.Renderer, [2, i16.Content], [2, i8.Item], [2, i6.NgControl], i5.DomController], { type: [0, "type"] }, { input: "input", blur: "blur" }), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵted(-1, 2, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(31, 0, null, null, 19, "ion-item", [["class", "item item-block"]], null, null, null, i7.View_Item_0, i7.RenderType_Item)), i0.ɵdid(32, 1097728, null, 3, i8.Item, [i9.Form, i2.Config, i0.ElementRef, i0.Renderer, [2, i10.ItemReorder]], null, null), i0.ɵqud(335544320, 4, { contentLabel: 0 }), i0.ɵqud(603979776, 5, { _buttons: 1 }), i0.ɵqud(603979776, 6, { _icons: 1 }), i0.ɵdid(36, 16384, null, 0, i11.ItemContent, [], null, null), (_l()(), i0.ɵted(-1, 2, ["\n                "])), (_l()(), i0.ɵeld(38, 0, null, 1, 2, "ion-label", [["primary", ""], ["stacked", ""]], null, null, null, null, null)), i0.ɵdid(39, 16384, [[4, 4]], 0, i12.Label, [i2.Config, i0.ElementRef, i0.Renderer, [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), i0.ɵted(-1, null, ["Password"])), (_l()(), i0.ɵted(-1, 2, ["\n                "])), (_l()(), i0.ɵeld(42, 0, null, 3, 7, "ion-input", [["formControlName", "password"], ["id", "password"], ["ngDefaultControl", ""], ["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "blur"], [null, "compositionstart"], [null, "compositionend"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (i0.ɵnov(_v, 43)._handleInput($event.target.value) !== false);
        ad = (pd_0 && ad);
    } if (("blur" === en)) {
        var pd_1 = (i0.ɵnov(_v, 43).onTouched() !== false);
        ad = (pd_1 && ad);
    } if (("compositionstart" === en)) {
        var pd_2 = (i0.ɵnov(_v, 43)._compositionStart() !== false);
        ad = (pd_2 && ad);
    } if (("compositionend" === en)) {
        var pd_3 = (i0.ɵnov(_v, 43)._compositionEnd($event.target.value) !== false);
        ad = (pd_3 && ad);
    } if (("ngModelChange" === en)) {
        var pd_4 = ((_co.credentials.password = $event) !== false);
        ad = (pd_4 && ad);
    } return ad; }, i13.View_TextInput_0, i13.RenderType_TextInput)), i0.ɵdid(43, 16384, null, 0, i6.DefaultValueAccessor, [i0.Renderer2, i0.ElementRef, [2, i6.COMPOSITION_BUFFER_MODE]], null, null), i0.ɵprd(1024, null, i6.NG_VALUE_ACCESSOR, function (p0_0) { return [p0_0]; }, [i6.DefaultValueAccessor]), i0.ɵdid(45, 671744, null, 0, i6.FormControlName, [[3, i6.ControlContainer], [8, null], [8, null], [2, i6.NG_VALUE_ACCESSOR]], { name: [0, "name"], model: [1, "model"] }, { update: "ngModelChange" }), i0.ɵprd(2048, null, i6.NgControl, null, [i6.FormControlName]), i0.ɵdid(47, 16384, null, 0, i6.NgControlStatus, [i6.NgControl], null, null), i0.ɵdid(48, 5423104, null, 0, i14.TextInput, [i2.Config, i3.Platform, i9.Form, i15.App, i0.ElementRef, i0.Renderer, [2, i16.Content], [2, i8.Item], [2, i6.NgControl], i5.DomController], { type: [0, "type"] }, { input: "input", blur: "blur" }), (_l()(), i0.ɵted(-1, null, ["\n                "])), (_l()(), i0.ɵted(-1, 2, ["\n            "])), (_l()(), i0.ɵted(-1, null, ["\n\n            "])), (_l()(), i0.ɵeld(52, 0, null, null, 2, "button", [["block", ""], ["ion-button", ""], ["primary", ""], ["type", "submit"]], [[8, "disabled", 0]], null, null, i17.View_Button_0, i17.RenderType_Button)), i0.ɵdid(53, 1097728, null, 0, i18.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { block: [0, "block"] }, null), (_l()(), i0.ɵted(-1, 0, ["Login"])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(56, 0, null, null, 2, "button", [["block", ""], ["ion-button", ""], ["secondary", ""], ["type", "submit"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.createAccount() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i17.View_Button_0, i17.RenderType_Button)), i0.ɵdid(57, 1097728, null, 0, i18.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { block: [0, "block"] }, null), (_l()(), i0.ɵted(-1, 0, ["Create an account"])), (_l()(), i0.ɵted(-1, null, ["\n\n            "])), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵted(-1, null, ["\n        "]))], function (_ck, _v) { var _co = _v.component; var currVal_7 = _co.loginform; _ck(_v, 6, 0, currVal_7); var currVal_15 = "email"; var currVal_16 = _co.credentials.email; _ck(_v, 24, 0, currVal_15, currVal_16); var currVal_17 = "text"; _ck(_v, 27, 0, currVal_17); var currVal_25 = "password"; var currVal_26 = _co.credentials.password; _ck(_v, 45, 0, currVal_25, currVal_26); var currVal_27 = "text"; _ck(_v, 48, 0, currVal_27); var currVal_29 = ""; _ck(_v, 53, 0, currVal_29); var currVal_30 = ""; _ck(_v, 57, 0, currVal_30); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵnov(_v, 8).ngClassUntouched; var currVal_1 = i0.ɵnov(_v, 8).ngClassTouched; var currVal_2 = i0.ɵnov(_v, 8).ngClassPristine; var currVal_3 = i0.ɵnov(_v, 8).ngClassDirty; var currVal_4 = i0.ɵnov(_v, 8).ngClassValid; var currVal_5 = i0.ɵnov(_v, 8).ngClassInvalid; var currVal_6 = i0.ɵnov(_v, 8).ngClassPending; _ck(_v, 4, 0, currVal_0, currVal_1, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6); var currVal_8 = i0.ɵnov(_v, 26).ngClassUntouched; var currVal_9 = i0.ɵnov(_v, 26).ngClassTouched; var currVal_10 = i0.ɵnov(_v, 26).ngClassPristine; var currVal_11 = i0.ɵnov(_v, 26).ngClassDirty; var currVal_12 = i0.ɵnov(_v, 26).ngClassValid; var currVal_13 = i0.ɵnov(_v, 26).ngClassInvalid; var currVal_14 = i0.ɵnov(_v, 26).ngClassPending; _ck(_v, 21, 0, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14); var currVal_18 = i0.ɵnov(_v, 47).ngClassUntouched; var currVal_19 = i0.ɵnov(_v, 47).ngClassTouched; var currVal_20 = i0.ɵnov(_v, 47).ngClassPristine; var currVal_21 = i0.ɵnov(_v, 47).ngClassDirty; var currVal_22 = i0.ɵnov(_v, 47).ngClassValid; var currVal_23 = i0.ɵnov(_v, 47).ngClassInvalid; var currVal_24 = i0.ɵnov(_v, 47).ngClassPending; _ck(_v, 42, 0, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24); var currVal_28 = !_co.loginform.valid; _ck(_v, 52, 0, currVal_28); }); }
export function View_AuthLoginComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "auth-app-login", [], null, null, null, View_AuthLoginComponent_0, RenderType_AuthLoginComponent)), i0.ɵdid(1, 114688, null, 0, i19.AuthLoginComponent, [i20.AuthenticationService, i6.FormBuilder], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AuthLoginComponentNgFactory = i0.ɵccf("auth-app-login", i19.AuthLoginComponent, View_AuthLoginComponent_Host_0, {}, { submit: "submit", changePage: "changePage" }, []);
export { AuthLoginComponentNgFactory as AuthLoginComponentNgFactory };
//# sourceMappingURL=login.component.ngfactory.js.map