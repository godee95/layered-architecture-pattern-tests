# layered-architecture-pattern-tests
layered-architecture-pattern-tests

### 테스트
* Unit Test (jest)
* Integration Test (supertest)
* test Sequelize DB

---

> 게시글 CRUD TEST

---

#### API 및 코드 상세
[tistory_blog](https://pangeei-h.tistory.com/entry/Nodejs-%EC%8B%AC%ED%99%94-1%EC%A3%BC%EC%B0%A85Integration-Test)


### 실행(Terminal)

```bash
git clone https://github.com/godee95/layered-architecture-pattern-tests
npm i

```

---


### 본인 AWS RDS 계정과 연결

/config/config.json
```
  "development": {
    "username": "root",
    "password": "비밀번호",
    "database": "layered_architecture_pattern_db",
    "host": "엔드포인트",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "비밀번호",
    "database": "layered_architecture_pattern_test_db",
    "host": "엔드포인트",
    "dialect": "mysql",
    "logging": false
  },
```

### Terminal
```bash
npx sequelize db:create
npx sequelize db:migrate

npm install -g win-node-env
# test 환경에 설정값을 이용해 DB를 생성합니다.
NODE_ENV=test npx sequelize db:create

# test 환경에 설정값을 이용해 Table을 생성합니다.
NODE_ENV=test npx sequelize db:migrate

npm run test:unit
npm run test:integration
```
