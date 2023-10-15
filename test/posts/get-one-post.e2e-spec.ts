import { CustomBaseTest } from "../../src/common/tests/common/custom/base/custom-base-test";
import { PostsModule } from "../../src/modules/posts/posts.module";

const app = new CustomBaseTest();

beforeAll(async () => {
  console.log(23);
  
  await app.build([PostsModule]);
})

describe("Bad requests", ()=>{

  it("dsf", async ()=>{
    expect(2).toBe(2);
  })



})

afterAll(async () => {
  await app.close();
});
