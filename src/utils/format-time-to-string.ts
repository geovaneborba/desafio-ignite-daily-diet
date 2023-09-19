export function formatTimeToString(date: Date) {
  if (!date) {
    return 'A hora é inválida ou está ausente.'
  }
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    // timeZone: 'America/Sao_Paulo',
  })
}
