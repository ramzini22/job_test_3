import { ApiProperty } from "@nestjs/swagger";
import { PostEntity } from "../../entities/post.entity";

export class GetPostDto{
    @ApiProperty({description:"Unique post ID"})
    private readonly id:number;

    @ApiProperty({description:"Unique user ID, who created a post"})
    private readonly userId:number;

    @ApiProperty({description:"Title of post"})
    private readonly title:string;

    @ApiProperty({description:"Description of post"})
    private readonly body:string;

    constructor(id, userId, title, body){
        this.id = id
        this.userId = userId;
        this.title = title;
        this.body = body;
    }

    static getDtoFromOnePostEntity= (postEntity:PostEntity)=> 
        new GetPostDto(
            postEntity.getId(),
            postEntity.getUserId(),
            postEntity.getTitle(),
            postEntity.getBody(),
        )

    static getDtosFromManyPostEntities= (postEntities:PostEntity[])=>
        postEntities.map(p=>this.getDtoFromOnePostEntity(p))

}