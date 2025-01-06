import { FileText } from "lucide-react";
import { environment } from "@/config/environment";

interface DocumentViewerProps {
  fileType: string;
  filePath: string;
}

const DocumentViewer = ({ fileType, filePath }: DocumentViewerProps) => {
  const isPDF = fileType === "application/pdf";
  const isImage = fileType.startsWith("image/");
  const fullUrl = `${environment.api.baseUrl}/${filePath}`;

  if (isPDF) {
    return (
      <div className="w-full aspect-[4/3] border rounded-lg overflow-hidden">
        <iframe src={fullUrl} className="w-full h-full" title="PDF Preview" />
      </div>
    );
  }

  if (isImage) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border">
        <img
          src={fullUrl}
          alt="ID Document"
          className="object-contain w-full h-full"
        />
      </div>
    );
  }

  return (
    <div className="aspect-[4/3] bg-accent flex items-center justify-center rounded-lg">
      <div className="text-center">
        <FileText className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          This file type is not supported for preview. Please download to view.
        </p>
      </div>
    </div>
  );
};

export default DocumentViewer;
