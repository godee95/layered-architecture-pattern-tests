// __tests__/integration/posts.integration.spec.js

const supertest = require('supertest');
const app = require('../../app.js');
const { sequelize } = require('../../models/index.js');

// 통합 테스트(Integration Test)를 진행하기에 앞서 Sequelize에 연결된 모든 테이블의 데이터를 삭제합니다.
//  단, NODE_ENV가 test 환경으로 설정되어있는 경우에만 데이터를 삭제합니다.
beforeAll(async () => {
  if (process.env.NODE_ENV === 'test') await sequelize.sync();
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});


describe('Layered Architecture Pattern, Posts Domain Integration Test', () => {
  test('GET /api/posts API (getPosts) Integration Test Success Case, Not Found Posts Data', async () => {
    const response = await supertest(app)
      .get(`/api/posts`) // API의 HTTP Method & URL
      
      // API의 Status code가 200번이다
      expect(response.status).toEqual(200);

      // API의 Response 데이터는 { data: [] }
      expect(response.body).toEqual({data:[]});
  });

  test('POST /api/posts API (createPost) Integration Test Success Case', async () => {
    // { nickname, password, titil, content }
    const createPostBodyParams = {
        nickname: "Nickname_Succese",
        password: "Password_Succese",
        title: "Title_Success",
        content: "Content_Success",
    };

    const response = await supertest(app)
    .post('/api/posts')
    .send(createPostBodyParams);

    // Http status Code가 201로 전달되는가
    expect(response.status).toEqual(201);

    // 원하는 데이터로 전달되는가? { postId, nickname, title, content, createdAt, updatedAt }
    expect(response.body).toMatchObject({
        data: {
            postId: 1, 
            nickname: createPostBodyParams.nickname, 
            title: createPostBodyParams.title, 
            content: createPostBodyParams.content, 
            createdAt: expect.anything(), 
            updatedAt: expect.anything()
        }
    });

  });

  test('POST /api/posts API (createPost) Integration Test Error Case, Invalid Params Error', async () => {
    const response = await supertest(app)
    .post('/api/posts')
    .send()

    // Http Status Code가 400번으로 반환
    expect(response.status).toEqual(400);
    
    // { errorMessage: "InvalidParamsError" }의 형태로 데이터가 전달
    expect(response.body).toEqual({
        errorMessage: "InvalidParamsError"
    })
  });

  test('GET /api/posts API (getPosts) Integration Test Success Case, is Exist Posts Data', async () => {
    const createPostBodyParams = {
        nickname: "Nickname_Succese",
        password: "Password_Succese",
        title: "Title_Success",
        content: "Content_Success",
    };

    const response = await supertest(app)
    .get('/api/posts')
    .query()

    // 200번이 잘 날아오는가
    expect(response.status).toEqual(200);

    // 게시글 생성 API에서 만든 데이터가 정상적으로 조회 되는가
    expect(response.body).toMatchObject({
        data:[{
            postId: 1,
            nickname: createPostBodyParams.nickname,
            title: createPostBodyParams.title,
            createdAt: expect.anything(),
            updatedAt: expect.anything(),
        }]
    });

  });
});


afterAll(async () => {
  // 통합 테스트가 완료되었을 경우 sequelize의 연결된 테이블들의 정보를 초기화합니다.
  if (process.env.NODE_ENV === 'test') await sequelize.sync({ force: true });
  else throw new Error('NODE_ENV가 test 환경으로 설정되어 있지 않습니다.');
});