const request = require("supertest"); //importing supertest
const app = require("../index"); //import server
const { user, transaksi } = require("../models");

let authenticationToken; //variable to save token

const deleteAllData = async () => {
  await user.deleteMany();
};

deleteAllData();

describe("Auth Test", () => {
  describe("/auth/signup POST", () => {
    it("it should make user and get the token", async () => {
      const res = await request(app).post("/auth/signup").send({
        email: "yogaadhi@icloud.com",
        password: "Aneh1234!!",
        confirmPassword: "Aneh1234!!",
        nama: "Yoga Adhipratama",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("sukses");
      expect(res.body).toHaveProperty("token");
      authenticationToken = res
    });
  });
});

//test the error
describe('/auth/signup POST', () => {
    it('It should error while making user', async () => {
      const res = await request(app).post("/auth/signup").send({
          email: 'yogadhi@icloud.com',
          password: 'Aneh1234!!',
          confirmPassword: 'Aneh1234!!',
          name: "Yoga Adhipratama"
       });

       expect(res.statusCode).toEqual(401);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("cant create user");
      

    })
  })

  describe("/POST Sign In", () => {
    it("It should make user login and get authentication_key (jwt)", async () => {
      const res = await request(app).post("/auth/signin").send({
        email: "yogaadhi@icloud.com",
        password: "Aneh1234!!",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.message).toEqual("sukses");
      expect(res.body).toHaveProperty("token");

      authenticationToken = res.body.token;
      console.log(authenticationToken);
    });
  });


describe("Transaksi Test", () => {
  /*
   * Test the first /GET route
   * There are no data
   */
  describe("/GET transaksi", () => {
    it("it should GET all the transaksi", async () => {
      const res = await request(app)
        .get("/transaksi")
        .set({
          Authorization: `Bearer ${authenticationToken}`,
        });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message");
      expect(res.body.message).toEqual("transaksi not found");
    });
  });
});
