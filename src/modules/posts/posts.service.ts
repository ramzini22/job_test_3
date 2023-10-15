import { PostsStorage } from './../../services/posts.storage';
import { Injectable } from "@nestjs/common";
import { GetPostDto } from "./dto/responses/get-post.dto";
import { PostsExceptions } from "./posts.exceptions";
import { PostEntity } from "./entities/post.entity";
import  {ErrorDataDto } from "../../common/responses/error-data.dto"
@Injectable()
export class PostsService{
    
    public async getManyPosts(
        limit:number,
        offset:number,
        q:string
    ): Promise<ErrorDataDto<GetPostDto[]>>{
        const errorData = new ErrorDataDto<GetPostDto[]>()

        const postsErrorData = await this.getPostsFromStorage()
        if(postsErrorData.haveError())
            return errorData.setError(postsErrorData.getError())

        const sortedPostEntities = this.sortPosts(postsErrorData.getData(), limit, offset, q);
          
        return errorData.setData(GetPostDto.getDtosFromManyPostEntities(sortedPostEntities));
    }

    public async getOnePost(id: number): Promise<ErrorDataDto<GetPostDto>>{
        const errorData = new ErrorDataDto<GetPostDto>();

        const postEntities = await this.getPostsFromStorage();
        const postEntity = postEntities.getData().find(p=>p.getId() === id)

        if(!postEntity)
            return errorData.setError(PostsExceptions.NotFound())

        return errorData.setData(GetPostDto.getDtoFromOnePostEntity(postEntity));
    }

    public async getUserPosts(
        limit:number,
        offset:number,
        q:string,
        userId:number
    ): Promise<ErrorDataDto<GetPostDto[]>>{
            const errorData = new ErrorDataDto<GetPostDto[]>()

            const postEntities = await this.getPostsFromStorage();
            const sortedPostEntities = await this.sortPosts(postEntities.getData(), limit, offset, q, userId);

            return errorData.setData(GetPostDto.getDtosFromManyPostEntities(sortedPostEntities));
    
    }

    private sortPosts(
        postEntitiesOutside:PostEntity[],
        limit?:number,
        offset?:number,
        q?:string,
        userId?:number
    ): PostEntity[]{
        let postsEntities:PostEntity[] = postEntitiesOutside

        if(userId)
            postsEntities = postsEntities.filter(pe=>pe.getUserId() === userId)
        if(offset)
            postsEntities = postsEntities.slice(offset);
        if(limit)
            postsEntities = postsEntities.slice(0, limit);
        if(q)
            postsEntities = postsEntities.filter(pe=>pe.getTitle().indexOf(q)!==-1 || pe.getBody().indexOf(q)!==-1)

        return postsEntities
    }

    private async getPostsFromStorage(): Promise<ErrorDataDto<PostEntity[]>>{

        const errorData = new ErrorDataDto<PostEntity[]>()

        try{
            const postsEntities = PostsStorage.getValue()
            errorData.setData(postsEntities);
        }catch(e){
            return errorData.setError(PostsExceptions.BadRequestWithOtherService());
        }

        return errorData
    }

}