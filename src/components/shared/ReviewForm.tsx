import React, { useState } from "react";
import { useReviews } from "@/hooks/useDatabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface ReviewFormProps {
  revieweeId: string;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ revieweeId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { addReview } = useReviews(revieweeId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReview.mutateAsync({ reviewee_id: revieweeId, rating, comment });
      setComment("");
      setRating(5);
      toast.success("Review submitted successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            className="w-full"
          />
          <Button type="submit" disabled={addReview.isPending}>
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
