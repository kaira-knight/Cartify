import { UploadCloud } from "lucide-react";

const FileUpload = ({
  label,
  onChange,
  preview,
  error,
  accept = "image/*",
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-gray-500 font-medium">
          {label}
        </label>
      )}

      {/* Upload Box */}
      <label className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all
        ${error 
          ? "border-red-400 bg-red-50" 
          : "border-gray-200 hover:border-indigo-400 bg-gray-50"}
      `}>
        <div className="flex flex-col items-center justify-center text-gray-500">
          <UploadCloud size={28} />
          <p className="text-sm mt-2">
            Click to upload or drag & drop
          </p>
          <span className="text-xs text-gray-400">
            PNG, JPG (max 2MB)
          </span>
        </div>

        <input
          type="file"
          className="hidden"
          accept={accept}
          onChange={onChange}
        />
      </label>

      {/* Preview */}
      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt="preview"
            className="w-32 h-32 object-cover rounded-lg border shadow-sm"
          />
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;