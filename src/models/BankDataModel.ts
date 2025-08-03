import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./userModel";

@Entity("bank_data")
export class BankData {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Users, user => user.bankData, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "user_id" })
    user!: Users;

    @Column("decimal", { precision: 15, scale: 2, default: 0 })
    saldoTotal!: number;

    @Column("decimal", { precision: 15, scale: 2, default: 0 })
    ganhosParceiros!: number;

    @Column("decimal", { precision: 15, scale: 2, default: 0 })
    ganhosInvestimentos!: number;

    @Column("decimal", { precision: 15, scale: 2, default: 0 })
    faturaCartao!: number;

    @CreateDateColumn()
    criadoEm!: Date;

    @UpdateDateColumn()
    atualizadoEm!: Date;
}
