import { createCustomNotFoundRequestRaw, throwBadRequestException, throwExceptionByCustomError } from "../../common/utils/error.utils";
export class PostsExceptions{
    static BadRequestWithOtherService(){
        return throwBadRequestException("Server error for getting data");
    }

    static NotFound(){
        return createCustomNotFoundRequestRaw("Post not found");
    }
}