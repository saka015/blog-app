import { Input, Button, Textarea } from "@nextui-org/react";
import { useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { Editor } from "../../common/editor/Editor";
import { UserContext } from "../../../context/UserContext";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "video",
  "color",
  "background",
  "code",
  "script",
  "formula",
];
export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { userInfo } = useContext(UserContext);


  const CreateNewPost = async (e) => {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    console.log(files);
    e.preventDefault();

    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  };
  if (redirect) {
    window.location.reload();
    return <Navigate to={"/"} />;
  }

  if (!userInfo) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold underline">
        Create your new post
      </h1>
      <form onSubmit={CreateNewPost}>
        <Input
          type="text"
          variant="underlined"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          variant="underlined"
          label="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <br />
        <Input
          type="file"
          variant="underlined"
          label="Image"
          required
          onChange={(e) => setFiles(e.target.files)}
        />
        <br />
        <Editor value={content} onChange={setContent} />
        <Button
          variant="ghost"
          color="success"
          className="w-full my-2"
          type="submit"
        >
          Create post
        </Button>
      </form>
    </div>
  );
};
