const distinctId = () => {
  function a() {
    function c(w, v) {
      var r, y = 0;
      for (r = 0; r < v.length; r++)
        y |= k[r] << 8 * r;
      return w ^ y
    }
    var d = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36', f, k = [], n = 0;
    for (f = 0; f < d.length; f++) {
      var u = d.charCodeAt(f);
      k.unshift(u & 255);
      4 <= k.length && (n = c(n, k),
        k = [])
    }
    0 < k.length && (n = c(n, k));
    return n.toString(16)
  }
  function b() {
    for (var c = 1 * new Date, d = 0; c == 1 * new Date; )
      d++;
    return c.toString(16) + d.toString(16)
  }
  var c = (1080 * 1920).toString(16);
  return b() + "-" + Math.random().toString(16).replace(".", "") + "-" + a() + "-" + c + "-" + b()
}

exports.distinctId = distinctId