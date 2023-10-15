import { CustomBaseTest } from "../../src/common/tests/common/custom/base/custom-base-test";
import { PostsModule } from "../../src/modules/posts/posts.module";
import { PostEntityType } from "src/modules/posts/types/post-entity.type";

const app = new CustomBaseTest();
const requiredFields = ["id", "userId", "title", "body"];

beforeAll(async () => {  
  await app.build([PostsModule]);

})

describe("Bad requests", ()=>{

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/users/2",
        { 
            query:{
                limit:"0",
                offset:"0"
            }
        }
    )
    expect(statusCode).toBe(400);
  })

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/users/2",
        { 
            query:{
                limit:"a",
                offset:"1"
            }
        }
    )
    expect(statusCode).toBe(400);
  })

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/users/-2")
    expect(statusCode).toBe(400);
  })

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/users/0")
    expect(statusCode).toBe(400);
  })

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/users/a")
    expect(statusCode).toBe(400);
  })

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/users")
    expect(statusCode).toBe(400);
  })

})

describe("Correct requests", ()=>{

    it("Status code 200", async ()=>{
        const { statusCode, body:{ data } } = await app.request<{data:PostEntityType[]}>("posts/users/1",
            { 
                query:{
                    limit:"3",
                }
            }
        )
        expect(statusCode).toBe(200);
        expect(data.length).not.toBeGreaterThan(3)
        data.forEach(p=>{
            expect(p.userId).toBe(1)
            expect(Object.keys(p)).toEqual(requiredFields)
        })
    })    

})

afterAll(async () => {
  await app.close();
});
