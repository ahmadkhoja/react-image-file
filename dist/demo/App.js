"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ImageUploadField_1 = require("../ImageUploadField");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.onFilesChange = function (files) {
            _this.setState({ files: files });
        };
        _this.onFileChange = function (file) {
            _this.setState({ file: file });
        };
        _this.onTextChange = function (evt) {
            var text = evt.target.value;
            _this.setState({ text: text });
        };
        _this.onSubmit = function (evt) {
            evt.preventDefault();
            var _a = _this.state, files = _a.files, file = _a.file[0], text = _a.text;
            var body = new FormData();
            ;
            body.append('text', text);
            body.append('file', file);
            files.map(function (f, i) { return body.append("files[" + i + "]", f); });
            fetch('http://localhost:8000', { method: 'POST', body: body })
                .then(function (response) { return response.json(); })
                .then(function (response) { return console.log(response); });
            console.log(body);
            console.log({ text: text, file: file, files: files });
        };
        _this.state = { text: '', files: [], file: [] };
        return _this;
    }
    ;
    App.prototype.render = function () {
        var _a = this.state, files = _a.files, text = _a.text, file = _a.file;
        return (React.createElement("div", null,
            React.createElement("form", { onSubmit: this.onSubmit },
                React.createElement("h1", null, "React-Image"),
                React.createElement("label", null, "Fill the form, then open the console to see results when you press \"ok\""),
                React.createElement("br", null),
                React.createElement("fieldset", null,
                    React.createElement("legend", null, "Just a text field"),
                    React.createElement("input", { id: "text", type: "text", onChange: this.onTextChange, value: text })),
                React.createElement("fieldset", null,
                    React.createElement("legend", null, "Multiple files upload"),
                    React.createElement(ImageUploadField_1.ImageUploadField, { multiple: true, files: files, label: "Upload Images", onChange: this.onFilesChange })),
                React.createElement("fieldset", null,
                    React.createElement("legend", null, "Single file upload"),
                    React.createElement(ImageUploadField_1.ImageUploadField, { multiple: false, files: file, label: "Upload Images", onChange: this.onFileChange })),
                React.createElement("input", { type: "submit", value: "ok" }))));
    };
    return App;
}(react_1.PureComponent));
exports.App = App;
exports.default = App;
//# sourceMappingURL=App.js.map