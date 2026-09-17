// Memotong teks HTML jadi preview sepanjang limit karakter (dihitung dari teks tampilan,
// bukan termasuk tag), lalu menutup tag yang masih terbuka supaya HTML tetap valid.
export function truncateHtml(html, limit = 1000) {
  if (!html) return { preview: '', isTruncated: false };

  let textLength = 0;
  let result = '';
  let isTruncated = false;
  const tagStack = [];

  let i = 0;
  while (i < html.length) {
    if (textLength >= limit) {
      isTruncated = true;
      break;
    }

    if (html[i] === '<') {
      const tagEnd = html.indexOf('>', i);
      if (tagEnd === -1) break;

      const tag = html.slice(i, tagEnd + 1);
      const isClosing = tag.startsWith('</');
      const isSelfClosing = /\/>$/.test(tag) || /^<(br|img|hr)[\s>]/i.test(tag);
      const tagNameMatch = tag.match(/^<\/?([a-zA-Z0-9]+)/);
      const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : null;

      result += tag;

      if (tagName && !isSelfClosing) {
        if (isClosing) {
          const idx = tagStack.lastIndexOf(tagName);
          if (idx !== -1) tagStack.splice(idx, 1);
        } else {
          tagStack.push(tagName);
        }
      }

      i = tagEnd + 1;
    } else {
      result += html[i];
      textLength++;
      i++;
    }
  }

  for (let j = tagStack.length - 1; j >= 0; j--) {
    result += `</${tagStack[j]}>`;
  }

  return { preview: result, isTruncated };
}

// Menghapus semua tag HTML, sisakan teks polos saja — dipakai untuk pencarian.
export function stripHtmlPlain(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
