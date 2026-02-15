import React from 'react';
import { theme } from '../../constants/theme';
import { CONDITIONS } from '../../constants/conditions';
import ScreenWrapper from '../shared/ScreenWrapper';

export default function QuestionsScreen({
  conditions,
  currentQuestionIndex,
  answers,
  onAnswer,
  onPrevious,
  progress
}) {
  const currentQuestion = conditions[currentQuestionIndex];
  if (!currentQuestion) return null;

  const conditionDef = CONDITIONS[currentQuestion.key];
  const questionProgress = Math.round(((currentQuestionIndex + 1) / conditions.length) * 100);

  return (
    <ScreenWrapper>
      {progress !== undefined && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{ height: '8px', background: theme.grayLight, borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${theme.purple}, ${theme.green})`,
              borderRadius: '4px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      )}
      {/* Sub-progress for questions */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: theme.purple, fontWeight: '600' }}>SEVERITY QUESTIONS</span>
          <span style={{ fontSize: '12px', color: theme.gray }}>{currentQuestionIndex + 1} of {conditions.length}</span>
        </div>
        <div style={{ height: '6px', background: theme.grayLight, borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${questionProgress}%`,
            background: theme.purple,
            borderRadius: '3px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '40px' }}>{currentQuestion.icon}</span>
      </div>

      <h2 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: theme.grayDark,
        marginBottom: '6px',
        textAlign: 'center'
      }}>
        {currentQuestion.name}
        {currentQuestion.side && ` (${currentQuestion.side})`}
      </h2>

      <p style={{
        color: theme.gray,
        fontSize: '15px',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        {conditionDef.question}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {conditionDef.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onAnswer(opt.value)}
            style={{
              width: '100%',
              padding: '16px',
              border: '2px solid #E5E7EB',
              borderRadius: '12px',
              background: theme.white,
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
            onMouseOver={e => {
              e.currentTarget.style.borderColor = theme.purple;
              e.currentTarget.style.background = theme.purpleLight;
            }}
            onMouseOut={e => {
              e.currentTarget.style.borderColor = '#E5E7EB';
              e.currentTarget.style.background = theme.white;
            }}
          >
            <span style={{ color: theme.grayDark, fontSize: '15px', fontWeight: '500' }}>{opt.label}</span>
            <span style={{
              background: theme.greenLight,
              color: theme.greenDark,
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              {opt.value}%
            </span>
          </button>
        ))}
      </div>

      {currentQuestionIndex > 0 && (
        <button
          onClick={onPrevious}
          style={{
            width: '100%',
            marginTop: '16px',
            padding: '12px',
            background: 'transparent',
            color: theme.gray,
            border: 'none',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          ← Previous question
        </button>
      )}
    </ScreenWrapper>
  );
}
