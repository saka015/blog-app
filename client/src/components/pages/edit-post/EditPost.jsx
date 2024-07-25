import { Input, Button, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
import { Editor } from "../../common/editor/Editor";

export const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch("https://blog-backend-0ii5.onrender.com/post/" + id).then((res) =>
      res.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      })
    );
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files[0]) {
      data.set("file", files[0]);
    }

    fetch("https://blog-backend-0ii5.onrender.com/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold underline">
        Create your new post
      </h1>
      <form onSubmit={updatePost}>
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
          Update post
        </Button>
      </form>
    </div>
  );
};
