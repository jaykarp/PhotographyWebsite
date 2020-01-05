import { ObjectType, Field, Int } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity("photo")
export class Photo extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column("text")
    url: string;

    @Field()
    @Column("text")
    category: string;

    @Field()
    @Column("text")
    name: string;

    @Field()
    @Column("text")
    description: string;

    @Field(() => String)
    @Column("date")
    date: string;
}
