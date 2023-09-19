export function formatDateToString(date: Date | undefined) {
  if (!date) {
    return 'A data é inválida ou está ausente.'
  }
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}
