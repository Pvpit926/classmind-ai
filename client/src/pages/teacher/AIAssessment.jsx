import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import Card from '../../components/Card';
import Button from '../../components/Button';
import RadioCard from '../../components/RadioCard';
import { HiArrowLeft, HiSparkles } from 'react-icons/hi';
import api from '../../services/api';

const AIAssessment = () => {
  const navigate = useNavigate();
  const { success, info, error: showError } = useToast();
  const [generating, setGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [config, setConfig] = useState({
    area: '',
    level: '',
    questions: '',
    difficulty: '',
    type: '',
  });

  const handleGenerate = async () => {
    setGenerating(true);
    info('Generating assessment with AI...');
    setLoadingStep('Understanding assessment settings...');
    
    try {
      setTimeout(() => setLoadingStep('Creating questions...'), 1500);
      setTimeout(() => setLoadingStep('Reviewing question quality...'), 3500);

      const response = await api.generateAssessment(config);
      
      if (response.success && response.data) {
        success('Assessment generated successfully!');
        // Pass generated data to ManualAssessment for review and editing
        navigate('/teacher/create/manual', { state: { generatedAssessment: response.data } });
      } else {
        throw new Error(response.message || 'Invalid response from AI');
      }
    } catch (err) {
      console.error(err);
      showError("We couldn't generate the assessment right now. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const updateConfig = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const isReady = config.area && config.level && config.questions && config.difficulty && config.type;

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="pt-2 lg:pt-0">
        <button
          onClick={() => navigate('/teacher/create')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-accent-600 mb-3 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Generate with AI</h1>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full">
            ✨ AI Powered
          </span>
        </div>
        <p className="text-gray-500 mt-1">Select your preferences and let AI create the assessment for you.</p>
      </div>

      {/* Assessment Area */}
      <Card>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Assessment Area</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { id: 'curriculum', label: 'Curriculum Readiness', icon: '📚' },
            { id: 'academic', label: 'Academic Foundation', icon: '🎓' },
            { id: 'learning', label: 'Learning Habits', icon: '📖' },
            { id: 'time', label: 'Time Management', icon: '⏰' },
            { id: 'adaptation', label: 'College Adaptation', icon: '🏫' },
            { id: 'overall', label: 'Overall First-Year Readiness', icon: '🎯' },
          ].map((area) => (
            <RadioCard
              key={area.id}
              name="area"
              value={area.id}
              label={area.label}
              icon={area.icon}
              selected={config.area === area.id}
              onChange={() => updateConfig('area', area.id)}
            />
          ))}
        </div>
      </Card>

      {/* Student Level */}
      <Card>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Student Level</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { id: 'new', label: 'New Engineering Student' },
            { id: 'sem1', label: 'First Semester' },
            { id: 'year1', label: 'First Year' },
          ].map((level) => (
            <RadioCard
              key={level.id}
              name="level"
              value={level.id}
              label={level.label}
              selected={config.level === level.id}
              onChange={() => updateConfig('level', level.id)}
            />
          ))}
        </div>
      </Card>

      {/* Number of Questions */}
      <Card>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Number of Questions</h2>
        <div className="grid grid-cols-3 gap-3">
          {['10', '15', '20'].map((num) => (
            <RadioCard
              key={num}
              name="questions"
              value={num}
              label={`${num} Questions`}
              selected={config.questions === num}
              onChange={() => updateConfig('questions', num)}
            />
          ))}
        </div>
      </Card>

      {/* Difficulty */}
      <Card>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Difficulty</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'basic', label: 'Basic' },
            { id: 'intermediate', label: 'Intermediate' },
            { id: 'advanced', label: 'Advanced' },
            { id: 'mixed', label: 'Mixed' },
          ].map((d) => (
            <RadioCard
              key={d.id}
              name="difficulty"
              value={d.id}
              label={d.label}
              selected={config.difficulty === d.id}
              onChange={() => updateConfig('difficulty', d.id)}
            />
          ))}
        </div>
      </Card>

      {/* Question Type */}
      <Card>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Question Type</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'mcq', label: 'MCQ' },
            { id: 'situational', label: 'Situational' },
            { id: 'mixed', label: 'Mixed' },
          ].map((t) => (
            <RadioCard
              key={t.id}
              name="type"
              value={t.id}
              label={t.label}
              selected={config.type === t.id}
              onChange={() => updateConfig('type', t.id)}
            />
          ))}
        </div>
      </Card>

      {/* Generate Button */}
      <Button
        size="xl"
        className="w-full !bg-gradient-to-r !from-purple-600 !to-accent-600 hover:!from-purple-700 hover:!to-accent-700"
        disabled={!isReady}
        loading={generating}
        onClick={handleGenerate}
        icon={HiSparkles}
      >
        {generating ? 'Generating Assessment...' : '✨ Generate Assessment with AI'}
      </Button>

      {generating && (
        <Card className="bg-purple-50 border-purple-100 text-center">
          <div className="py-4">
            <div className="w-10 h-10 border-3 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-3" style={{ borderWidth: '3px' }} />
            <p className="text-purple-700 font-medium">Generating your assessment...</p>
            <p className="text-purple-500 text-sm mt-2">{loadingStep}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIAssessment;
