import React from "react"

type MetaTag = React.MetaHTMLAttributes<HTMLMetaElement>
type Favicon = { type: string; href: string }

type HeaderCustomContentProps = {
  googleFonts?: string[]
  favicon?: Favicon | Favicon[]
  meta?: MetaTag[]
}

export default function HeaderCustomContent({
  googleFonts = [],
  favicon,
  meta = [],
}: HeaderCustomContentProps) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

      {googleFonts.map((font, i) => (
        <link key={i} href={font} rel="stylesheet" />
      ))}

      {Array.isArray(favicon)
        ? favicon.map((f, i) => (
            <link key={i} rel="icon" type={f.type} href={f.href} />
          ))
        : favicon && <link rel="icon" type={favicon.type} href={favicon.href} />}

      {meta.map((m, i) => (
        <meta key={i} {...m} />
      ))}
    </>
  )
}