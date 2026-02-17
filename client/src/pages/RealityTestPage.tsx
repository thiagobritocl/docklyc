import React, { useState, useEffect } from 'react';
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
    text: 'Você consegue trabalhar 7 dias por semana, sem folga fixa?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 2,
    text: 'Aceitaria jornadas de 10 a 14 horas por dia por meses?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 3,
    text: 'Você se sente bem acordando cedo ou dormindo muito tarde, dependendo da escala?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 4,
    text: 'Já trabalhou longos períodos sem finais de semana?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 5,
    text: 'Você consegue ficar muito tempo em pé?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 6,
    text: 'Aceitaria dividir cabine com outra pessoa?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 7,
    text: 'Consegue viver em espaço pequeno, com pouca privacidade?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 8,
    text: 'Você se sente bem em conviver com diferentes nacionalidades e culturas?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 9,
    text: 'Já trabalhou sob pressão constante?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 10,
    text: 'Você lida bem com ambientes altamente hierárquicos?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 11,
    text: 'Você se adapta bem a regras rígidas sobre horários, uniformes e comportamento?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
    ],
  },
  {
    id: 12,
    text: 'Consegue ficar longos períodos longe da família, com pouco contato frequente?',
    options: [
      { label: 'Sim, me sinto confortável', score: 2 },
      { label: 'Consigo, mas com dificuldade', score: 1 },
      { label: 'Não me sinto confortável', score: 0 },
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

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const calculateResults = () => {
    const score = Object.values(answers).reduce((sum, s) => sum + s, 0);
    setTotalScore(score);
    setShowResults(true);
  };

  const progress = ((currentQuestionIndex + (showResults ? 1 : 0)) / questions.length) * 100;

  const currentQuestion = questions[currentQuestionIndex];
  const hasAnsweredCurrentQuestion = answers[currentQuestion?.id] !== undefined;

  const getResult = () => {
    const maxScore = questions.length * 2; // Each question max score is 2
    const scorePercentage = (totalScore / maxScore) * 100;

    if (scorePercentage <= 33) {
      return {
        title: '🔴 Alerta de Realidade',
        description: (
          <>
            <p>Seu perfil demonstra muita incompatibilidade com a rotina de vida a bordo. As exigências físicas e emocionais são altas, e a falta de adaptação pode levar a uma experiência muito frustrante.</p>
            <p>Este teste é apenas orientativo e não substitui a experiência real. Reflita profundamente se este estilo de vida se alinha com suas expectativas e limites pessoais.</p>
          </>
        ),
        icon: <XCircle className="w-16 h-16 text-red-500" />,
      };
    } else if (scorePercentage <= 66) {
      return {
        title: '🟡 Perfil em Construção',
        description: (
          <>
            <p>Existe compatibilidade parcial com a vida a bordo, mas é necessário um preparo físico, emocional ou de expectativa mais aprofundado. Você pode se adaptar, mas enfrentará desafios significativos.</p>
            <p>Este teste é apenas orientativo e não substitui a experiência real. Considere buscar mais informações e conversar com quem já viveu essa rotina para alinhar suas expectativas.</p>
          </>
        ),
        icon: <AlertTriangle className="w-16 h-16 text-yellow-500" />,
      };
    } else {
      return {
        title: '🟢 Perfil Compatível com Vida a Bordo',
        description: (
          <>
            <p>Seu perfil demonstra boa compatibilidade com a rotina real de trabalho em cruzeiros. Você parece ter as características necessárias para se adaptar bem às exigências da vida a bordo.</p>
            <p>Este teste é apenas orientativo e não substitui a experiência real. Continue se informando e se preparando para essa jornada única.</p>
          </>
        ),
        icon: <CheckCircle className="w-16 h-16 text-green-500" />,
      };
    }
  };

  const result = showResults ? getResult() : null;

  return (
    <div className="container mx-auto py-8 px-4 min-h-[calc(100vh-120px)]">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-8 text-primary"
      >
        Teste de Realidade
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg text-center max-w-3xl mx-auto mb-12 text-muted-foreground"
      >
        Trabalhar em cruzeiros não é para todos. A rotina é intensa, exigente e disciplinada. Este teste não mede talento, mas sua compatibilidade com a realidade da vida a bordo. O resultado é apenas orientativo.
      </motion.p>

      <Progress value={progress} className="w-full max-w-3xl mx-auto mb-8 h-2" />

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-6 shadow-lg border-border/50 bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {currentQuestionIndex + 1}. {currentQuestion.text}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  onValueChange={(value) => handleAnswer(currentQuestion.id, parseInt(value))}
                  value={answers[currentQuestion.id]?.toString() || ''}
                  className="space-y-4"
                >
                  {currentQuestion.options.map((option, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <RadioGroupItem value={option.score.toString()} id={`q${currentQuestion.id}-option${idx}`} />
                      <Label htmlFor={`q${currentQuestion.id}-option${idx}`} className="text-base font-normal cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
            <div className="flex justify-between mt-6 max-w-2xl mx-auto">
              <Button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                variant="outline"
                className="w-32"
              >
                Anterior
              </Button>
              {currentQuestionIndex === questions.length - 1 ? (
                <Button
                  onClick={calculateResults}
                  disabled={!hasAnsweredCurrentQuestion}
                  className="w-32 bg-primary hover:bg-primary/90"
                >
                  Ver Resultado
                </Button>
              ) : (
                <Button
                  onClick={goToNextQuestion}
                  disabled={!hasAnsweredCurrentQuestion}
                  className="w-32 bg-primary hover:bg-primary/90"
                >
                  Próxima
                </Button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="p-8 shadow-lg border-border/50 bg-card/60 backdrop-blur-sm">
              <CardHeader className="flex flex-col items-center justify-center space-y-4">
                {result?.icon}
                <CardTitle className="text-3xl font-bold text-foreground">{result?.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-lg text-muted-foreground space-y-4">
                {result?.description}
              </CardContent>
            </Card>
            <Button onClick={() => {
              setCurrentQuestionIndex(0);
              setAnswers({});
              setShowResults(false);
              setTotalScore(0);
            }} className="mt-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Refazer Teste
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-16 text-center text-sm text-muted-foreground">
        <p>Este teste é apenas informativo e não garante contratação, vaga ou embarque. O Dockly é um site independente de orientação.</p>
      </footer>
    </div>
  );
};

export default RealityTestPage;
