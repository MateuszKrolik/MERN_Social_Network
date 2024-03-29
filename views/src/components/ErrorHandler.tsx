import React, { Fragment, useState, useEffect } from "react";
import { Backdrop } from "@mui/material";
import Modal from "./Modal";

interface ErrorHandlerProps {
    error: { message: string };
    onHandle: () => void;
}

const ErrorHandler = ({ error, onHandle }: ErrorHandlerProps) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (error) {
            setShow(true);
        }
    }, [error]);

    const handle = () => {
        setShow(false);
        onHandle();
    };

    return (
        <Fragment>
            {show && <Backdrop open onClick={handle} />}
            {show && (
                <Modal
                    open={show}
                    title="An Error Occurred"
                    onCancelModal={handle}
                    onAcceptModal={handle}
                    acceptEnabled
                    isLoading={false}
                >
                    <p>{error.message}</p>
                </Modal>
            )}
        </Fragment>
    );
};

export default ErrorHandler;
