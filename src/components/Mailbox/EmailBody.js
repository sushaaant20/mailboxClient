import { Fragment } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EmailBody = () => {
  return (
    <Fragment>
      <Editor />
    </Fragment>
  );
};
export default EmailBody;
