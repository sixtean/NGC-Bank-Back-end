import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BankData } from "./BankDataModel";
import { Notification } from "./NotificationModel";

@Entity("users")
export class Users {

    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ nullable: false})
    nome!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    senha!: string;

    @Column({ unique: true })
    cpf!: string;

    @Column()
    codigoVerificacao!: string;

    @Column({ default: false })
    verificado!: boolean;

    @Column({ type: 'text', nullable: true })
    token!: string | null;

    @Column({ type: 'enum', enum: ['user', 'admin', 'programador'], default: 'user' })
    role!: 'user' | 'admin' | 'programador';

    @OneToMany(() => BankData, bank => bank.user)
    bankData!: BankData[];

    @OneToMany(() => Notification, notification => notification.user)
    notificacoes!: Notification[];
}