import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/shared/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award,
  Lock,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const Academy = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const [coursesRes, enrollmentsRes] = await Promise.all([
      supabase.from("courses").select("*"),
      supabase.from("enrollments").select("*").eq("worker_id", user?.id)
    ]);

    if (coursesRes.data) setCourses(coursesRes.data);
    if (enrollmentsRes.data) setEnrollments(enrollmentsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const enroll = async (courseId: number) => {
    const { error } = await supabase.from("enrollments").insert({
      worker_id: user?.id,
      course_id: courseId,
      status: 'in-progress',
      progress: 10
    });

    if (error) {
      toast({ title: "Error", description: "Failed to enroll in course.", variant: "destructive" });
    } else {
      toast({ title: "Enrolled!", description: "You have successfully started this course." });
      fetchData();
    }
  };

  const completeCourse = async (enrollmentId: number, courseTitle: string) => {
    const { error } = await supabase
      .from("enrollments")
      .update({ status: 'completed', progress: 100, completed_at: new Date().toISOString() })
      .eq("id", enrollmentId);

    if (error) {
      toast({ title: "Error", description: "Failed to update course progress.", variant: "destructive" });
    } else {
      toast({ 
        title: "Congratulations!", 
        description: `You've earned the ${courseTitle} Certification Badge!`,
        className: "bg-primary text-white" 
      });
      fetchData();
    }
  };

  const getEnrollment = (courseId: number) => enrollments.find(e => e.course_id === courseId);

  return (
    <DashboardLayout pageTitle="Skills Academy">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Award className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <Badge className="mb-6 bg-primary/20 text-primary border-none px-4 py-1 text-sm font-bold uppercase tracking-widest">
              Professional Development
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Your Path to <br /><span className="text-primary">Mastery.</span></h1>
            <p className="text-xl text-gray-400 max-w-2xl font-medium leading-relaxed">
              Earn certified badges and increase your market value. Our courses are designed by 
              industry experts to help you provide the best service in Kenya.
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => {
            const enrollment = getEnrollment(course.id);
            const isCompleted = enrollment?.status === 'completed';
            const isInProgress = enrollment?.status === 'in-progress';

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="group h-full rounded-[2.5rem] border-none shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={course.thumbnail_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-900 border-none font-bold uppercase tracking-tighter">
                        {course.category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-black uppercase tracking-widest mb-4">
                       <Clock className="w-3 h-3" />
                       <span>{course.duration}</span>
                       <span className="mx-2">•</span>
                       <BookOpen className="w-3 h-3" />
                       <span>6 Modules</span>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    
                    <p className="text-gray-500 font-medium mb-8 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="space-y-6">
                      {enrollment ? (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest">
                            <span className={isCompleted ? "text-green-600" : "text-primary"}>
                              {isCompleted ? "Course Completed" : "Current Progress"}
                            </span>
                            <span className="text-gray-900">{enrollment.progress}%</span>
                          </div>
                          <Progress value={enrollment.progress} className="h-3 rounded-full bg-gray-100" />
                          
                          {isCompleted ? (
                             <Button className="w-full h-14 rounded-2xl bg-green-50 text-green-600 hover:bg-green-100 border-none font-black text-lg">
                               <CheckCircle2 className="mr-2 w-6 h-6" /> View Certificate
                             </Button>
                          ) : (
                             <Button 
                               onClick={() => completeCourse(enrollment.id, course.title)}
                               className="w-full h-14 rounded-2xl bg-primary shadow-lg shadow-primary/20 font-black text-lg"
                             >
                               Continue Learning <ChevronRight className="ml-2 w-5 h-5" />
                             </Button>
                          ) }
                        </div>
                      ) : (
                        <Button 
                          onClick={() => enroll(course.id)}
                          className="w-full h-14 rounded-2xl bg-gray-900 text-white font-black text-lg hover:bg-primary transition-all shadow-xl shadow-gray-200"
                        >
                          <PlayCircle className="mr-2 w-6 h-6" /> Start Learning
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Locked/Advanced Courses */}
        <div className="pt-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Advanced Specializations</h2>
            <div className="h-px flex-1 bg-gray-100" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 opacity-60">
             <Card className="rounded-[2.5rem] border-2 border-dashed border-gray-200 p-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                      <Lock className="w-8 h-8" />
                   </div>
                   <div>
                      <h4 className="font-black text-xl text-gray-900">Elite Household Manager</h4>
                      <p className="text-gray-500 font-medium">Unlocked after 3 foundational courses</p>
                   </div>
                </div>
                <Badge variant="outline" className="font-bold border-2">LOCKED</Badge>
             </Card>
             <Card className="rounded-[2.5rem] border-2 border-dashed border-gray-200 p-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                      <Lock className="w-8 h-8" />
                   </div>
                   <div>
                      <h4 className="font-black text-xl text-gray-900">Advanced Newborn Care</h4>
                      <p className="text-gray-500 font-medium">Requires Childcare 101 completion</p>
                   </div>
                </div>
                <Badge variant="outline" className="font-bold border-2">LOCKED</Badge>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Academy;
