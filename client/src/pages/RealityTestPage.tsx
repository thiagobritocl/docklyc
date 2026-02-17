import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    text: '¿Puedes trabajar 7 días a la semana, sin descanso fijo?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 2,
    text: '¿Aceptarías jornadas de 10 a 14 horas al día durante varios meses?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 3,
    text: '¿Te sientes bien despertando muy temprano o durmiendo muy tarde, según el turno?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 4,
    text: '¿Ya has trabajado largos períodos sin fines de semana?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 5,
    text: '¿Puedes permanecer mucho tiempo de pie?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 6,
    text: '¿Aceptarías compartir camarote con otra persona?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 7,
    text: '¿Puedes vivir en un espacio pequeño, con poca privacidad?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 8,
    text: '¿Te sientes bien conviviendo con diferentes nacionalidades y culturas?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 9,
    text: '¿Ya has trabajado bajo presión constante?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 10,
    text: '¿Te manejas bien en ambientes altamente jerárquicos?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 11,
    text: '¿Te adaptas bien a reglas estrictas sobre horarios, uniformes y comportamiento?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
    ],
  },
  {
    id: 12,
    text: '¿Puedes pasar largos períodos lejos de tu familia, con poco contacto frecuente?',
    options: [
      { label: 'Sí, me siento cómodo', score: 2 },
      { label: 'Puedo, pero con dificultad', score: 1 },
      { label: 'No me siento cómodo', score: 0 },
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
  const percentage = (totalScore / maxScore) * 100;

  const result =
    percentage <= 33
      ? {
          title: '🔴 Alerta de Realidad',
          description:
            'Tu perfil muestra una alta incompatibilidad con la rutina de la vida a bordo. Las exigencias físicas y emocionales son elevadas.',
          icon: <XCircle className="w-16 h-16 text-red-500" />,
        }
      : percentage <= 66
      ? {
          title: '🟡 Perfil en Construcción',
          description:
            'Existe una compatibilidad parcial con la vida a bordo, pero se requiere mayor preparación física, emocional o de expectativas.',
          icon: <AlertTriangle className="w-16 h-16 text-yellow-500" />,
        }
      : {
          title: '🟢 Perfil Compatible con la Vida a Bordo',
          description:
            'Tu perfil muestra buena compatibilidad con la rutina real de trabajo en cruceros.',
          icon: <CheckCircle className="w-16 h-16 text-green-500" />,
        };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Test de Realidad</h1>
      <p className="text-center max-w-3xl mx-auto mb-8 text-muted-foreground">
        Trabajar en cruceros no es para todos. Este test no mide talento, sino tu compatibilidad con la realidad de la vida a bordo.
      </p>

      <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} />

      {!showResults ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>
              {currentQuestionIndex + 1}. {questions[currentQuestionIndex].text}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              onValueChange={(v) =>
                handleAnswer(questions[currentQuestionIndex].id, parseInt(v))
              }
            >
              {questions[currentQuestionIndex].options.map((o, i) => (
                <div key={i} className="flex items-center gap-2">
                  <RadioGroupItem value={o.score.toString()} />
                  <Label>{o.label}</Label>
                </div>
              ))}
            </RadioGroup>

            <Button
              className="mt-6"
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
        <Card className="mt-8 text-center">
          <CardHeader className="flex flex-col items-center gap-4">
            {result.icon}
            <CardTitle>{result.title}</CardTitle>
          </CardHeader>
          <CardContent>{result.description}</CardContent>
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
        </Card>
      )}

      <footer className="mt-12 text-center text-sm text-muted-foreground">
        Este test es solo informativo y no garantiza contratación, vacante ni embarque.
      </footer>
    </div>
  );
};

export default RealityTestPage;
