import { CustomBaseTest } from "../../src/common/tests/common/custom/base/custom-base-test";
import { PostsModule } from "../../src/modules/posts/posts.module";

const app = new CustomBaseTest();
const requiredFields = ["id", "userId", "title", "body"];

beforeAll(async () => {  
  await app.build([PostsModule]);

})

describe("Bad requests", ()=>{

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/w")
    expect(statusCode).toBe(400);
  })

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/2,3")
    expect(statusCode).toBe(400);
  })

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/'2'")
    expect(statusCode).toBe(400);
  })

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/0")
    expect(statusCode).toBe(400);
  })

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/-1")
    expect(statusCode).toBe(400);
  })

  it("Status code 400", async ()=>{
    const { statusCode } = await app.request("posts/1234567891233456789")
    expect(statusCode).toBe(400);
  })

})

describe("Correct requests", ()=>{

  it("Status code 200", async ()=>{
    const { statusCode, body:{ data } } = await app.request("posts/1")
    expect(statusCode).toBe(200);
    expect(Object.keys(data)).toEqual(requiredFields);
    expect(data.id).toBe(1)
  })

})

afterAll(async () => {
  await app.close();
});
