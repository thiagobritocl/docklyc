import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  feedback: {
    0: string;
    1: string;
    2: string;
  };
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: '¿Puedes trabajar 7 días a la semana sin descanso fijo?',
    feedback: {
      0: 'La vida a bordo exige continuidad laboral sin días libres.',
      1: 'Podrías adaptarte, pero será mentalmente exigente.',
      2: 'Excelente adaptación a la rutina real del barco.',
    },
    options: [
      { label: 'Sí, sin problema', score: 2 },
      { label: 'Sí, pero sería difícil', score: 1 },
      { label: 'No, no me adaptaría', score: 0 },
    ],
  },
  {
    id: 2,
    text: '¿Aceptarías jornadas de 10 a 14 horas diarias?',
    feedback: {
      0: 'Las jornadas largas son estándar en cruceros.',
      1: 'Es posible, pero el desgaste es real.',
      2: 'Buen perfil para ambientes exigentes.',
    },
    options: [
      { label: 'Sí, estoy preparado', score: 2 },
      { label: 'Podría intentarlo', score: 1 },
      { label: 'No, no lo aceptaría', score: 0 },
    ],
  },
  {
    id: 3,
    text: '¿Te adaptas a turnos irregulares?',
    feedback: {
      0: 'Los turnos variables son constantes a bordo.',
      1: 'Podrías adaptarte con esfuerzo.',
      2: 'Excelente flexibilidad.',
    },
    options: [
      { label: 'Sí, me adapto bien', score: 2 },
      { label: 'Me cuesta, pero lo manejo', score: 1 },
      { label: 'No, me afecta mucho', score: 0 },
    ],
  },
  {
    id: 4,
    text: '¿Puedes pasar meses lejos de tu familia?',
    feedback: {
      0: 'El aislamiento emocional es una de las mayores dificultades.',
      1: 'Será un reto emocional.',
      2: 'Alta resiliencia emocional.',
    },
    options: [
      { label: 'Sí, lo manejo bien', score: 2 },
      { label: 'Me costaría', score: 1 },
      { label: 'No podría', score: 0 },
    ],
  },
];

const RealityTestPage: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (id: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [id]: score }));
  };

  const totalScore = Object.values(answers).reduce(
    (sum, v) => sum + v,
    0
  );
  const maxScore = questions.length * 2;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const result =
    percentage < 40
      ? {
          title: '🔴 Alerta de Realidad',
          icon: <XCircle className="w-16 h-16 text-red-500" />,
          description:
            'La vida a bordo puede generar frustración física y emocional.',
        }
      : percentage < 70
      ? {
          title: '🟡 Perfil en Construcción',
          icon: (
            <AlertTriangle className="w-16 h-16 text-yellow-500" />
          ),
          description:
            'Con preparación mental y expectativas claras, podrías adaptarte.',
        }
      : {
          title: '🟢 Perfil Compatible',
          icon: (
            <CheckCircle className="w-16 h-16 text-green-500" />
          ),
          description:
            'Tu perfil encaja bien con la realidad laboral en cruceros.',
        };

  return (
    <div className="container mx-auto py-10 max-w-3xl px-4">
      <h1 className="text-4xl font-bold text-center mb-6">
        Test de Realidad – Vida a Bordo
      </h1>

      <Progress
        value={((current + 1) / questions.length) * 100}
        className="mb-6"
      />

      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {current + 1}. {questions[current].text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              className="space-y-4"
              onValueChange={(v) =>
                handleAnswer(
                  questions[current].id,
                  Number(v)
                )
              }
            >
              {questions[current].options.map((o, i) => {
                const id = `q-${current}-${i}`;
                return (
                  <div
                    key={id}
                    className="flex items-center gap-3"
                  >
                    <RadioGroupItem
                      id={id}
                      value={o.score.toString()}
                    />
                    <Label htmlFor={id}>{o.label}</Label>
                  </div>
                );
              })}
            </RadioGroup>

            <Button
              className="mt-6 w-full"
              onClick={() =>
                current === questions.length - 1
                  ? setShowResults(true)
                  : setCurrent((p) => p + 1)
              }
            >
              {current === questions.length - 1
                ? 'Ver Resultado'
                : 'Siguiente'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="text-center mb-6">
            <CardHeader className="flex flex-col items-center gap-4">
              {result.icon}
              <CardTitle>{result.title}</CardTitle>
              <p className="text-2xl font-bold">
                {percentage}% de compatibilidad
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {result.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback por Pregunta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((q) => (
                <div key={q.id}>
                  <p className="font-semibold">{q.text}</p>
                  <p className="text-sm text-muted-foreground">
                    {q.feedback[
                      answers[q.id] as 0 | 1 | 2
                    ]}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button
            className="mt-6 w-full"
            onClick={() => {
              setAnswers({});
              setCurrent(0);
              setShowResults(false);
            }}
          >
            Repetir Test
          </Button>
        </>
      )}

      <footer className="mt-10 text-center text-sm text-muted-foreground">
        Dockly · Test informativo · No garantiza empleo
      </footer>
    </div>
  );
};

export default RealityTestPage;
