import React, { useEffect, useState } from "react";
import {
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

export default function Edit({ selectedPost, isOpen, onOpen, onOpenChange, reload, setReload }) {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    setFormData({
      id: selectedPost?._id || "",
      title: selectedPost?.title || "",
      description: selectedPost?.description || "",
    });
  }, [selectedPost]);

  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (formData.title == "" || formData.description == "") {
      return false;
    }
    return true;
  };

  const submit = async (e, onClose) => {
    e.preventDefault();
    setLoading(true);
    const errors = validate();
    if (!errors) {
      return;
    }
    try {
      const res = await fetch("/api/posts", {
        method: "PUT",
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
    setLoading(false);
    setReload(!reload);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Jot
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
