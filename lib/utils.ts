export function driveUrlToDirectUrl(url: string): string {
  if (!url) return ""
  
  let fileId = ""
  const matchD = url.match(/\/file\/d\/([^/&?#\s]+)/)
  if (matchD) {
    fileId = matchD[1]
  } else {
    const matchId = url.match(/[?&]id=([^/&?#\s]+)/)
    if (matchId) {
      fileId = matchId[1]
    }
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`
  }
  return url
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
