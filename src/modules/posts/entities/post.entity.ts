import { CustomBaseEntity } from "../../../common/conf/custom-base.entity";
import { PostEntityType } from "../types/post-entity.type";

export class PostEntity extends CustomBaseEntity{

    private readonly userId : number;

    private readonly title : string;

    private readonly body : string;

    constructor({id, userId, title, body} : PostEntityType){
        super(id)
        this.userId = userId;
        this.title = title;
        this.body = body;
    }

    public getUserId() : number{
        return this.userId
    }

    public getTitle() : string{
        return this.title
    }

    public getBody() : string{
        return this.body
    }
}