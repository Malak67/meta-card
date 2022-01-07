import { useEffect } from "react";
import Modal from "react-modal";
import { MetaButton } from "../MetaButton";
import { useContactItemEffects } from "./ContactItem.effects";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { shortenAddress } from "../../utils";

export const ContactItem = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isOpen,
    openModal,
    closeModal,
    contacts,
    opeDeleteModal,
    onDelete,
    closeDeleteModal,
    isDeleteOpen,
    onCancelDelete,
  } = useContactItemEffects();

  useEffect(() => {
    Modal.setAppElement("body");
  });

  return (
    <div className="max-w-xl w-full">
      <MetaButton
        buttonText="Add a new contact"
        type="button"
        clickHandler={openModal}
      />
      <Modal
        className="modal gradient-bg-footer "
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="flex-1 text-white text-center text-1xl">
            Add a new contact
          </h2>
          <IoMdCloseCircleOutline
            onClick={closeModal}
            className="cursor-pointer text-3xl text-white hover:text-gray-300"
          />
        </div>
        <form
          className="max-w-xl m-auto pb-8 px-12"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-4">
            <label className="text-white font-medium">Address</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              placeholder="0x...."
              autoFocus
              {...register("address")}
            />
            {errors.address && (
              <div className="mb-3 text-normal text-red-500">
                {errors.address.message}
              </div>
            )}
          </div>
          <MetaButton buttonText="Submit" type="submit" />
        </form>
      </Modal>

      <Modal
        className="modal gradient-bg-footer "
        isOpen={isDeleteOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Modal"
      >
        <div className="flex justify-between items-center p-4 flex-col">
          <h2 className="flex-1 text-white text-center text-1xl">
            Are you sure you want to remove this link?
          </h2>
          <div className="flex justify-end gap-5 mt-10">
            <button
              onClick={onCancelDelete}
              className="bg-transparent hover:bg-[#ff5b79] text-[#fa4466] hover:text-white py-2 px-4 border border-[#ff5b79] hover:border-transparent rounded"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="bg-[#ff5b79] hover:bg-[#fa4466] text-white font-bold py-2 px-4 rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      {contacts?.length !== 0 && (
        <div className="white-glassmorphism p-10 mt-10">
          <div className="mb-6">
            {contacts.map((contactAddr: string) => (
              <div
                key={contactAddr}
                className="mt-6 w-full relative inline-flex items-center justify-center"
              >
                <h2 className="text-2xl text-white">
                  {shortenAddress(contactAddr)}
                </h2>
                <AiFillDelete
                  onClick={() => opeDeleteModal(contactAddr)}
                  className="cursor-pointer text-2xl text-white hover:text-[#ff5b79] ml-6"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
