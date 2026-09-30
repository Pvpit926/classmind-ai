import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { ASSESSMENT_CATEGORIES } from '../../data/demoData';
import { HiPlus, HiTrash, HiArrowLeft, HiSave, HiEye, HiUpload } from 'react-icons/hi';
import api from '../../services/api';

const EMPTY_QUESTION = {
  text: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  correctAnswer: '',
  category: '',
  difficulty: 'basic',
};

const ManualAssessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, error: showError } = useToast();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ ...EMPTY_QUESTION }]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // If we received generated assessment from AI
    if (location.state?.generatedAssessment) {
      const data = location.state.generatedAssessment;
      if (data.title) setTitle(data.title);
      if (data.description) setDescription(data.description);
      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions.map(q => ({
          ...EMPTY_QUESTION,
          ...q
        })));
      }
    }
  }, [location.state]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, { ...EMPTY_QUESTION }]);
  };

  const removeQuestion = (index) => {
    if (questions.length <= 1) return;
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value) => {
    setQuestions((prev) => prev.map((q, i) => i === index ? { ...q, [field]: value } : q));
  };

  const validate = () => {
    if (!title.trim()) return 'Assessment title is required.';
    if (questions.length === 0) return 'At least one question is required.';

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.text.trim()) return `Please add text for Question ${i + 1}.`;
      if (!q.optionA.trim() || !q.optionB.trim() || !q.optionC.trim() || !q.optionD.trim()) {
        return `Please fill all options for Question ${i + 1}.`;
      }
      if (!q.correctAnswer) return `Please select a correct answer for Question ${i + 1}.`;
      if (!q.category) return `Please select a category for Question ${i + 1}.`;
      if (!q.difficulty) return `Please select a difficulty for Question ${i + 1}.`;
    }
    return null;
  };

  const handleSave = async (status = 'draft') => {
    const errorMsg = validate();
    if (errorMsg && status === 'published') {
      showError(errorMsg);
      return;
    }

    setIsSaving(true);
    try {
      const payload = {
        title: title || 'Untitled Assessment',
        description,
        questions,
        status,
        questionCount: questions.length,
        assignedStudents: status === 'published' ? ['all'] : [],
      };

      await api.createAssessment(payload);
      
      success(`Assessment ${status === 'published' ? 'published' : 'saved'} successfully!`);
      navigate('/teacher/assessments');
    } catch (err) {
      showError(err.message || 'Something went wrong.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="pt-2 lg:pt-0">
        <button
          onClick={() => navigate('/teacher/create')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-accent-600 mb-3 transition-colors"
        >
          <HiArrowLeft className="w-4 h-4" /> Back
        </button>
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Create Assessment Manually</h1>
        <p className="text-gray-500 mt-1">Define questions, options, and scoring.</p>
      </div>

      {/* Assessment Details */}
      <Card>
        <h2 className="text-lg font-semibold text-navy-800 mb-4 font-display">Assessment Details</h2>
        <div className="space-y-4">
          <Input
            label="Assessment Title"
            placeholder="e.g. Engineering Readiness Assessment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-navy-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 resize-none"
              rows={3}
              placeholder="Describe the purpose of this assessment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Questions */}
      {questions.map((question, index) => (
        <Card key={index}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-800 font-display">Question {index + 1}</h3>
            {questions.length > 1 && (
              <button
                onClick={() => removeQuestion(index)}
                className="p-2 rounded-xl text-danger-400 hover:text-danger-600 hover:bg-danger-50 transition-colors"
                aria-label="Remove question"
              >
                <HiTrash className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-700">Question Text</label>
              <textarea
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-navy-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200 resize-none"
                rows={2}
                placeholder="Enter your question..."
                value={question.text}
                onChange={(e) => updateQuestion(index, 'text', e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <Input
                label="Option A"
                placeholder="Enter option A"
                value={question.optionA}
                onChange={(e) => updateQuestion(index, 'optionA', e.target.value)}
              />
              <Input
                label="Option B"
                placeholder="Enter option B"
                value={question.optionB}
                onChange={(e) => updateQuestion(index, 'optionB', e.target.value)}
              />
              <Input
                label="Option C"
                placeholder="Enter option C"
                value={question.optionC}
                onChange={(e) => updateQuestion(index, 'optionC', e.target.value)}
              />
              <Input
                label="Option D"
                placeholder="Enter option D"
                value={question.optionD}
                onChange={(e) => updateQuestion(index, 'optionD', e.target.value)}
              />
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              <Select
                label="Correct Answer"
                options={[
                  { value: 'a', label: 'Option A' },
                  { value: 'b', label: 'Option B' },
                  { value: 'c', label: 'Option C' },
                  { value: 'd', label: 'Option D' },
                ]}
                value={question.correctAnswer}
                onChange={(e) => updateQuestion(index, 'correctAnswer', e.target.value)}
              />
              <Select
                label="Category"
                options={ASSESSMENT_CATEGORIES.map((c) => ({ value: c.id, label: c.label }))}
                value={question.category}
                onChange={(e) => updateQuestion(index, 'category', e.target.value)}
              />
              <Select
                label="Difficulty"
                options={[
                  { value: 'basic', label: 'Basic' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' },
                ]}
                value={question.difficulty}
                onChange={(e) => updateQuestion(index, 'difficulty', e.target.value)}
              />
            </div>
          </div>
        </Card>
      ))}

      {/* Add Question */}
      <button
        onClick={addQuestion}
        className="w-full p-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:text-accent-600 hover:border-accent-300 hover:bg-accent-50 transition-all duration-200 flex items-center justify-center gap-2 font-medium"
      >
        <HiPlus className="w-5 h-5" />
        Add Question
      </button>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 sticky bottom-4 bg-white p-4 rounded-2xl shadow-lg border border-gray-100">
        <span className="text-sm text-gray-500">{questions.length} question{questions.length !== 1 ? 's' : ''}</span>
        <div className="flex gap-3">
          <Button variant="secondary" icon={HiSave} onClick={() => handleSave('draft')} disabled={isSaving}>
            Save Draft
          </Button>
          <Button variant="secondary" icon={HiEye} disabled={isSaving}>Preview</Button>
          <Button icon={HiUpload} onClick={() => handleSave('published')} loading={isSaving}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ManualAssessment;
