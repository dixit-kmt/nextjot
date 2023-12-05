import React, {useState} from "react";
import {
    Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function Create({ isOpen, onOpen, onOpenChange, reload, setReload }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (formData.title == "" || formData.description == "") {
      return false;
    }
    return true;
  };

  const submit = async (e, onClose) => {
    e.preventDefault();
    const errors = validate();
    if (!errors) {
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setFormData({
      title: "",
      description: "",
    });
    setReload(!reload);
    setLoading(false);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create Jot
              </ModalHeader>
              <ModalBody>
                <form onSubmit={(e) => submit(e, onClose)}>
                  <Input
                    type="text"
                    label="Title"
                    name="title"
                    className="mb-4"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                  <Input
                    type="text"
                    label="Description"
                    name="description"
                    className="mb-8"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                  <Button
                    disabled={loading}
                    className="bg-[#776B5D] text-white focus:outline-none"
                    type="submit"
                  >
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
