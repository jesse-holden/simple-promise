module.exports = class SimplePromise {
  constructor(executor, autorun = true) {
    this.autorun = autorun;
    this.catchCallback = null;
    this.child = null;
    this.executor = executor;
    this.result = null;

    this.resolve = res => {
      // Promise resolves
      if (!this.child) return;
      this.result = res;
      this.child.run();
    };

    this.reject = err => {
      // Promise rejects
      if (this.catchCallback) return this.catchCallback(err);
      let { child } = this;

      while (1) {
        // Search for an error handler
        if (!child) break;
        if (child.catchCallback) return child.catchCallback(err);
        child = child.child;
      }

      throw err;
    };

    if (!this.autorun) return;
    this.run();
  }

  run() {
    // Run the Promise's callback
    this.executor(this.resolve, this.reject);
  }

  catch(catchCallback) {
    // Promise rejects
    this.catchCallback = catchCallback;
  }

  then(newCallback) {
    // Attach a child Promise to the Promise
    return (this.child = new SimplePromise((resolve, reject) => {
      try {
        resolve(newCallback(this.result));
      } catch (err) {
        reject(err);
      }
    }, false));
  }
};
