import { Loader } from "../Loader";
import { MetaButton } from "../MetaButton";
import { useBusinessCardFormEffects } from "./BusinessCardForm.effects";

export const BusinessCardForm = () => {
  const {
    isLoading,
    register,
    handleSubmit,
    onSubmit,
    errors,
    submitFormMessage,
  } = useBusinessCardFormEffects();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form
          className="max-w-xl m-auto py-10 mt-10 px-12 white-glassmorphism"
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-4">
            <label className="text-white font-medium">Full Name</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              placeholder="John Doe"
              autoFocus
              {...register("fullName")}
            />
            {errors.fullName && (
              <div className="mb-3 text-normal text-red-500">
                {errors.fullName.message}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="text-white font-medium">Title</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              placeholder="Full Stack Developer, Backend Engineer, etc."
              autoFocus
              {...register("title")}
            />
            {errors.title && (
              <div className="mb-3 text-normal text-red-500">
                {errors.title.message}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="text-white font-medium">Email</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              placeholder="Email address"
              autoFocus
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <div className="mb-3 text-normal text-red-500">
                {errors.email.message}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="text-white font-medium">Phone number</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              autoFocus
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <div className="mb-3 text-normal text-red-500">
                {errors.phoneNumber.message}
              </div>
            )}
          </div>
          <MetaButton buttonText={submitFormMessage} type="submit" />
        </form>
      )}
    </>
  );
};
