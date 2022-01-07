import { useEffect } from "react";
import Modal from "react-modal";
import { MetaButton } from "../MetaButton";
import { useSocialLinkEffects } from "./SocialLink.effects";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ISocialLink } from "../../context/types";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export const SocialLink = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isOpen,
    openModal,
    closeModal,
    onDelete,
    onUpdate,
    socialLinks,
    headerMessage,
  } = useSocialLinkEffects();

  useEffect(() => {
    Modal.setAppElement("body");
  });

  return (
    <div className="max-w-xl">
      <MetaButton
        buttonText="Add new Social link"
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
            {headerMessage}
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
            <label className="text-white font-medium">Name</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              placeholder="Linkedin"
              autoFocus
              {...register("name")}
            />
            {errors.name && (
              <div className="mb-3 text-normal text-red-500">
                {errors.name.message}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="text-white font-medium">Link</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              placeholder="https://linkedin.com/john-doe"
              autoFocus
              {...register("link")}
            />
            {errors.link && (
              <div className="mb-3 text-normal text-red-500">
                {errors.link.message}
              </div>
            )}
          </div>

          <MetaButton buttonText="Submit" type="submit" />
        </form>
      </Modal>

      {socialLinks?.length !== 0 && (
        <div className="white-glassmorphism p-10 mt-10">
          <div className="mb-6">
            {socialLinks.map((socialLink: ISocialLink) => (
              <div
                key={socialLink.link + "-" + socialLink.name}
                className="w-full relative inline-flex items-center justify-center"
              >
                <MetaButton
                  link={socialLink.link}
                  buttonText={socialLink.name}
                />
                {socialLink?.id && (
                  <>
                    <AiFillDelete
                      onClick={() => onDelete(socialLink.id)}
                      className="mt-4 cursor-pointer text-2xl text-white hover:text-[#ff5b79] ml-6"
                    />
                    <AiFillEdit
                      onClick={() => onUpdate(socialLink)}
                      className="mt-4 cursor-pointer text-2xl text-white hover:text-[#ff5b79] ml-6"
                    />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
