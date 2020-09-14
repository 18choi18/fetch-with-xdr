export function fetchWithXDomainRequest(url, options) {
  return new Promise(function (resolve, reject) {
    const xdr = new XDomainRequest();
    options = options || {};
    xdr.open(options.method || "GET", url);
    xdr.onprogress = function () {
      //Progress: required, or duplicate requests may not fire onload
    };

    xdr.ontimeout = function () {
      reject();
    };

    xdr.onerror = function () {
      reject();
    };

    xdr.onload = function () {
      resolve(new ResponseAdapter(xdr));
    };

    setTimeout(function () {
      xdr.send();
    }, 0);
  });
}

function ResponseAdapter(xdr) {
  this.xdr = xdr;
  this.status = 200;
  this.ok = true;
}
ResponseAdapter.prototype.json = function () {
  let res;
  try {
    res = JSON.parse(this.xdr.responseText);
  } catch (err) {
    res = this.xdr.responseText;
  }
  return Promise.resolve(res);
};
