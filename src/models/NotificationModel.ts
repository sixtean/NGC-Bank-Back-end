import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Users } from "./userModel";

@Entity("notifications")
export class Notification {
    @PrimaryGeneratedColumn("uuid")
    id!: string;


    @Column()
    icon!: string;

    @Column()
    titulo!: string;

    @Column()
    mensagem!: string;

    @Column({ default: false })
    lida!: boolean;

    @CreateDateColumn()
    criadaEm!: Date;

    @ManyToOne(() => Users, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user!: Users
}