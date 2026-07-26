import mammoth from 'mammoth'

export async function parseDocxFile(file) {
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.convertToMarkdown({ arrayBuffer })
  return {
    markdown: result.value,
    warnings: result.messages
  }
}
