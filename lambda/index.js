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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3 = new client_s3_1.S3Client({
    region: 'us-east-1',
    endpoint: 'http://host.docker.internal:4566',
    forcePathStyle: true,
});
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log('Event:', event);
    console.log('Records:', event.Records);
    for (const record of event.Records) {
        if (record.eventName === 'INSERT') {
            const newItem = (_a = record.dynamodb) === null || _a === void 0 ? void 0 : _a.NewImage;
            const id = (_b = newItem === null || newItem === void 0 ? void 0 : newItem.id) === null || _b === void 0 ? void 0 : _b.S;
            const body = JSON.stringify(newItem, null, 2);
            if (id) {
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: 'my-bucket',
                    Key: `records/${id}.json`,
                    Body: body,
                    ContentType: 'application/json',
                });
                yield s3.send(command);
                console.log(`Saved record ${id} to S3`);
            }
        }
    }
});
exports.handler = handler;
