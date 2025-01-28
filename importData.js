"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@sanity/client");
var client = (0, client_1.createClient)({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    useCdn: true,
    apiVersion: '2025-01-13',
    token: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
});
function uploadImageToSanity(imageUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var response, buffer, bufferImage, asset, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    console.log("Uploading image: ".concat(imageUrl));
                    return [4 /*yield*/, fetch(imageUrl)];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Failed to fetch image: ".concat(imageUrl));
                    }
                    return [4 /*yield*/, response.arrayBuffer()];
                case 2:
                    buffer = _a.sent();
                    bufferImage = Buffer.from(buffer);
                    return [4 /*yield*/, client.assets.upload('image', bufferImage, {
                            filename: imageUrl.split('/').pop(),
                        })];
                case 3:
                    asset = _a.sent();
                    console.log("Image uploaded successfully: ".concat(asset._id));
                    return [2 /*return*/, asset._id];
                case 4:
                    error_1 = _a.sent();
                    console.error('Failed to upload image:', imageUrl, error_1);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function uploadProduct(product) {
    return __awaiter(this, void 0, void 0, function () {
        var imageId, document_1, createdProduct, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, uploadImageToSanity(product.imageUrl)];
                case 1:
                    imageId = _a.sent();
                    if (!imageId) return [3 /*break*/, 3];
                    document_1 = {
                        _type: 'product',
                        title: product.title,
                        price: product.price,
                        productImage: {
                            _type: 'image',
                            asset: {
                                _ref: imageId,
                            },
                        },
                        tags: product.tags,
                        dicountPercentage: product.discountPercentage, // Typo in field name: dicountPercentage -> discountPercentage
                        description: product.description,
                        isNew: product.isNew,
                    };
                    return [4 /*yield*/, client.create(document_1)];
                case 2:
                    createdProduct = _a.sent();
                    console.log("Product ".concat(product.title, " uploaded successfully:"), createdProduct);
                    return [3 /*break*/, 4];
                case 3:
                    console.log("Product ".concat(product.title, " skipped due to image upload failure."));
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    console.error('Error uploading product:', error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function importProducts() {
    return __awaiter(this, void 0, void 0, function () {
        var response, products, _i, products_1, product, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, fetch('https://template6-six.vercel.app/api/products')];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    products = _a.sent();
                    _i = 0, products_1 = products;
                    _a.label = 3;
                case 3:
                    if (!(_i < products_1.length)) return [3 /*break*/, 6];
                    product = products_1[_i];
                    return [4 /*yield*/, uploadProduct(product)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_3 = _a.sent();
                    console.error('Error fetching products:', error_3);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
importProducts();
