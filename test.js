function SyncPromise(resolver) {
  if (!resolver) throw new Error('must has resolver');
  this.status = "Pending";
  this.value = null;
  if (!resolver) return;

  let resolve = function(value) {
    if (this.status == 'Pending') {
      this.value = value;
      this.status = 'Resolved';
    }
  }

  let reject = function(value) {
    if (this.status == 'Rejected') {
      this.value = value;
      this.status = 'Rejected';
    }
  }
  try {
    resolver(resolve.bind(this), reject.bind(this));
  } catch(err) {
    this.status = 'Rejected';
    this.value = err;
  }
  SyncPromise.prototype.then = (onResolved) => {
    let ret = onResolved(this.value);
    if (ret instanceof SyncPromise) {
      return ret;
    } else {
      let p = new SyncPromise(() => {});
      this.value = ret;
      this.status = 'Resolved';
      return p;
    }
  }
  SyncPromise.prototype.catch = (onRejected) => {
    if (this.status == 'Pending') throw new Error('status')
    let ret = onRejected(this.value);
    if (ret instanceof SyncPromise) {
      return ret;
    } else {
      let p = new SyncPromise(() => {});
      this.value = ret;
      this.status = 'Rejected';
      return p;
    }
  }
  SyncPromise.prototype.finally = (onFinally) => {
    onFinally({
      status: this.status,
      value: this.value
    })
  }
}


new SyncPromise((resolve, reject) => {
  reject(1);
})
.then(data => {
  console.log(data);
})
.finally(({ status, value }) => {
  console.log(status, value);
})