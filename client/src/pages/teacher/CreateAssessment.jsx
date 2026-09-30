import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import { HiPencilAlt, HiSparkles } from 'react-icons/hi';

const CreateAssessment = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="pt-2 lg:pt-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-navy-800 font-display">Create Assessment</h1>
        <p className="text-gray-500 mt-1">Build an assessment to understand your students' engineering readiness.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Manual Creation */}
        <Card
          hover
          onClick={() => navigate('/teacher/create/manual')}
          className="cursor-pointer group text-center"
        >
          <div className="py-6">
            <div className="w-16 h-16 rounded-2xl bg-accent-50 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <HiPencilAlt className="w-8 h-8 text-accent-600" />
            </div>
            <h2 className="text-xl font-bold text-navy-800 font-display mb-2">Create Manually</h2>
            <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
              Create questions, options and scoring yourself. Full control over every question.
            </p>
            <button className="mt-5 px-6 py-2.5 bg-accent-600 text-white font-semibold rounded-xl hover:bg-accent-700 transition-colors text-sm">
              Create Manually
            </button>
          </div>
        </Card>

        {/* AI Generation */}
        <Card
          hover
          onClick={() => navigate('/teacher/create/ai')}
          className="cursor-pointer group text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent rounded-bl-full" />
          <div className="relative py-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
              <HiSparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-navy-800 font-display mb-2">Generate with AI</h2>
            <p className="text-gray-500 text-sm max-w-xs mx-auto leading-relaxed">
              Create a complete readiness assessment using AI. No prompt writing needed.
            </p>
            <button className="mt-5 px-6 py-2.5 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors text-sm">
              Generate with AI
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateAssessment;
