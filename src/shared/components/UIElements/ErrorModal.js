import React from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";

const ErrorModal = (props) => {
    return (
        <Modal
            show={!!props.error}
            onCancel={props.onClear}
            header="에러 발생!"
            footer={<Button onClick={props.onClear}>확인</Button>}
        >
            {props.error}
        </Modal>
    );
};

export default ErrorModal;
