const questions: Question[] = [
  {
    id: 1,
    text: 'Trabajar a bordo implica trabajar todos los días durante meses. ¿Cómo te sientes con eso?',
    options: [
      { label: 'Lo veo como parte del trabajo y me adapto bien', score: 2 },
      { label: 'Podría hacerlo, pero me costaría', score: 1 },
      { label: 'No me siento cómodo con esa idea', score: 0 },
    ],
  },
  {
    id: 2,
    text: 'Las jornadas pueden ser de 10 a 14 horas diarias. ¿Cómo reaccionas ante este ritmo?',
    options: [
      { label: 'Estoy acostumbrado o me adapto bien', score: 2 },
      { label: 'Puedo hacerlo, pero con desgaste', score: 1 },
      { label: 'No creo poder sostener ese ritmo', score: 0 },
    ],
  },
  {
    id: 3,
    text: 'Los turnos cambian constantemente. ¿Cómo manejas horarios irregulares de sueño?',
    options: [
      { label: 'Me adapto sin mayores problemas', score: 2 },
      { label: 'Me adapto, pero afecta mi energía', score: 1 },
      { label: 'Me afecta mucho y me desorganiza', score: 0 },
    ],
  },
  {
    id: 4,
    text: 'En cruceros no existen fines de semana tradicionales. ¿Cómo te impacta esto?',
    options: [
      { label: 'No es un problema para mí', score: 2 },
      { label: 'Me costaría, pero podría adaptarme', score: 1 },
      { label: 'Para mí es muy importante tener fines de semana', score: 0 },
    ],
  },
  {
    id: 5,
    text: 'Muchos puestos requieren estar de pie por largas horas. ¿Cómo te sientes con esto?',
    options: [
      { label: 'Mi condición física lo permite sin problemas', score: 2 },
      { label: 'Puedo hacerlo, pero con cansancio', score: 1 },
      { label: 'Me resulta muy difícil', score: 0 },
    ],
  },
  {
    id: 6,
    text: 'Compartir camarote es la norma a bordo. ¿Cómo te sientes al respecto?',
    options: [
      { label: 'No tengo problema en compartir espacio', score: 2 },
      { label: 'Puedo adaptarme, aunque prefiero privacidad', score: 1 },
      { label: 'No me siento cómodo compartiendo', score: 0 },
    ],
  },
  {
    id: 7,
    text: 'La privacidad es limitada en los barcos. ¿Cómo manejas espacios pequeños?',
    options: [
      { label: 'Me adapto bien a espacios reducidos', score: 2 },
      { label: 'Me adapto, pero me afecta a veces', score: 1 },
      { label: 'Necesito mucho espacio personal', score: 0 },
    ],
  },
  {
    id: 8,
    text: 'Trabajarás con personas de muchas culturas y nacionalidades. ¿Cómo te sientes con eso?',
    options: [
      { label: 'Me gusta y lo veo como algo positivo', score: 2 },
      { label: 'Me adapto, aunque a veces es desafiante', score: 1 },
      { label: 'Me cuesta convivir con tantas diferencias', score: 0 },
    ],
  },
  {
    id: 9,
    text: 'La presión y el ritmo acelerado son constantes. ¿Cómo reaccionas ante eso?',
    options: [
      { label: 'Trabajo bien bajo presión', score: 2 },
      { label: 'Puedo manejarlo, pero me estresa', score: 1 },
      { label: 'Me bloqueo o me afecta demasiado', score: 0 },
    ],
  },
  {
    id: 10,
    text: 'La estructura a bordo es muy jerárquica. ¿Cómo te sientes siguiendo órdenes estrictas?',
    options: [
      { label: 'Me siento cómodo respetando jerarquías', score: 2 },
      { label: 'Lo hago, aunque a veces me incomoda', score: 1 },
      { label: 'Me cuesta mucho trabajar así', score: 0 },
    ],
  },
  {
    id: 11,
    text: 'Existen reglas claras sobre horarios, uniforme y conducta. ¿Cómo lidias con esto?',
    options: [
      { label: 'No tengo problema con reglas estrictas', score: 2 },
      { label: 'Las sigo, aunque me cuestan', score: 1 },
      { label: 'Me incomodan mucho las reglas rígidas', score: 0 },
    ],
  },
  {
    id: 12,
    text: 'Los contratos implican estar lejos de la familia por meses. ¿Cómo te afecta esto?',
    options: [
      { label: 'Puedo manejar la distancia emocionalmente', score: 2 },
      { label: 'Me afectaría, pero podría soportarlo', score: 1 },
      { label: 'No me siento preparado para eso', score: 0 },
    ],
  },
];
