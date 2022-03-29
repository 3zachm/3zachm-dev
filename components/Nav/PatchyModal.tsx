import { Box, Fade, Modal } from "@mui/material";
import { m } from "framer-motion";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 550,
    minHeight: 250,
    width: "30vw",
    bgcolor: 'rgba(0, 0, 0, 0.78)',
    p: 4,
    outline: 'none',
    select: 'none',
};

function PatchyModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <m.a
                onClick={handleOpen}
                whileHover={{
                    scale: 1.05,
                    textShadow: "0px 0px 10px rgb(253 224 71)",
                    transition: {
                        duration: 0.2
                    }
                }}
                whileTap={{
                    scale: 0.95,
                    textShadow: "0px 0px 10px #fff",
                    transition: {
                        duration: 0.2
                    }
                }}
                className="text-white md:pl-5 md:pr-5 relative select-none pointer-events-auto pl-3 pr-3"
            >
                Patchouli?
            </m.a>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className="flex flex-col">
                            <h1 className="font-bold text-[30px] mb-4">What are the sprite thingies???</h1>
                            <p className="mb-2">The sprites are Patchouli Knowledge from Touhou 10.5!</p>
                            <p>Drag with mouse to move</p>
                            <p>Press P to spawn (or click the moon)</p>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default PatchyModal;