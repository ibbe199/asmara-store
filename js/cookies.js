// إنشاء Cookie
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// قراءة Cookie
function getCookie(name) {
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? parts[1] : r;
  }, "");
}

// حذف Cookie
function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=0; path=/";
}
