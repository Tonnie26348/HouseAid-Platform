import React, { useState } from "react";
import { useVerification } from "@/hooks/useDatabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, FileText, Upload } from "lucide-react";

const VerificationForm = () => {
  const { submitRequest, request } = useVerification();
  const [formData, setFormData] = useState({
    id_document_url: "",
    police_clearance_url: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitRequest.mutateAsync(formData);
  };

  if (request.data) {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-green-600" />
            <CardTitle>Verification Request Submitted</CardTitle>
          </div>
          <CardDescription>
            Status: <span className="font-semibold capitalize">{request.data.status}</span>
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Professional Verification
        </CardTitle>
        <CardDescription>
          Upload your documents to become a verified HouseAid professional.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id_doc">National ID (Scan/Photo URL)</Label>
            <div className="flex gap-2">
              <Input
                id="id_doc"
                placeholder="https://example.com/my-id.jpg"
                value={formData.id_document_url}
                onChange={(e) => setFormData({ ...formData, id_document_url: e.target.value })}
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="police_doc">Police Clearance Certificate (Scan/Photo URL)</Label>
            <div className="flex gap-2">
              <Input
                id="police_doc"
                placeholder="https://example.com/clearance.jpg"
                value={formData.police_clearance_url}
                onChange={(e) => setFormData({ ...formData, police_clearance_url: e.target.value })}
              />
              <Button type="button" variant="outline" size="icon">
                <FileText className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={submitRequest.isPending}>
            {submitRequest.isPending ? "Submitting..." : "Submit for Verification"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VerificationForm;
