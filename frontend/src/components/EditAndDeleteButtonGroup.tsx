import React from "react";
import { Button } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css.

interface IEditAndDeleteButtonGroupProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function EditAndDeleteButtonGroup(
  props: IEditAndDeleteButtonGroupProps
) {
  return (
    <>
      <Button size="sm" variant="info" onClick={props.onEdit}>
        更改
      </Button>
      <Button
        size="sm"
        variant="danger"
        className="ml-1"
        onClick={async () =>
          confirmAlert({
            title: "確認刪除",
            message: "你確定你真的要刪除這個嗎？",
            buttons: [
              {
                label: "是",
                onClick: props.onDelete,
              },
              {
                label: "否",
                onClick: () => {},
              },
            ],
          })
        }
      >
        刪除
      </Button>
    </>
  );
}
