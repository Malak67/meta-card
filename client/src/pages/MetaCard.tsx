import { BusinessCardForm } from "../components";
import { withMetamask } from "../utils";

const Component = () => <BusinessCardForm />;
export const Form = withMetamask(Component);

export const MetaCard = () => {
  return (
    <div className="min-h-screen">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <Form />
        </div>
      </div>
    </div>
  );
};
