import { PostEntity } from './../modules/posts/entities/post.entity';

export var storage:PostEntity[] = []

export class PostsStorage{
    static setValue(postEntities: PostEntity[]): void{
        storage = postEntities
    }

    static getValue(): PostEntity[]{
        return storage
    }
}