'use client';

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
  options: { label: string; score: 0 | 1 | 2 }[];
  feedback: Record<0 | 1 | 2, string>;
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
    feedback: {
      2: 'Excelente adaptación a la rutina real del barco.',
      1: 'Podrías adaptarte, pero con desgaste físico.',
      0: 'La falta de descanso puede generar frustración.',
    },
  },
  {
    id: 2,
    text: '¿Aceptarías jornadas de 10 a 14 horas diarias por meses?',
    options: [
      { label: 'Sí, estoy preparado', score: 2 },
      { label: 'Podría intentarlo', score: 1 },
      { label: 'No, no lo aceptaría', score: 0 },
    ],
    feedback: {
      2: 'Buena resistencia para la exigencia del trabajo.',
      1: 'Requerirá adaptación progresiva.',
      0: 'La carga laboral puede ser demasiado alta.',
    },
  },
  {
    id: 3,
    text: '¿Te adaptas a turnos irregulares y cambios de horario?',
    options: [
      { label: 'Sí, me adapto bien', score: 2 },
      { label: 'Me cuesta, pero lo manejo', score: 1 },
      { label: 'No, me afecta mucho', score: 0 },
    ],
    feedback: {
      2: 'Gran flexibilidad horaria.',
      1: 'Adaptación posible con esfuerzo.',
      0: 'Los turnos irregulares pueden afectarte.',
    },
  },
  {
    id: 4,
    text: '¿Puedes pasar meses lejos de tu familia?',
    options: [
      { label: 'Sí, lo manejo bien', score: 2 },
      { label: 'Me costaría emocionalmente', score: 1 },
      { label: 'No podría hacerlo', score: 0 },
    ],
    feedback: {
      2: 'Buen manejo emocional de la distancia.',
      1: 'Puede generar impacto emocional.',
      0: 'La separación prolongada sería difícil.',
    },
  },
];

export default function RealityTestPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 0 | 1 | 2>>(
    {}
  );
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, score: 0 | 1 | 2) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const totalScore = questions.reduce(
    (sum, q) => sum + (answers[q.id] ?? 0),
    0
  );

  const maxScore = questions.length * 2;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const result =
    percentage <= 33
      ? {
          title: '🔴 Alerta de Realidad',
          description:
            'La vida a bordo puede generar frustración física y emocional.',
          icon: <XCircle className="w-14 h-14 text-red-500" />,
        }
      : percentage <= 66
      ? {
          title: '🟡 Perfil en Construcción',
          description:
            'Existe compatibilidad parcial. Con preparación podrías adaptarte.',
          icon: (
            <AlertTriangle className="w-14 h-14 text-yellow-500" />
          ),
        }
      : {
          title: '🟢 Perfil Compatible con Vida a Bordo',
          description:
            'Tu perfil es compatible con la rutina real de los cruceros.',
          icon: (
            <CheckCircle className="w-14 h-14 text-green-500" />
          ),
        };

  const currentQuestion = questions[current];
  const hasAnswered =
    answers[currentQuestion.id] !== undefined;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">
        Test de Realidad
      </h1>

      <p className="text-center text-muted-foreground mb-8">
        Este test evalúa tu compatibilidad con la vida real a bordo.
        No es un test vocacional.
      </p>

      <Progress
        value={((current + 1) / questions.length) * 100}
        className="mb-6"
      />

      {!showResults ? (
        <Card>
          <CardHeader>
            <CardTitle>
              {current + 1}. {currentQuestion.text}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <RadioGroup
              value={
                answers[currentQuestion.id]?.toString() ?? ''
              }
              onValueChange={(v) =>
                handleAnswer(
                  currentQuestion.id,
                  Number(v) as 0 | 1 | 2
                )
              }
              className="space-y-4"
            >
              {currentQuestion.options.map((o, i) => {
                const id = `q-${currentQuestion.id}-${i}`;
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
              disabled={!hasAnswered}
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
            <CardHeader className="flex flex-col items-center gap-3">
              {result.icon}
              <CardTitle>{result.title}</CardTitle>
              <p className="text-3xl font-bold">
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
              {questions.map((q) => {
                const a = answers[q.id];
                return (
                  <div key={q.id}>
                    <p className="font-semibold">{q.text}</p>
                    <p className="text-sm text-muted-foreground">
                      {a !== undefined
                        ? q.feedback[a]
                        : 'Sin respuesta'}
                    </p>
                  </div>
                );
              })}
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
}
