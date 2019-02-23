const SimplePromise = require("../");
const expect = require("chai").expect;

describe("SimplePromise", () => {
  let fakeAPICall;
  beforeEach(() => {
    fakeAPICall = data => {
      return new SimplePromise((resolve, reject) => {
        try {
          setTimeout(() => {
            resolve(data + 1);
          }, 10);
        } catch (err) {
          reject(err);
        }
      });
    };
  });

  context("Resolve", () => {
    beforeEach(() => {});

    it("Resolves the promise", done => {
      fakeAPICall(10).then(res => {
        expect(res).to.equal(11);
        done();
      });
    });

    it("Handles chaining", done => {
      fakeAPICall(10)
        .then(res => {
          return res + 1;
        })
        .then(res => {
          return res + 1;
        })
        .then(res => {
          return res + 1;
        })
        .then(res => {
          expect(res).to.equal(14);
          done();
        });
    });
  });

  context("Reject", () => {
    it("Catches errors", done => {
      fakeAPICall(10)
        .then(res => {
          this_function_does_not_exist();
        })
        .catch(err => {
          expect(err.toString()).to.equal(
            "ReferenceError: this_function_does_not_exist is not defined"
          );
          done();
        });
    });

    it("Catches chain errors", done => {
      fakeAPICall(10)
        .then(res => {
          return res + 1;
        })
        .then(res => {
          this_function_does_not_exist_either();
        })
        .then(res => {
          return res + 1;
        })
        .catch(err => {
          expect(err.toString()).to.equal(
            "ReferenceError: this_function_does_not_exist_either is not defined"
          );
          done();
        });
    });
  });
});
