import { PostsStorage } from './posts.storage';
import { throwExceptionByCustomError, createCustomServerErrorRaw } from './../common/utils/error.utils';
import { PostEntityType } from './../modules/posts/types/post-entity.type';
import { PostEntity } from './../modules/posts/entities/post.entity';

export const useGetPosts = async (delay:number= 5):Promise<void>=>{

    let postsString = '';
        let posts: PostEntityType[] = []
        let postsEntities:PostEntity[];
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
        const reader = response.body
          ?.pipeThrough(new TextDecoderStream())
          .getReader();
        if (!response.status || !response.body) throwExceptionByCustomError(createCustomServerErrorRaw("Произошла неизвестная ошибка сервера."))

        while (true) {
            if (!reader) throwExceptionByCustomError(createCustomServerErrorRaw("Произошла неизвестная ошибка сервера."))
            const { value, done } = await reader.read();
            if (done) break;
            postsString += value;
        }

        try{
            posts = JSON.parse(postsString);
            postsEntities = posts.map(p=>new PostEntity(p));
            PostsStorage.setValue(postsEntities)
        }catch(e){
            throwExceptionByCustomError(createCustomServerErrorRaw("Произошла неизвестная ошибка сервера."))
        }

        setTimeout(()=>useGetPosts(), delay*1000);

    }
