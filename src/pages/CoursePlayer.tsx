import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  PlayCircle, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Trophy,
  HelpCircle,
  Video,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const CoursePlayer = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [currentModuleIdx, setCurrentModuleIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const fetchData = async () => {
    const { data: courseData } = await supabase.from("courses").select("*").eq("id", courseId).single();
    const { data: enrollData } = await supabase.from("enrollments").select("*").eq("course_id", courseId).eq("worker_id", user?.id).single();
    
    if (courseData) setCourse(courseData);
    if (enrollData) setEnrollment(enrollData);
  };

  useEffect(() => {
    if (user && courseId) fetchData();
  }, [user, courseId]);

  const handleNextModule = () => {
    if (currentModuleIdx < (course?.modules?.length || 0) - 1) {
      setCurrentModuleIdx(prev => prev + 1);
    } else {
      setShowQuiz(true);
    }
  };

  const submitQuiz = async () => {
    const questions = course.quiz_data.questions;
    let score = 0;
    questions.forEach((q: any, idx: number) => {
      if (quizAnswers[idx] === q.correct) score++;
    });

    const passed = score === questions.length;
    setQuizSubmitted(true);

    if (passed) {
      await supabase.from("enrollments").update({
        status: 'completed',
        progress: 100,
        completed_at: new Date().toISOString()
      }).eq("id", enrollment.id);
      
      toast({ 
        title: "Course Passed!", 
        description: `Score: ${score}/${questions.length}. You earned your certification!`,
        className: "bg-primary text-white"
      });
    } else {
      toast({ 
        title: "Keep Trying!", 
        description: `Score: ${score}/${questions.length}. You need a perfect score to certify.`,
        variant: "destructive"
      });
    }
  };

  if (!course) return null;

  const currentModule = course.modules?.[currentModuleIdx];

  return (
    <DashboardLayout pageTitle={course.title}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
        {/* Main Player Area */}
        <div className="lg:col-span-3 space-y-8">
          <AnimatePresence mode="wait">
            {!showQuiz ? (
              <motion.div
                key="module"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Video Placeholder/Iframe */}
                <div className="aspect-video bg-gray-900 rounded-[3rem] overflow-hidden shadow-2xl relative group">
                  {currentModule?.video_url ? (
                    <iframe 
                      src={currentModule.video_url} 
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                       <Video className="w-24 h-24 text-white/20" />
                    </div>
                  )}
                </div>

                <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-6">
                    <Badge className="bg-primary/10 text-primary border-none font-black text-xs uppercase tracking-widest px-4 py-1">
                      Module {currentModuleIdx + 1} of {course.modules?.length}
                    </Badge>
                  </div>
                  <h2 className="text-4xl font-black text-gray-900 mb-6">{currentModule?.title}</h2>
                  <p className="text-xl text-gray-500 font-medium leading-relaxed mb-10">
                    {currentModule?.content}
                  </p>
                  
                  <div className="flex justify-between items-center pt-8 border-t border-gray-50">
                    <Button 
                      variant="outline" 
                      onClick={() => setCurrentModuleIdx(prev => Math.max(0, prev - 1))}
                      disabled={currentModuleIdx === 0}
                      className="h-14 px-8 rounded-2xl border-2 font-black"
                    >
                      <ChevronLeft className="mr-2 w-5 h-5" /> Previous
                    </Button>
                    <Button 
                      onClick={handleNextModule}
                      className="h-14 px-10 rounded-2xl bg-gray-900 text-white font-black shadow-xl"
                    >
                      {currentModuleIdx === (course.modules?.length - 1) ? "Final Quiz" : "Next Module"} <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="bg-gray-900 p-12 rounded-[3rem] text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <HelpCircle className="w-48 h-48" />
                  </div>
                  <h2 className="text-4xl font-black mb-4">Certification Assessment</h2>
                  <p className="text-xl text-gray-400 font-medium">Demonstrate your mastery to earn your professional badge.</p>
                </div>

                <div className="space-y-6">
                  {course.quiz_data?.questions.map((q: any, qIdx: number) => (
                    <Card key={qIdx} className="rounded-[2.5rem] border-none shadow-sm p-10 bg-white">
                      <h4 className="text-2xl font-black text-gray-900 mb-8 flex gap-4">
                        <span className="text-primary">{qIdx + 1}.</span> {q.question}
                      </h4>
                      <RadioGroup 
                        value={quizAnswers[qIdx]?.toString()} 
                        onValueChange={(val) => setQuizAnswers(prev => ({...prev, [qIdx]: parseInt(val)}))}
                        className="space-y-4"
                      >
                        {q.options.map((opt: string, optIdx: number) => (
                          <div key={optIdx} className="flex items-center space-x-4 p-4 rounded-2xl border-2 border-gray-50 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer">
                            <RadioGroupItem value={optIdx.toString()} id={`q${qIdx}-o${optIdx}`} className="border-primary" />
                            <Label htmlFor={`q${qIdx}-o${optIdx}`} className="text-lg font-bold text-gray-600 cursor-pointer flex-1">
                              {opt}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </Card>
                  ))}
                  
                  <div className="flex gap-4 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowQuiz(false)} 
                      className="h-16 px-10 rounded-2xl border-2 font-black text-lg"
                    >
                      Back to Modules
                    </Button>
                    <Button 
                      onClick={submitQuiz}
                      className="flex-1 h-16 rounded-2xl bg-primary font-black text-xl shadow-2xl shadow-primary/20"
                    >
                      Complete & Certify <Trophy className="ml-3 w-6 h-6" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
               <CardHeader className="bg-gray-50 p-8">
                  <CardTitle className="text-xl font-black text-gray-900">Course Progress</CardTitle>
               </CardHeader>
               <CardContent className="p-8">
                  <div className="space-y-6">
                    {course.modules?.map((m: any, idx: number) => (
                      <div 
                        key={m.id} 
                        className={`flex items-center gap-4 cursor-pointer group`}
                        onClick={() => { setShowQuiz(false); setCurrentModuleIdx(idx); }}
                      >
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                            idx < currentModuleIdx ? "bg-green-100 text-green-600" :
                            idx === currentModuleIdx ? "bg-primary text-white scale-110" : "bg-gray-50 text-gray-400"
                         }`}>
                            {idx < currentModuleIdx ? <CheckCircle2 className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                         </div>
                         <div className="flex-1">
                            <h4 className={`font-bold text-sm leading-tight transition-colors ${
                               idx === currentModuleIdx ? "text-primary" : "text-gray-500 group-hover:text-gray-900"
                            }`}>
                               {m.title}
                            </h4>
                         </div>
                      </div>
                    ))}
                    <div 
                      className={`flex items-center gap-4 cursor-pointer group pt-4 border-t border-gray-50`}
                      onClick={() => setShowQuiz(true)}
                    >
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          enrollment?.status === 'completed' ? "bg-yellow-100 text-yellow-600" :
                          showQuiz ? "bg-primary text-white scale-110" : "bg-gray-50 text-gray-400"
                       }`}>
                          <Award className="w-6 h-6" />
                       </div>
                       <h4 className={`font-black text-sm uppercase tracking-widest ${showQuiz ? "text-primary" : "text-gray-400"}`}>
                          Final Quiz
                       </h4>
                    </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] bg-primary/5 border-none p-8">
               <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="font-black text-primary text-sm uppercase tracking-widest">Resources</span>
               </div>
               <p className="text-xs text-primary/70 font-medium leading-relaxed">
                 Download the Professional Safety Handbook and Nutrition Guides for this course.
               </p>
               <Button variant="link" className="p-0 h-auto text-primary font-black text-xs mt-4">Download PDF ↓</Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoursePlayer;
