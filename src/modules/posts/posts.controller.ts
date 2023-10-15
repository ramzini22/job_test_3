import { PostsStorage } from './../../services/posts.storage';
import { Controller, Get, Param, Query } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { GetPostDto } from "./dto/responses/get-post.dto";
import { DataResponse } from "../../common/responses/data-response.dto";
import { MetaDataArrayResponse } from "../../common/responses/meta-data-array-response";
import { ParseIdPipe } from "../../common/conf/parse-id.pipe";
import { throwExceptionByCustomError } from "../../common/utils/error.utils";
import { QuerySearchUnlimitedPaginationDto } from "../../common/requests/dto/query-search-unlimited-pagination.dto";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { ApiDataResponse } from "../../common/decorators/api-data-response.decorator";
import { ApiMetaDataArrayResponse } from "../../common/decorators/api-meta-data-array-response.decorator";
import { MetaDto } from "../../common/responses/meta.dto";

@Controller("posts")
@ApiTags("Posts")
export class PostsController{
    constructor(
        private readonly postsService:PostsService
    ){}

    @Get()
    @ApiMetaDataArrayResponse(GetPostDto, MetaDto, "Getting posts by params")
    async getManyPosts(
        @Query() query: QuerySearchUnlimitedPaginationDto,
    ): Promise<MetaDataArrayResponse<GetPostDto>>{
        const errorData = await this.postsService.getManyPosts(query.getLimit(), query.getOffset(), query.getQ());

        if(errorData.haveError()){
            throwExceptionByCustomError(errorData.getError())
        }

        return new MetaDataArrayResponse(
            {
                count: PostsStorage.getValue.length,
                limit: query.getLimit() ?? 0,
                offset: query.getOffset() ?? 0
            }, 
            errorData.getData()
        )
    }

    @Get(":postId")
    @ApiParam({name: 'postId', required: true, description: 'Unique post ID', type: Number})
    @ApiDataResponse(GetPostDto, "Getting post by Id")
    async getOnePost(
        @Param("postId", ParseIdPipe) postId: number
    ): Promise<DataResponse<GetPostDto>>{
        const errorData = await this.postsService.getOnePost(postId)

        if(errorData.haveError()){
            throwExceptionByCustomError(errorData.getError())
        }

        return new DataResponse(errorData.getData())
    }

    @Get("users/:postId")
    async getUserPosts(
        @Param("postId", ParseIdPipe) postId: number,
        @Query() query: QuerySearchUnlimitedPaginationDto,
    ): Promise<DataResponse<GetPostDto[]>>{
        const errorData = await this.postsService.getUserPosts(query.getLimit(), query.getOffset(), query.getQ(), postId)

        if(errorData.haveError()){
            throwExceptionByCustomError(errorData.getError())
        }

        return new DataResponse(errorData.getData())

    }
}