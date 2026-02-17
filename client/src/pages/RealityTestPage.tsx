import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: '¿Puedes trabajar 7 días a la semana sin descanso fijo?',
    options: [
      { label: 'Sí, sin problema', score: 2 },
      { label: 'Sí, pero sería difícil', score: 1 },
      { label: 'No, no me adaptaría', score: 0 },
    ],
  },
  {
    id: 2,
    text: '¿Aceptarías jornadas de 10 a 14 horas diarias durante varios meses?',
    options: [
      { label: 'Sí, estoy preparado', score: 2 },
      { label: 'Podría intentarlo', score: 1 },
      { label: 'No, no lo aceptaría', score: 0 },
    ],
  },
  {
    id: 3,
    text: '¿Te adaptas bien a turnos que implican madrugar o dormir muy tarde?',
    options: [
      { label: 'Sí, me adapto bien', score: 2 },
      { label: 'Me cuesta, pero lo manejo', score: 1 },
      { label: 'No, me afecta mucho', score: 0 },
    ],
  },
  {
    id: 4,
    text: '¿Has trabajado períodos largos sin fines de semana libres?',
    options: [
      { label: 'Sí, ya lo he vivido', score: 2 },
      { label: 'Pocas veces', score: 1 },
      { label: 'Nunca', score: 0 },
    ],
  },
  {
    id: 5,
    text: '¿Puedes pasar muchas horas de pie durante el trabajo?',
    options: [
      { label: 'Sí, sin problema', score: 2 },
      { label: 'Con algo de esfuerzo', score: 1 },
      { label: 'No, me resulta difícil', score: 0 },
    ],
  },
  {
    id: 6,
    text: '¿Aceptarías compartir camarote con otra persona?',
    options: [
      { label: 'Sí, no me molesta', score: 2 },
      { label: 'Dependería de la situación', score: 1 },
      { label: 'No, necesito privacidad', score: 0 },
    ],
  },
  {
    id: 7,
    text: '¿Te adaptas a vivir en espacios pequeños con poca privacidad?',
    options: [
      { label: 'Sí, me adapto bien', score: 2 },
      { label: 'Me costaría un poco', score: 1 },
      { label: 'No me adaptaría', score: 0 },
    ],
  },
  {
    id: 8,
    text: '¿Te sientes cómodo conviviendo con personas de distintas culturas?',
    options: [
      { label: 'Sí, me gusta ese entorno', score: 2 },
      { label: 'Me adapto con el tiempo', score: 1 },
      { label: 'Me resulta incómodo', score: 0 },
    ],
  },
  {
    id: 9,
    text: '¿Has trabajado bajo presión constante?',
    options: [
      { label: 'Sí, es parte del trabajo', score: 2 },
      { label: 'A veces, pero me afecta', score: 1 },
      { label: 'No, me cuesta mucho', score: 0 },
    ],
  },
  {
    id: 10,
    text: '¿Te manejas bien en ambientes con jerarquías estrictas?',
    options: [
      { label: 'Sí, sigo reglas sin problema', score: 2 },
      { label: 'Depende del liderazgo', score: 1 },
      { label: 'No, me cuesta mucho', score: 0 },
    ],
  },
  {
    id: 11,
    text: '¿Te adaptas a reglas estrictas sobre horarios, uniforme y conducta?',
    options: [
      { label: 'Sí, totalmente', score: 2 },
      { label: 'Con algo de dificultad', score: 1 },
      { label: 'No, me incomoda', score: 0 },
    ],
  },
  {
    id: 12,
    text: '¿Puedes pasar meses lejos de tu familia con contacto limitado?',
    options: [
      { label: 'Sí, lo manejo bien', score: 2 },
      { label: 'Me costaría emocionalmente', score: 1 },
      { label: 'No podría hacerlo', score: 0 },
    ],
  },
];

const RealityTestPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const calculateResults = () => {
    const score = Object.values(answers).reduce((sum, s) => sum + s, 0);
    setTotalScore(score);
    setShowResults(true);
  };

  const maxScore = questions.length * 2;
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;

  const result =
    percentage <= 33
      ? {
          title: '🔴 Alerta de Realidad',
          description:
            'Tu perfil muestra una alta incompatibilidad con la vida a bordo. Las exigencias físicas y emocionales pueden generar frustración.',
          icon: <XCircle className="w-16 h-16 text-red-500" />,
        }
      : percentage <= 66
      ? {
          title: '🟡 Perfil en Construcción',
          description:
            'Existe compatibilidad parcial con la vida a bordo. Con preparación y expectativas realistas, podrías adaptarte.',
          icon: <AlertTriangle className="w-16 h-16 text-yellow-500" />,
        }
      : {
          title: '🟢 Perfil Compatible con la Vida a Bordo',
          description:
            'Tu perfil es compatible con la rutina real de trabajo en cruceros. Tienes buena capacidad de adaptación.',
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
        };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl">
      <h1 className="text-4xl font-bold text-center mb-6">
        Test de Realidad
      </h1>

      <p className="text-center text-muted-foreground mb-8">
        Este test no mide talento ni garantiza empleo. Evalúa tu compatibilidad
        con la realidad de la vida a bordo en cruceros.
      </p>

      <Progress
        value={((currentQuestionIndex + 1) / questions.length) * 100}
        className="mb-6"
      />

      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {currentQuestionIndex + 1}.{' '}
              {questions[currentQuestionIndex].text}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <RadioGroup
              onValueChange={(value) =>
                handleAnswer(
                  questions[currentQuestionIndex].id,
                  parseInt(value)
                )
              }
              className="space-y-4"
            >
              {questions[currentQuestionIndex].options.map((o, i) => {
                const id = `q-${questions[currentQuestionIndex].id}-${i}`;
                return (
                  <div key={id} className="flex items-center gap-3">
                    <RadioGroupItem id={id} value={o.score.toString()} />
                    <Label htmlFor={id}>{o.label}</Label>
                  </div>
                );
              })}
            </RadioGroup>

            <Button
              className="mt-6 w-full"
              onClick={() =>
                currentQuestionIndex === questions.length - 1
                  ? calculateResults()
                  : setCurrentQuestionIndex((p) => p + 1)
              }
            >
              {currentQuestionIndex === questions.length - 1
                ? 'Ver Resultado'
                : 'Siguiente'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="text-center">
          <CardHeader className="flex flex-col items-center gap-4">
            {result.icon}
            <CardTitle>{result.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{result.description}</p>
            <Button
              className="mt-6"
              onClick={() => {
                setAnswers({});
                setTotalScore(0);
                setShowResults(false);
                setCurrentQuestionIndex(0);
              }}
            >
              Repetir Test
            </Button>
          </CardContent>
        </Card>
      )}

      <footer className="mt-10 text-center text-sm text-muted-foreground">
        Dockly es un sitio independiente de orientación. Este test es solo
        informativo.
      </footer>
    </div>
  );
};

export default RealityTestPage;
