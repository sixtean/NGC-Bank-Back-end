"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankData = void 0;
const typeorm_1 = require("typeorm");
const userModel_1 = require("./userModel");
let BankData = class BankData {
};
exports.BankData = BankData;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], BankData.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => userModel_1.Users, user => user.bankData, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", userModel_1.Users)
], BankData.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BankData.prototype, "saldoTotal", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BankData.prototype, "ganhosParceiros", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BankData.prototype, "ganhosInvestimentos", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 15, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], BankData.prototype, "faturaCartao", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BankData.prototype, "criadoEm", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BankData.prototype, "atualizadoEm", void 0);
exports.BankData = BankData = __decorate([
    (0, typeorm_1.Entity)("bank_data")
], BankData);
