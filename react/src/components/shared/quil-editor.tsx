import katex from "katex";
import "katex/dist/katex.min.css";
import Quill from "quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Register KaTeX for formulas
window.katex = katex as typeof import("katex");

// Enable superscript & subscript support
const SizeStyle = Quill.import("attributors/style/size") as any;
SizeStyle.whitelist = ["small", false, "large", "huge"];
Quill.register(SizeStyle, true);

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      [{ align: [] }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      ["formula"],
      ["clean"],
    ],
    handlers: {
      image: function () {
        // @ts-ignore
        const range = this.quill.getSelection();
        const url = prompt("Rasm havolasini kiriting:");
        if (url && range) {
          // @ts-ignore
          this.quill.insertEmbed(range.index, "image", url, "user");
        }
      },
    },
  },
  clipboard: { matchVisual: false },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "align",
  "indent",
  "color",
  "background",
];

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const QuillEditor = ({ value = "", onChange, placeholder }: Props) => {
  return (
    <div className="w-full">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className=""
        placeholder={placeholder || "Matn kiriting..."}
      />
    </div>
  );
};

export default QuillEditor;
